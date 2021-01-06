---
date: "2021-01-05T15:00:00Z"
description: "Empower your end-users to know the difference between a broken app and a data entry issue."
featuredImage: visuals-JpTY4gUviJM-unsplash.jpg
featuredImageCredit: "visuals"
featuredImageLink: "https://unsplash.com/photos/JpTY4gUviJM"
tags: []
title: How to Fail Gracefully
---

_**Fail Gracefully!** Empower your users by providing them with applications that fail gracefully, or indicate clean error messaging without stopping them from getting the job done._

# TL;DR

If fail you must, then provide an accurate error message on the User Interface to guide users to resolve the issues.

# What the heck does it mean?

"We are unable to perform this operation. We are sorry for the inconvenience, please check back later.'' When throwing your computer out the window isn't an option, what else can you do? Nothing.

Most of the time we move on, just work through the thing, and try it a different way. Maybe an incognito window, maybe clear our cache, maybe restarting our computer? Not everybody has an automated way to debug an issue. If they did, then software companies everywhere would cease to exist.


# Support the User

As Tech Support (yes, we are support, we create, we manage, we develop, we guide, but we support), we need to put ourselves back into the shoes of the User. We cannot always assume that the User is doing it wrong, because we build the applications for the User. The error checking in the code knows enough to display an error. At the very least, if the User is 'doing it wrong', then the error that we throw out should be smart enough to tell the User what happened. It is okay to be transparent- it fixes issues quicker, and builds trust with the user.

What if throwing a catch-all error and saying 'open a ticket with support', we take the time to **at least** show the user what **could** be wrong. 

**Examples:**
* "Please enter value(s) for: Rejection Reason."
* "There appears to be duplicated information for this Contact."
* "Your totals do not balance, please review."


# Let the User Decide
Instead of blocking the User from doing any work at all consider warning the User, and then logging the issue in an audit trail. Allow the User to save, because it might something that will not negatively impact a background process that is running, or harm a future record that has not even been created yet. Do not assume that the User shoul not do a specific thing just because they do not know that they need it (yet).

**Give them Options:**
* "Not all fields have been completed, do you wish to continue?"
* "Are you sure you want to abandon these changes?"

Giving users the option to move forward, save their changes, or cancel gives them the control that they need to be able to work. If users become frustrated using an application for data entry, they are more likely to abandon its use entirely and find an alternative, less-secure solution elsewhere on their own. 

# Closing thoughts

Talk to your Users. Find out what is important about their data entry application. Find out what types of data they would actually like to have validated. Ask them what they need to know when you alert them through the User Interface of an error. How should your code handle it? How do they want to work through it? Transparency in this will save you time, and also gain a positive relationship of trust with your users.

Have a better way? Disagree? [Let us know](https://github.com/merit-network/merit-network.github.io/issues)!

