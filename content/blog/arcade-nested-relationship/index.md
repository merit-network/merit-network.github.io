---
date: "2021-06-28T10:50:00Z"
description: "Use Arcade to generate a concise pop-up from data with nested relationships and partially-duplicate rows."
featuredImage: shannon-potter-bHlZX1D4I8g-unsplash.jpg
featuredImageCredit: "Shannon Potter"
featuredImageLink: "https://unsplash.com/photos/bHlZX1D4I8g"
tags: ["gis", "arcade", "Esri", "ArcGIS Online"]
title: Arcade Pop-up for Nested Relationships and Duplicate Fields
---
_Arcade is great at distilling information in your pop-ups, but complex schemas can pose a challenge and require some tinkering that goes a bit beyond the documentation._

# TL;DR

If you have complex schema with nested relationships and duplicate rows that can not be accessed with an existing Arcade function, use multiple filter statements, loop through each resulting FeatureSet, store looped results in pop-up strings, and use a separate array to check and capture unique values.

# Complications of consolidating a complex data structure with Arcade

Coming from a data science background where data frames provide the main means for wrangling your data, jumping into Arcade felt a bit like stumbling around in a dark cave. Figuring out how to display data from a related table is well documented - define your sql filter statement, use `Filter()`, and loop through the resulting FeatureSet to populate your pop-up string. But what if you need to take this resulting FeatureSet a step further and access data related to your related data? How would you then display only the unique fields? Addressing just one of these requirements may allow you to use helpful Arcade functions like  `Filter()` and `Distinct()`, but trying to accommodate all requirements may move you beyond FeatureSets and therefore limits the Arcade functions at your disposal. **Even if this is the case, Arcade can still be used as a low-code solution for your pop-ups.** Let's look at a concrete example.

I recently worked on a project with the following structure in an enterprise geodatabase with configured web services:

- one point feature class (`splicecases`),
- one line feature class (`fibercable`),
- one non-spatial table related to the line feature class (`fibers`),
- and one non-spatial table related to the point feature class (`fibersplice`).

In non-database terms, the four tables describe a splice case location and the details of the fiber splicing within the fiber cables (e.g. at splice case location A, cable A contains fibers 1-12 which are spliced to fibers 6 - 24 in cable Z). We needed a pop-up on the `splicecases` to summarize data from the point, two intersecting lines, and potentially hundreds of rows each in the two non-spatial tables.

Additionally, the `fibersplice` table has a row for each strand connection, showing the 'A' fiber ID and the connected 'Z' fiber ID. The actual owner information is housed in a separate `fibers` table, with one row per fiber strand. Combined, the data looks something like this snippet:

| Owner A|  Group A| Fiber # A  |  Owner Z |  Group Z | Fiber # Z |
|   :---:|  :----: |   :---:    |   :---:  |    :---: |   :---:   |
| Company A  | 1 - 12  | 1   | Company B   | 6 - 24   | 6         |
| Company A  | 1 - 12  | 2   | Company B   | 6 - 24   | 7         |
| Company A  | 1 - 12  | 3   | Company B   | 6 - 24   | 8         |
| Company A  | 1 - 12  | 4   | Company B   | 6 - 24   | 9         |

However, as there could be hundreds of rows for each location, we were looking for an output with one row per fiber-strand grouping, rather than individual rows for each individual strand:

| Owner A    |  Group A   | Owner Z    |  Group Z  |
|   :---:    |    :---:   |   :---:    |    :---:  |
| Company A  | 1 - 12     | Company B  | 6 - 24    |

This combination of requirements proved problematic for Arcade - no matter how you slice the expression, there is always a section left out of a standard, well-documented, solution. In one scenario you may be able to incorporate data from three tables and could use the `Distinct()` function to remove rows with duplicate `field_groupings`, but then could not access the `owner` field from the `fibers` table or know the difference between the A strand and Z strand. In another scenario, all data could be incorporated from the four tables, but then the `Distinct()` function was not able to be used.

The data could have been moved to a hosted feature service for joins in ArcGIS Online, but then we would lose the necessary functionality of the enterprise geodatabase. Being in the enterprise geodatabase, we were not able to publish joined data or create joins in ArcGIS Online. **The solution is a bit loopy, but it addresses all requirements.**

# Using nested loops for nested relationships

You start out similarly to how you would start most Arcade expressions looking to access related data:

```js
    // Declare FeatureSet variables by map ID
    var fibersplice = FeatureSetById($map, /* Gisprod.DBO.fibersplice */ "178f5255589-layer-5")
    var fibercable = FeatureSetById($map, /* FIBERCABLE */ "178f5255582-layer-3")
    var fibers = FeatureSetById($map, /* Gisprod.DBO.fiber */ "178f5255590-layer-6")

    // Filter for splice case records associated with the splice case the user clicks
    var fs_segid = $feature.ipid
    var fs_filterStatement = 'spliceclosureipid = @fs_segid'
    var relatedFibersplice = Filter(fibersplice,fs_filterStatement)
```

