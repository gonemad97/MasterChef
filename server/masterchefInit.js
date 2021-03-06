/*
* Creates text index for "masterchef" database's "recipe" collection
* Adds weights to specific fields to give priority to them while searching
*/
async function createRecipeIndex(recipeCollection) {
    await recipeCollection.createIndexes( { name: "text", id:"text", tags: "text",
                                        description: "text", steps: "text",
                                        minutes: "text", ingredients: "text"},
                                    {
                                        weights: {
                                            name: 1,
                                            tags: 2,
                                            minutes: 2,
                                            ingredients: 10
                                        },
                                        background:true
                                    },
    );
}

/*
* Initializes "masterchef" database
* Builds index for text search to find relevant recipes, which takes ~minute to build
* It is enough to run once, but can be run multiple times if required
* Inserts all recipe records from CSV Kaggle dataset into a new collection of "masterchef" DB
*/
async function create_masterchef_db() {
    const mongodb = require("mongodb").MongoClient;
    const csvtojson = require("csvtojson");

    let url = "xxx";

    await csvtojson()
        .fromFile("../public/RAW_recipes_shortened.csv")
        .then(csvData => {
            // console.log(csvData);
            mongodb.connect(
                url,
                { useNewUrlParser: true, useUnifiedTopology: true },
                (err, client) => {
                    const recipeCollection = client.db("masterchef").collection("recipes");

                    //checks if collection data already exists and drops before reinserting, if true
                    recipeCollection.countDocuments({})
                        .then(function (checkExists) {
                        // console.log(checkExists);
                        if(checkExists > 0) {
                            console.log("Deleting existing recipe collection");
                            recipeCollection.drop();
                            console.log("Reinserting docs into recipe collection..");
                            console.log("Please allow a minute for the process to finish.");
                            createRecipeIndex(recipeCollection);
                            recipeCollection
                                .insertMany(csvData, (err, res) => {
                                    if (err) throw err;
                                    console.log(`Inserted: ${res.insertedCount} rows`);
                                    client.close();
                                });
                        }
                        else {
                            console.log("Entering docs into recipe collection");
                            console.log("This can take a minute or two to build the index. This file does not need to be re-run, unless required.");
                            createRecipeIndex(recipeCollection);
                            recipeCollection
                                .insertMany(csvData, (err, res) => {
                                    if (err) throw err;
                                    console.log(`Inserted: ${res.insertedCount} rows`);
                                    client.close();
                                });
                        }
                    });
                }
            );
        });
}

create_masterchef_db();
