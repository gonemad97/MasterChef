const express = require('express');
const router = express.Router();
const masterchefAPI = require('./masterchefAPI');


userSelections = {}; //Contains selections made by users, by using cookies

/*
* Redirects to Recipe page
* Makes final update to userSelections cookie object with the user selections from previous Type of Meal page
*/
router.route('/results').post((req, res) => {
        var path = require('path');
        console.log(userSelections[req.cookies.userId]);
        userSelections[req.cookies.userId].mealsType = req.body;
        console.log("The selections object");
        console.log(userSelections);
        res.sendFile(path.resolve(__dirname+'/../public/results.html'));
    }
);

/*
* Uses API to create text query out of userSelections cookie object
* With the query, the recommended results are fetched from the database
* Fetched results are sent back to the client component to display on the user's browser
*/

router.route('/recipeInfo').get(async (req, res) => {
        // Step 1: Get the user id from the cookie
        const userIdFromCookie = req.cookies.userId;
        // Step 2: Get the stored selections from the user selections object
        // We need to get only the user selections associated with the userId
        // from the cookie.
        const userPreference = userSelections[userIdFromCookie];
        const query = masterchefAPI.convertJSToString(userPreference)
        let recipes = await masterchefAPI.userResultsCollection(query);
        res.send({ "recipes": recipes });
});

/*
* Redirects to Search page
*/
router.route('/searchResults').get((req, res) => {
        var path = require('path');
        res.sendFile(path.resolve(__dirname+'/../public/search.html'));
    }
);

/*
* Retrieves query of user from the client component
* With the query, the search results are fetched from the database
* Fetched results are sent back to the client to display on the user's browser
*/
router.route('/searchRecipeInfo/').get(async (req, res) => {
        const searchQuery = req.query.searchQuery;
        console.log(searchQuery);
        console.log('GET');
        let recipes = await masterchefAPI.searchResultsCollection(searchQuery.toString());
        res.send({ "recipes": recipes });
    }
);

/*
* Redirects to Main Menu page
*/
router.route('/index').get((req, res) => {
        var path = require('path');
        res.sendFile(path.resolve(__dirname+'/../public/index.html'));
});

/*
* Displays raw userSelections cookie JSON object on browser
* Used for testing purposes
* This redirect does not affect the application in any way
*/
router.route('/userSelections').get((req, res) => {
        res.send({ "selections": userSelections[req.cookies.userId] });
    }
);

/*
* Redirects to Ingredients page
* Creates a new cookie with random userID, if it hasn't been created already for current session
*/
router.route('/ingredients').get(async (req, res) => {
            var path = require('path');
            if(typeof req.cookies.userId == "undefined") {
                    console.log("Setting cookie!!");
                    const userId = masterchefAPI.randomIntFromInterval(1, 100000);
                    res.cookie('userId', userId);
            } else {
                    console.log("reading cookie!!");
                    console.log(req.cookies.userId);
            }
            res.sendFile(path.resolve(__dirname+'/../public/ingredients.html'));
    }
);

/*
* Redirects to the Cuisine/Prep Time page
* Makes update to the userSelection cookie object with the user selections from previous Ingredients page
*/
router.route('/cuisinetime').post((req, res) => {
        userSelections[req.cookies.userId] = {};
        userSelections[req.cookies.userId].ingredients = req.body;
        var path = require('path');
        console.log("The selections object");
        console.log(userSelections);
        res.sendFile(path.resolve(__dirname+'/../public/cuisinetime.html'));
    }
);

/*
* Redirects to the Type of Meal page
* Makes update to the userSelection cookie object with the user selections from previous Cuisine/Prep Time page
*/
router.route('/mealtype').post((req, res) => {
        var path = require('path');
        userSelections[req.cookies.userId].timePref = req.body;
        res.sendFile(path.resolve(__dirname+'/../public/mealtype.html'));
    }
);

/*
* Sends ingredients from ingRecord object to the client component
* These ingredients will be displayed on browser for the user to select from
*/
router.route('/ingredientInfo').get((req, res) => {
        res.send({"ingredients":ingRecord});
});

