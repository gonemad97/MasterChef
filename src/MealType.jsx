
/* Cuisine Preference Component */
class CuisinePref extends React.Component {
    // variable states for type of meals are initially false as user hasn't checkboxed them. Once
    // user checkboxes them on the onChange variable states turn true for respective
    // variable meal types.
    constructor(props){
        super(props);
        this.state = {
            Breakfast: false,
            Lunch: false,
            Appetizer:false,
            Alcoholic_Beverage: false,
            Milkshakes: false,
            Drinks: false,
            Dinner: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.checked});
    }

    render() {
        return (
            <div className="mealTypes">
                    <input type="checkbox" id="Breakfast" name="Breakfast" onChange={this.handleChange} value={this.state.Breakfast} />
                    <label className="mealPreferences" htmlFor="Breakfast">Breakfast</label>

                    <input type="checkbox" id="Lunch" name="Lunch" onChange={this.handleChange} value={this.state.Lunch} />
                    <label className="mealPreferences" htmlFor="Lunch">Lunch</label>

                    <input type="checkbox" id="Appetizer" name="Appetizer" onChange={this.handleChange} value={this.state.Appetizer}/>
                    <label className="mealPreferences" htmlFor="Appetizer">Appetizer</label><br/>

                    <input type="checkbox" id="Alcoholic_Beverage" name="Alcoholic_Beverage" onChange={this.handleChange} value={this.state.Alcoholic_Beverage}/>
                    <label className="mealPreferences" htmlFor="Alcoholic_Beverage">Alcoholic Beverage</label>

                    <input type="checkbox" id="Milkshakes" name="Milkshakes" onChange={this.handleChange} value={this.state.Milkshakes}/>
                    <label className="mealPreferences" htmlFor="Milkshakes">Milkshakes</label><br/>

                    <input type="checkbox" id="Drinks" name="Drinks" onChange={this.handleChange} value={this.state.Drinks}/>
                    <label className="mealPreferences" htmlFor="Drinks">Drinks</label>

                    <input type="checkbox" id="Dinner" name="Dinner" onChange={this.handleChange} value={this.state.Dinner}/>
                    <label className="mealPreferences" htmlFor="Dinner">Dinner</label><br/>
            </div>
        );
    }
}

/* Footer Component */
function Footer(){
    return (
        <footer>
            <div>
                <form action="/cuisinetime" method="post">
                <button className="backButton">Back</button>
                </form>
            </div>
        </footer>
    );
}

/* Container Component */
class Container extends React.Component {
    render() {
        return (

            <div>
                <h1>Preferences</h1>
                <form action="/results" method="post">
                <h2>Type of Meal:</h2>
                <CuisinePref />
                <button className="nextButton">Next</button>
                </form>
            </div>
        );
    }
}

/* Top-Level MealTypePage Component */
class MealTypePage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Container />
                <Footer />
            </React.Fragment>
        );
    }
}

const element = <MealTypePage />;
ReactDOM.render(element, document.getElementById('mealType'));