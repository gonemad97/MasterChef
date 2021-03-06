/* SEARCH RECIPES PAGE */

//default image for cards
import veggies_pic from './db_images/tomatoes.jpg';
import pasta_pic from './db_images/pasta.jpg';
import fruit_pic from './db_images/fruit.jpg';
import soup_pic from './db_images/soup.jpg';
import dessert_pic from './db_images/dessert.jpg';
import meat_pic from './db_images/meat.jpg';

/* SearchBar Component */
class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeStatus = this.handleChangeStatus.bind(this);
        this.loadSearchData = this.loadSearchData.bind(this);
        this.state = {
                recipes: [ ],
                searchQuery:""
            };
    }

    // changes searchQuery state when user enters a new query
    handleChangeStatus(e) {
        const searchQuery = e.target.value;
        this.setState({searchQuery: searchQuery});
    }

    // loads data from database and displays on user's browser
    loadSearchData() {
        fetch(`/searchRecipeInfo?searchQuery=${this.state.searchQuery}`)
            .then(resp => resp.json(), // promised data
            )
            .then(data => {  // once promised data available
                this.setState({ recipes: data.recipes.ops }); // set state with data
            })
            .catch(error => {
                console.log("Request failed", error);
            });
    }

    render() {
        const searchQuery = this.state.searchQuery;
        return (
            <div>
                <header>
                    <div>
                        <p id = "page-intro"><b>Search for a recipe of your choosing:</b></p>
                    </div>
                </header>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by title"
                        value={searchQuery}
                        onChange={this.handleChangeStatus}

                    />
                    <div>
                        <button
                            type="button"
                            onClick={this.loadSearchData}>
                            Go
                        </button>
                    </div>
                </div>
                <ResultCardList recipes = {this.state.recipes} />
            </div>
        );
    }


}

/*
* Result Recommendation Card List Component
*/
function ResultCardList(props){
    const allRecipes = props.recipes.map(recipe => <ResultCards key = {recipe.id} name={recipe.name} minutes={recipe.minutes} recipe={recipe}/>);
    return (
        <div className="result-body">
            {allRecipes}
        </div>
    );
}

/*
* Result Single Card Component
* Each card contains image, recipe name and it's prep time
*/
function ResultCards(props) {
    const recipe = props.recipe;

    /* converts first letter of every word in recipe title to capital letter */
    function capital_letter(recipeName)
    {
        recipeName = recipeName.split(" ");
        for (var i = 0, x = recipeName.length; i < x; i++) {
            if(recipeName[i] != "") {
                recipeName[i] = recipeName[i][0].toUpperCase() + recipeName[i].substr(1);
            }
        }
        return recipeName.join(" ");
    }

    /* creates the URL redirect from recipe card to original recipe on Food.com */
    function recipeRedirect(recipeName,id) {
        const url = "https://www.food.com/recipe/";
        recipeName = recipeName.split(" ");
        recipeName.push(id.toString());
        const arr = [];

        for (var i = 0, x = recipeName.length; i < x; i++) {
            if(recipeName[i] != "") {
                arr.push(recipeName[i]);
            }
        }
        var recipeUrl = arr.join("-");
        return url + recipeUrl;
    }

    /* Picks an approximate matching picture for the recipe card */
    function choosePicture(recipeName) {
        const pasta  = ["noodles","pasta","spaghetti","lasagna","ramen"];
        const dessert = ["cake", "pie", "chocolate", "ice cream", "brownies", "dessert", "cupcake", "muffin", "cheesecake", "cookies"];
        const meat = ["fish", "chicken", "meat", "bacon", "pork", "beef", "eggs", "turkey", "omelet"];
        const soup = ["soup","salad"];
        const fruit = ["apple", "orange", "watermelon", "grape", "banana", "lemon", "avocado"];

        for (let i=0;i<pasta.length;i++) {
            if (recipeName.toLowerCase().includes(pasta[i])) {
                return pasta_pic;
            }
        }

        for (let i=0;i<dessert.length;i++) {
            if (recipeName.toLowerCase().includes(dessert[i])) {
                return dessert_pic;
            }
        }

        for (let i=0;i<meat.length;i++) {
            if (recipeName.toLowerCase().includes(meat[i])) {
                return meat_pic;
            }
        }

        for (let i=0;i<fruit.length;i++) {
            if (recipeName.toLowerCase().includes(fruit[i])) {
                return fruit_pic;
            }
        }

        for (let i=0;i<soup.length;i++) {
            if (recipeName.toLowerCase().includes(soup[i])) {
                return soup_pic;
            }
        }

        return veggies_pic
    }

    return (
        <div className="card">
            <img src= {choosePicture(recipe.name)} alt="Food Image" height="180px" style={{width:'100%'}}/>
            <div className="container">
                <a id = "a-recipe-link" target="_blank" href = {recipeRedirect(recipe.name,recipe.id)}>
                    <p id="card-title"><b>{capital_letter(recipe.name)}</b></p></a>
                <div className="prep-time"><b id="card-prep-time">PREP TIME:</b></div>
                <div className="time-taken">{recipe.minutes}</div>
            </div>
        </div>
    );
}


/* Footer Result Component */
function ResultFooter() {
    const scrollTop = () =>{ // for smooth scroll back to top if user opts to search again
        window.scrollTo({top: 0, behavior: 'smooth'});
    };
    return (
        <footer>
            <div>
                <button onClick={scrollTop} className="button-redo" type="submit"><b>Search Again?</b></button>
                <form action="/index">
                    <button className="button-main-menu" type="submit"><b>Main Menu</b></button>
                </form>
            </div>
        </footer>
    );
}

/* Top-Level Recipe Search Component */
class SearchResults extends React.Component {
    render() {
        return (
            <React.Fragment>
                <SearchBar />
                <ResultFooter/>
            </React.Fragment>
        );
    }

}

const element = <SearchResults/>;
ReactDOM.render(element, document.getElementById('results'));



