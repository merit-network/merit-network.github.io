---
date: "2021-01-29T10:50:00Z"
description: "Learn how to summarize the median value of your point features within a polygon feature class in ArcGIS Pro using the R-ArcGIS bridge."
featuredImage: nathan-dumlao-qq9XjVZe4Lk-unsplash.jpg
featuredImageCredit: "Nathan Dumlao"
featuredImageLink: "https://unsplash.com/photos/qq9XjVZe4Lk"
tags: ["gis", "R", "Esri", "ArcGIS Pro", "statistics"]
title: Summarize Median Values in ArcGIS Pro via R-ArcGIS Bridge
---
_If you've ever longed for 'median' as an option in the dropdown list of Esri's 'Summarize Within' tool when working with non-normally distributed data, long no more! Use this script and the R-ArcGIS Bridge to fulfill your non-parametric function needs._

# TL;DR
When your data is not normally distributed, look outside the limited dropdown options for a solution that maintains the integrity of your data. The R-ArcGIS Bridge provides the ability to use R in scripting a statistical model (in this case calculating the median value based on geographic location) and ArcGIS Pro to run and incorporate the script into your larger Esri workflow. 

# Why would I need something other than the options Esri provides?
Have you ever been working on a project in ArcGIS Pro, realized you had skewed data, and then further realized ArcGIS Pro's 'Summarize Within' tool limits you to a few options meant for normally distributed data? I certainly have. Rather than shrug your shoulders and think 'ah well, the mean value is close enough...' see if you can find a way to use a more appropriate statistical test.

To put this idea in some context, I'm working on a current project gathering granular internet speed test results and then aggregating those granular speed tests up to the census block level. When looking at the distribution of internet speeds within geographic buckets, you'll see that the distribution is highly skewed. A lot of the internet users may hang out around the 25 - 75 MBPS range for download speed, some may be at the 0 MBPS range, and then a smaller, but still substantial group, jump up to that 1G category, resulting in some major outliers, large tails, and large peaks. 

There is no question that this data does not satisfy the requirements of normally distributed data, meaning we should ***not*** use a parametric test (e.g. `mean`) to analyze the data. Using the `mean` function when aggregating these values up to the census block level would artificially push your average towards those outliers, misrepresenting what the 'average' person in that census block is really experiencing. When the purpose of this analysis is to provide data-driven insight into where new broadband infrastructure investments should be made, pushing the metric towards those high outliers is absolutely unacceptable. Fortunately, the median value of your data provides one option to better represent the true middle ground of what users on the ground are experiencing. 

This particular project has many components and is largely working in ArcGIS Pro's model builder with some deeper statistics and figure generation happening in RStudio. Our goal is to have cohesion between these two programs, so we did not want a workflow that required us to run some analysis in ArcGIS Pro, leave this program and open up RStudio to run a custom-made script, and then go back into ArcGIS Pro to run the rest of the model. Luckily, Esri's R-ArcGIS Bridge allows us to create the custom tool you'll see below and then import that into the ArcGIS Pro interface whenever we want to calculate the median download and upload speeds for each census block in our study area.  