Now we need to initialize our variables that are going to hold the various components of our final pop-up, as well as the variable that will hold our `fiber_grouping` as we iterate to check for unique occurrences:

```js
    var scPopupResult = ''
    var fromcablePopupResult = ''
    var tocablePopupResult = ''
    var afPopupResult = ''
    var zfPopupResult = ''
    var uniqueGrouping = ''
```

And now, the loops! I know, loops are not the most efficient, but with a limited list of functions to work with sometimes loops are your best option. We're going to start by first looping through `fibersplice`. In each iteration of the loop, we grab unique IDs for our A and Z cables as well as our fibers in `fibers`.
These unique IDs are used to create additional filtered FeatureSets for our individual fiber strands and fiber cables (in both the A  and Z directions).

We'll use these filtered datasets to individually loop through and grab the field of interest for our pop-up. However, before we loop through each new filtered FeatureSet, we need to check if this is a unique row of data. We only want one entry per grouping, and luckily, this dataset contains a text field of the `fiber_grouping`. We're going to grab this field, check if it's already listed in our array we just initialized (`uniqueGrouping`), and if it's not already listed we will proceed with the population of our pop-up string components and save the `fiber_grouping` in the list `uniqueGrouping` to skip over it the next time we come across this value.

```js
    // For every fiber cable, filter and return the related fiber records
    for (var fs in relatedFibersplice){
        // Grab the unique IDs for the from cable, to cable, and all fiber strands 
        // involved in the splice - we'll get the A and Z directions below
        var fromCable_segid = fs.asegmentidfkey
        var toCable_segid = fs.zsegmentidfkey
        var fiber_signalipid = fs.signalipid

        // Prepare the filter statements for each dataset we'll want to access
        var fiber_filterStatement = 'signalipid = @fiber_signalipid'
        var fiber_AfilterStatement = 'segmentidfkey = @fromCable_segid' 
        var fiber_ZfilterStatement = 'segmentidfkey = @toCable_segid' 
        var fromcable_filterStatement = 'segmentid = @fromCable_segid'
        var tocable_filterStatement = 'segmentid = @toCable_segid'
    
        // Filter your data based on the above filter statements
        // Note: relatedFibers are put in ascending order to speed up
        // the process of checking for repeat groupings.
        var relatedFibers = OrderBy(Filter(fibers,fiber_filterStatement), 'fiber_grouping')
        var relatedAFibers = Filter(relatedFibers,fiber_AfilterStatement)
        var relatedZFibers = Filter(relatedFibers,fiber_ZfilterStatement)
        var relatedFromCable = Filter(fibercable,fromcable_filterStatement)
        var relatedToCable = Filter(fibercable,tocable_filterStatement)

        // First check if we have a unique row of data based on the fiber grouping field
        for (var a in relatedAFibers){
            var checkGrouping = a.fiber_grouping
        }

        if(uniqueGrouping == checkGrouping) {
            Continue
        }

        else{
            // Populate each individual component of the final pop-up string 
            for (var fc in relatedFromCable){
                fromcablePopupResult = fc.comment
            }
            for (var tc in relatedToCable){
                tocablePopupResult = tc.comment
            }
            for (var af in relatedAFibers){
                afPopupResult = af.owner + " " + af.fiber_grouping
                uniqueGrouping = af.fiber_grouping
            }
            for (var zf in relatedZFibers){
                zfPopupResult = zf.owner + " " + zf.fiber_grouping +
                zf.comment + " ||"
            }   
        }
        // Tie individual pop-up components together
        scPopupResult+= "|| " + fromcablePopupResult +
        " - " +tocablePopupResult  + 
        " ||| " + afPopupResult + " - " + zfPopupResult
        +TextFormatting.NewLine
        +"_____________________"
        +TextFormatting.NewLine
    }

    return scPopupResult
```
# Closing thoughts

Although complicated schemas can pose some challenges in coming up with eloquent solutions for displaying information to your users, there are still low-code options to help you accomplish your task. Arcade, while limited, is still a powerful tool that can work through more complex schemas.

The loops in this solution do slow down the creation of the pop-up a small amount, and with Arcade functionality increasing every year we may be able to enhance this solution in the future by reducing the amount of loops.

These Esri Community posts also have some helpful tips if your needs are a bit different than ours:

- [Arcade If Statement for Multiple Unique Values](https://community.esri.com/t5/developers-questions/arcade-if-statement-for-multiple-unique-values/m-p/589507#M3988)
- [Multiple IIF() Statements in Arcade Expression](https://community.esri.com/t5/arcgis-online-questions/multiple-iif-statements-in-arcade-expression/td-p/485731)

Have a better way? Disagree? [Let us know](https://github.com/merit-network/merit-network.github.io/issues)!