/* MAIN MENU PAGE */

//default images for cards
import glass from './db_images/magnifying_glass.jpg';
import waitress from './db_images/waitress_food.jpg';

/*
* Welcome Message Component
* First component displayed on start of MasterChef application
*/
class WelcomeComponent extends React.Component {
    render() {
        return (
            <div className="main" id="section1">
                <div className="container">
                    <div className="header-container">
                        <p id="welcome-msg">Welcome to</p>
                        <p id="masterchef-msg">Masterchef</p>
                        <section id="section04" className="demo">
                            <a href="#section2"><span></span></a>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

/*
* Recommend Recipe Component
* Consists of a card that the user can select if they opt for recipe recommendation
*/
class RecommendRecipe extends React.Component {
    render() {
        return (
            <div className="card">
                <img src={waitress} alt="Recipe Recommendations" style={{width:'100%'}}/>
                <div className="about-container">
                    <a className="a-optionlink" href="/ingredients">
                    <h1 className="card-title"><b>Get Recipe Recommendations</b></h1>
                    <p className="card-caption">Need help figuring out what to cook? We've got
                        you covered. Tell us what ingredients
                        you want to use from your pantry, a possible cuisine preference, the
                        type of meal you're looking to make
                        and finally how long you can cook, and presto - find the recipes meant
                        for you today.</p></a>
                </div>
            </div>
        );
    }
}

/*
* Search for Recipe Component
* Consists of a card that the user can select if they opt to search for recipes
*/
class SearchRecipe extends React.Component {
    render() {
        return (
            <div className="card">
                <img src={glass} alt="Search Recipes" style={{width:'100%'}}/>
                <div className="about-container">
                    <a className="a-optionlink" href="/searchResults">
                    <h1 className="card-title"><b>Search for Recipes</b></h1>
                    <p className="card-caption">Already have an idea of what you want to make
                        today? Search for a favorite recipe from our collection and get top
                        matches to get started.</p></a>
                </div>
            </div>
        );
    }
}

/*
* MasterChef Features Component
* Second page that is scrolled to, from Welcome Message Component
* Consists of both Recipe Recommendation and Recipe Search cards for user to choose from
*/
class MasterChefOptions extends React.Component {
    render() {
        return (
            <div className="main" id="section2">
                <div className="card-container">
                    <RecommendRecipe/>
                    <SearchRecipe/>
                </div>
            </div>
        );
    }
}

/*
* Top-Level Main Menu Parent Component
*/
class MasterChefLanding extends React.Component {
    render() {
        return (
            <React.Fragment>
                <WelcomeComponent />
                <MasterChefOptions />
            </React.Fragment>
        );
    }
}

const element = <MasterChefLanding/> ;
ReactDOM.render(element, document.getElementById('content'));