# R-ArcGIS Bridge provides a solution
In this post I'm going to focus more on the actual script to calculate the median values, with some callouts to the R-ArcGIS Bridge components. To use this solution, you will need the following installed:
- R and Rstudio 3.5 or later (https://rstudio-education.github.io/hopr/starting.html) 
- ArcGIS Pro 2.2 or later

If you're new to the concept of the R-ArcGIS Bridge, you can fnd more detail here: https://github.com/R-ArcGIS/r-bridge-install.

# Let's break down the code
You'll need to first call the function that will allow you to bring this tool into ArcGIS Pro as a custom script that will prompt the user for input:
```r
tool_exec <- function(in_params, out_params){
#The rest of the code below goes in here
}
```
We'll need the following R packages and code to initialize the R-ArcGIS bridge:

```r
require(sp) #classes and methods for spatial data, https://cran.r-project.org/web/packages/sp/index.html
require(spatialEco) #needed for the point.in.polygon() function, https://cran.r-project.org/web/packages/spatialEco/index.html
require(arcgisbinding) #initializes the R-ArcGIS bridge and connects your Esri license info

#tie your license into the session
arc.check_product()
```
Now we define the input and outputer parameters you want the user to provide via the tool interface in ArcGIS Pro:

```r
  polygon_input <- in_params[(1)] #in this case, the census blocks
  point_input <- in_params[(2)] #in this case, the points with the speed test data
  attribute_input <- in_params[(3)] #this must be the EXACT name of the field in the data table
  attribute_groupby <- in_params[(4)] #this must be the EXACT name of the field in the data table
  coord_system <- in_params[(5)] #user chooses Point or Polygon from dropdown for the coordinate system they want to use
  
  summarized_output <- out_params[(1)] #this is user provided
  Output_FC <- out_params [(2)] #this is derived
```
Ok, now we need to convert the user inputs to strings so that they will work properly in the rest of the script:

```r
  polygon_input <- toString(polygon_input)
  point_input <- toString(point_input)
  attribute_input <- toString(attribute_input)
  attribute_groupby <- toString(attribute_groupby)
  summarized_output <- toString(summarized_output)
```
We're now going to read in the GIS feature class, via `arc.open()`, and in the same line transform that into a data frame, via `arc.select()`, so we can work with it in R:

```r
  poly.df <- arc.select(arc.open(polygon_input))
  point.df <- arc.select(arc.open(point_input))
  
  print("Polygon and point data have been converted to data frames")
```
If we were just importing the feature class into RStudio to derive non-spatial statistics, we could stop at the data frame conversion. Since we will be perfoming spatial statistics, meaning that the actual location of the features is the prominent piece of the analysis (e.g. summarizing the median value of points residing inside a polygon vs answering the question 'what is the median value of all survey responses') one more conversion is needed. We need to convert the data frames into a ***SpatialPointsDataFrame*** and a ***SpatialPolygonDataFrame*** using the `sp package`:

```r
  poly.spdf <- arc.data2sp(poly.df)
  point.spdf <- arc.data2sp(point.df)
  
  print("Data has been converted to spatial data frames")
```

Before we can do any analysis between these two spatial data frames we need to ensure their projections match. At the top we have the user choose if they want the resulting feature class to be of the coordinate system of the point or polygon feature class. We're assuming at least one of these feature classes has the desired coordinate system for output. 

For reference, the `spTransform()` function performs the actual projection and datum transformation and the `CRS()` function grabs the projection info of the input feature class as a class ***character***.

```r
  #grab projection information of each spatial data frame as a string
  point_proj <- proj4string(point.spdf)
  poly_proj <- proj4string(poly.spdf)

  #check if the coordinate systems match, if they don't then reproject one based on user input
  if(point_proj!=poly_proj){
    if(coord_system=="Point"){
      poly.spdf <- spTransform(poly.spdf, CRS(point_proj))
    }
    else{
      point.spdf <- spTransform(point.spdf, CRS(poly.spdf))
    }
  }

print("Coordinate systems have been checked and updated if necessary")
```
Now we can finally get to the exciting part and do some stats! We're going to attach a polygon ID to each point and then aggregate the median value of each point with the same polygon ID. 

```r
  #attach polygon attributes to each point, allowing for aggregation of a point numeric value by a polygon ID
  pts.poly <- point.in.poly(point.spdf,poly.spdf)
 
   #summarize points based on polygon ID via user input and update column names
  summarized_median <- aggregate(x=pts.poly@data[attribute_input], by=list(pts.poly@data[ ,attribute_groupby]), FUN=median, drop=TRUE)
  colnames(summarized_median)<-c(attribute_groupby,paste("Median",attribute_input))
  
  print("Median values aggregated")
```
We also will want the total number of points in each census block for a more robust understanding of our median metric:

```r
  #count total amount of points within each polygon based on ID supplied by user
  summarized_count <- aggregate(x=pts.poly@data[attribute_input], by=list(pts.poly@data[, attribute_groupby]), FUN=length, drop=TRUE)
  colnames(summarized_count)<-c(attribute_groupby,"Total Point Count")
  
  print("Total count aggregated")
```
To finish, we need to merge these outputs together and write the data to an Esri feature class:

```r
  #merge median and count together into one table
  summarized_merged <- merge(summarized_median, summarized_count,by=attribute_groupby)
  
  #join table back to SpatialPolygonsDataFrame 
  new_poly_spdf <- merge(poly.spdf, summarized_merged,by=attribute_groupby)
  
  #export to feature class
  Output_FC <- arc.write(summarized_output, new_poly_spdf)
```

That's all the code! If you want to test this in RStudio before bringing it into ArcGIS Pro, simply comment out the initial function defintion and parameter defintions, define the parametrs as variables with the same name as the parameter defintion, and run the code from there. 

For more information on creating a custom tool from your script in ArcGIS Pro, visit this site: https://pro.arcgis.com/en/pro-app/latest/arcpy/geoprocessing_and_python/adding-a-script-tool.htm

#Closing thoughts
At the end of the day it is so important to stay true to your data, even if that means stepping outside of the preconfigured dropdowns your software provides. Some of the time your data may be normally distributed and you can use ArcGIS Pro's 'Summarize Within' with no issues. In the cases where your data is non-parametric, doing a bit of extra work to seek out a non-parametic solution will maintain the integrity of your data and the R-ArcGIS Bridge makes this so much more doable.

It is also worth noting that there are other way to deal with non-normally distributed data, such as removing outliers or transforming your data, that may work better for your specific project. The most important rule of thumb is to always use your brain first about what works best for the intended use of that data.

Have a better way? Disagree? [Let us know](https://github.com/merit-network/merit-network.github.io/issues)!
