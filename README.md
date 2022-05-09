
# MasterChef

MasterChef is a culinary application that recommends recipes based on available ingredients, cuisines, types of meals, etc. and also allows the user to search for specific recipes.

## Team Members:(3)
1. Amruta Kamath - Northeastern University
2. Madhuri Palanivelu - Northeastern University
3. Pedram Shahroodi - Northeastern University

## Repository Contents:

#### root
* gitignore: unnecessary files and folders that can be installed through package.json
* package.json: contains all installable dependencies
* MasterChef Documentation.pdf: project documentation
* MasterChef Presentation.pdf: project presentation
* webpack.config.js: webpack configuration file to create dependency bundles

#### public
* bundles folder: contains all webpack bundles of .JSX files
* css folder: contains external CSS files
* images folder: contains static images used in CSS files
* RAW_recipes_shortedned.csv: Food.com dataset
* cuisinetime.html: preferences HTML page for cuisine and prep time
* index.html: main menu HTML page
* ingredients.html: ingredients HTML page
* mealtype.html: preferences HTML page for type of meal
* results.html: recipe recommendation results HTML page
* search.html: recipe search HTML page

There are also several bundled .jpg images that are required for easy import into .JSX files

#### server
* masterchef-router.js: contains custom REST APIs
* masterchefAPI.js: contains database accessing helper methods
* masterchefInit.js: database initialization file
* server.js: imports masterchef-router.js routes and mounts the application

#### src
* db_images: contains static images used in JSX files
* CuisineTime.jsx: module for cuisine and time preferences
* Index.jsx: module for main menu
* Ingredients.jsx: module for ingredients selection
* MealType.jsx: module for type of meal preferences
* Results.jsx: module for recipe recommendation results
* Search.jsx: module for recipe search