/* INGREDIENTS OBJECT */
const ingRecord = {
        "milkIngredients":[
                {"id":"Butter", "img_url":"https://images.unsplash.com/photo-1559561853-08451507cbe7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NDR8fGNyZWFtJTIwY2hlZXNlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        ,"name":"Butter"},
                {"id":"Cream",
                        "img_url":"https://images.unsplash.com/photo-1550583724-b2692b85b150?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWlsa3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Cream"},
                {"id":"Eggs", "img_url":"https://images.unsplash.com/photo-1587486913049-53fc88980cfc?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8ZWdnc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        ,"name":"Eggs"},
                {"id":"Milk", "img_url":"https://factorydirectcraft.com/pimages/20190402113528-855978_med/dollhouse_miniature_white_gallon_milk_jug_medium.jpeg"
                        ,"name":"Milk"},
                {"id":"Yogurt", "img_url":"https://images.unsplash.com/photo-1571212515416-fef01fc43637?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8eW9ndXJ0fGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        ,"name":"Yogurt"}],

        "vegIngredients":[
                {"id":"Onions",
                        "img_url":"https://images.unsplash.com/photo-1508747703725-719777637510?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8b25pb25zfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Onions"},
                {"id":"Cauliflower",
                        "img_url":"https://images.unsplash.com/photo-1584615467033-75627d04dffe?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Y2F1bGlmbG93ZXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Cauliflower"},
                {"id":"Potatoes",
                        "img_url":"https://images.unsplash.com/photo-1518977676601-b53f82aba655?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cG90YXRvZXN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Potatoes"},
                {"id":"Apples",
                        "img_url":"https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YXBwbGVzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Apples"},
                {"id":"Orange Juice", "img_url":"https://images.unsplash.com/photo-1602684045042-34233dd5aa58?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8b3JhbmdlJTIwanVpY2V8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60",
                        "name":"Orange Juice"}],

        "meatIngredients":[
                {"id":"Beef",
                        "img_url":"https://images.unsplash.com/photo-1551028150-64b9f398f678?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmVlZnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Beef"},
                {"id":"Fish",
                        "img_url":"https://images.unsplash.com/photo-1517115358639-5720b8e02219?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1654&q=80", "name":"Fish"},
                {"id":"Bacon",
                        "img_url":"https://images.unsplash.com/photo-1528607929212-2636ec44253e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8YmFjb258ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Bacon"},
                {"id":"Beef ribs",
                        "img_url":"https://images.unsplash.com/photo-1605491380881-3d22532b84d9?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Nnx8YmVlZiUyMHJpYnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Beef ribs"},

                {"id":"Chicken", "img_url":"https://images.unsplash.com/photo-1516684669134-de6f7c473a2a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8OHx8Y2hpY2tlbnxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        ,"name":"Chicken"}],

        "breadIngredients":[
                {"id":"Flour",
                        "img_url":"https://images.unsplash.com/photo-1565607052745-35f8c6ba59b1?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxvdXJ8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Flour"},
                {"id":"Baking powder",
                        "img_url":"https://images.unsplash.com/photo-1599260032798-6e697b78e9ec?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YmFraW5nJTIwcG93ZGVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Baking powder"},
                {"id":"Breadcrumbs",
                        "img_url":"https://images.unsplash.com/photo-1531749668029-2db88e4276c7?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NHx8YnJlYWRjcnVtYnN8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Breadcrumbs"},
                {"id":"White bread",
                        "img_url":"https://images.unsplash.com/photo-1600102186542-82cbd5e7bdb4?ixid=MXwxMjA3fDB8MHxzZWFyY2h8N3x8d2hpdGUlMjBicmVhZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"White bread"},
                {"id":"Brown bread", "img_url":"https://images.unsplash.com/photo-1541833000669-8dbe1bfb574a?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YnJvd24lMjBicmVhZHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        ,"name":"Brown bread"}],

        "spicesIngredients":[
                {"id":"Dry mustard",
                        "img_url":"https://images.unsplash.com/photo-1513262599279-d287e25f4d84?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NTJ8fG11c3RhcmQlMjBzYXVjZXxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Dry mustard"},
                {"id":"Garlic Powder",
                        "img_url":"https://thumbs.dreamstime.com/b/garlic-powder-cloves-522944.jpg", "name":"Garlic Powder"},
                {"id":"Salt",
                        "img_url":"https://images.unsplash.com/photo-1518110925495-5fe2fda0442c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8c2FsdHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Salt"},
                {"id":"Green Chillies",
                        "img_url":"https://images.unsplash.com/photo-1576763595295-c0371a32af78?ixid=MXwxMjA3fDB8MHxzZWFyY2h8NXx8Z3JlZW4lMjBjaGlsbGllc3xlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60", "name":"Green Chillies"},
                {"id":"Pepper", "img_url":"https://images.unsplash.com/photo-1517336239897-19751f967295?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8cGVwcGVyfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"
                        ,"name":"Pepper"}]
};


module.exports = router;