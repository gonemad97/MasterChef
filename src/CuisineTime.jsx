/* CUISINE/PREP TIME PAGE */

/* Cuisine Preference Component */
class CuisinePref extends React.Component {
    // variable states for cuisine types are initially false as user hasn't checkboxed them. Once
    // user checkboxes them on the onChange variable states turn true for respective
    // variable cuisine types.
    constructor(props){
        super(props);
        this.state = {
            American: false,
            Chinese: false,
            Mexican:false,
            Indian: false,
            Persian: false
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.checked});
    }

    render() {
        return (
            <div className="cuisine">
                    <input type="checkbox" id="American" name="American" onChange={this.handleChange} value={this.state.American} />
                    <label className="cuisinePreference" htmlFor="American">American</label>

                    <input type="checkbox" id="Chinese" name="Chinese" onChange={this.handleChange} value={this.state.Chinese} />
                    <label className="cuisinePreference" htmlFor="Chinese">Chinese</label>

                    <input type="checkbox" id="Mexican" name="Mexican" onChange={this.handleChange} value={this.state.Mexican}/>
                    <label className="cuisinePreference" htmlFor="Mexican">Mexican</label><br/>

                    <input type="checkbox" id="Indian" name="Indian" onChange={this.handleChange} value={this.state.Indian}/>
                    <label className="cuisinePreference" htmlFor="Indian">Indian</label>

                    <input type="checkbox" id="Persian" name="Persian" onChange={this.handleChange} value={this.state.Persian}/>
                    <label className="cuisinePreference" htmlFor="Persian">Persian</label><br/>
                    <br/>
            </div>
        );
    }
}

/* Hours and Minutes Input Component */
class HoursMinInput extends React.Component {
    // variable states for hours and minutes are initially empty as user hasn't selected them. Once
    // user selects them on the onChange variable states get the number value selected for respective
    // hours and minutes
    constructor(){
        super();
        this.state = {
            hours: '',
            minutes:''
        };
        this.handleChangeHours = this.handleChangeHours.bind(this);
        this.handleChangeMin = this.handleChangeMin.bind(this);
    }

    handleChangeHours(event) {
        this.setState({hours: event.target.value});
    }

    handleChangeMin(event){
        this.setState({minutes: event.target.value});
    }

    render() {
        return (
            <div className="timeInputs">
                    <label htmlFor="hours">Hours:  </label>
                    <select name="hours" id="hours" value={this.state.hours} onChange={this.handleChangeHours}>
                        <option value=""></option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                    </select>
                    <label className="minutesInput" htmlFor="minutes">Minutes:  </label>
                    <select name="minutes" id="minutes" value={this.state.minutes} onChange={this.handleChangeMin}>
                        <option value=""></option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                        <option value="20">20</option>
                        <option value="25">25</option>
                        <option value="30">30</option>
                        <option value="35">35</option>
                        <option value="40">40</option>
                        <option value="45">45</option>
                        <option value="50">50</option>
                        <option value="55">55</option>
                    </select>
            </div>

        );
    }
}

/* Footer Component */
function Footer(){
    return (
        <footer>
            <div>
                <form action="/ingredients" method="get">
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
                <div>
                    <form action="/mealtype" method="post">
                        <h2>Cook Time</h2>
                        <HoursMinInput />
                        <h2>Cuisine</h2>
                        <CuisinePref/>
                        <button className="nextButton">Next</button>
                    </form>
                </div>
            </div>

        );
    }
}

/* Top-Level SelectPage Component */
class SelectPage extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Container />
                <Footer/>
            </React.Fragment>
        );
    }
}

const element = <SelectPage />;
ReactDOM.render(element, document.getElementById('cuisineTime'));