/*
* Retrieves database from Atlas and sets connection
*/
var __client;
async function getDB() {
    if (__client == null) {
        const { MongoClient } = require('mongodb');
        // const url = 'mongodb://localhost:/masterchef';
        let url = "mongodb+srv://Madhuri:neu@cluster0.tclrt.mongodb.net/masterchef?retryWrites=true&w=majority";
        let client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true  });
        try {
            await client.connect(); // connect to server and save connection
            __client = client;
        } catch (err) {
            return null;
        }
    }
    return __client.db(); // return database
}


/*
* Searches for recipes from the "recipes" collection of database
* Uses the query created from the user's selections
* Returns array of recipe objects if they exist
*/
async function textSearch(db, query) {
    if (db != null) {
        const recipeCollection = db.collection("recipes");
        if(query == "") { //if user has made no selections and query is empty
            const finalDocs = [];
             const docs = await recipeCollection.aggregate([{ $sample: { size: 10 } }]).toArray(); //pick out a random set of 10
             for(let i=0;i<docs.length;i++) {
                 if(docs[i].id != "") { //if any of the randomly selected records is an empty one, discard it from final results
                     finalDocs.push(docs[i]);
                 }
             }
            console.log("Found the following records");
            return finalDocs;
        }
        const docs = await recipeCollection.find({ '$text': {'$search' : query } } ).toArray();
        console.log("Found the following records");
        return docs;
    }
    else {
        return [];
    }
}

/* Randomly shuffles an array */
function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

/*
* Creates a collection to hold the results fetched from the query, based on user selections
*  Collection is dropped and recreated each time the user requests a recipe recommendation
*  Returns array of recipe objects if they exist
*/
async function userResultsCollection(query) {
    const db = await getDB();
    let allResults = await textSearch(db, query);

    if(allResults.length > 0) {
        allResults = allResults.splice(0,10);
    }

    if (db != null) {
        try {
            try {
                await db.dropCollection('userResults');
            } catch (err) { /* ignore */
            }
            const userResultCollection = db.collection('userResults');
            console.log('Created userResults container');
            const result = await userResultCollection.insertMany(allResults);
            console.log('Imported recipes: ' + result.insertedCount);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    else {
        return [];
    }
}

/*
* Creates a collection to hold the results fetched from the query, based on user search
*  Collection is dropped and recreated each time the user searches for recipes
*  Returns array of recipe objects if they exist
*/
async function searchResultsCollection(query) {
    const db = await getDB();
    let allResults = await textSearch(db, query);

    if(allResults.length > 0) {
        shuffle(allResults);
        allResults = allResults.splice(0,20);
    }

    if (db != null) {
        try {
            try {
                await db.dropCollection('searchResults');
            } catch (err) { /* ignore */
            }
            const userResultCollection = db.collection('searchResults');
            console.log('Created searchResults container');
            const result = await userResultCollection.insertMany(allResults);
            console.log('Imported recipes: ' + result.insertedCount);
            console.log(result);
            return result;
        } catch (err) {
            console.log(err);
        }
    }
    else {
        return [];
    }
}


/*
* Converts userSelection cookie object into a String to create recipe recommendation query
*/
function convertJSToString(userSelections) {
    data = JSON.stringify(userSelections);

    var values = [];
    var keys = [];
    var hoursConverted = 0;
    var totalMinutes = 0;

    JSON.parse(data, function (key, value) {
        if (typeof(value) != "object") {
            if(key=="hours" && value != '') { //convert hours into minutes
                hoursConverted = parseInt(value) * 60;
                totalMinutes += hoursConverted;
                value = parseInt(value); // make the value an integer
            }
            if(key=="minutes" && value != '') { //add minutes to total minutes
                totalMinutes += parseInt(value);
                value = parseInt(value); // make the value an integer
            }
            keys.push(key); //all keys in JS object
            if(!Number.isInteger(value)) { //if there is an integer in the keys, don't include
                values.push(value); //all values in JS object
            }
        }
    });

    if (totalMinutes > 0) {
        values.push(totalMinutes.toString()); //push the final total minutes into values array as string
    }

    // console.log(keys);
    for (i=0;i<values.length;i++) {
        const trueVal = values.indexOf('true');//remove any occurrence of "true"
        if (trueVal > -1) {
            values.splice(trueVal, 1);
        }
        const space = values.indexOf('');//remove any occurrence of empty strings
        if (space > -1) {
            values.splice(space, 1);
        }
    }
    for (i=0;i<keys.length;i++) { //remove any occurrence of empty strings
        const space = keys.indexOf('');
        if (space > -1) {
            keys.splice(space, 1);
        }
    }

    const lastTwo = keys.slice(1).slice(-2); //to get checkbox key's names, instead of using their "true" value
    for (i=0;i<lastTwo.length;i++) { //to help remove minutes key word from text search query
        const space = lastTwo.indexOf('minutes');
        if (space > -1) {
            lastTwo.splice(space, 1);
        }
    }
    for (i=0;i<lastTwo.length;i++) { //to help remove hours key word from text search query
        const space = lastTwo.indexOf('hours');
        if (space > -1) {
            lastTwo.splice(space, 1);
        }
    }

    const arrResult = values.concat(lastTwo);
    console.log(arrResult.join(" "));
    return arrResult.join(" "); //final text search string for recipe recommendations
}

/*
* Returns a random number from given interval to set as cookie ID
*/
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}


module.exports = {
    userResultsCollection,
    searchResultsCollection,
    convertJSToString,
    randomIntFromInterval
};