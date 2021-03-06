/* INGREDIENTS PAGE*/

/*
* Ingredients Check box to build a single ingredient with selection.
*/
class IngCheckBox extends React.Component {
    render() {
        const ingInfo = this.props.ing;
        return (<React.Fragment>
                <input type="checkbox" id={ingInfo.id} name={ingInfo.id} value={ingInfo.id}/>
                <label htmlFor={ingInfo.id}>
                    <img src={ingInfo.img_url}/>
                    <p>{ingInfo.name}</p>
                </label>
            </React.Fragment>
        );
    }
}

/**
 * Ingredients CheckBox List Item - used to create an ingredient with a single
 * list item.
 */
class IngCheckBoxListItem extends React.Component {
    render() {
        const ingredient = this.props.ingredient;
        return (<React.Fragment>
                <li>
                    <IngCheckBox ing={ingredient}/>
                </li>
            </React.Fragment>
        );
    }
}

/**
 * Ingredients CheckBox List Component - used to create a list of check boxes
 * for ingredients.
 */
class IngCheckBoxList extends React.Component {
    render() {
        const ingredients = this.props.ingredients;
        return (<React.Fragment>
                <ul>
                    {this.props.ingredients.map(ingredient => <IngCheckBoxListItem key={ingredient.id} ingredient={ingredient}/>)}
                </ul>
            </React.Fragment>
        );
    }
}

/**
 * Ingredients category component. Displays ingredients for one category in a
 * horizontal carousel.
 */
class IngCatComponent extends React.Component {
    render() {
        const catTitle = this.props.title;
        const ingredients = this.props.ingredients;
        return (<React.Fragment>
                <h2>{catTitle}</h2>
                <IngCheckBoxList ingredients={ingredients}/>
            </React.Fragment>
        );
    }
}

/*
*  Displays ingredients in a horizontal carousel, allows multi-select of the
*  ingredients.
*/
class IngredientsSelectionComponent extends React.Component {
    render() {
        const milkIngredients = this.props.ingRecord.milkIngredients;
        const vegIngredients= this.props.ingRecord.vegIngredients;
        const meatIngredients = this.props.ingRecord.meatIngredients;
        const breadIngredients = this.props.ingRecord.breadIngredients;
        const spiceIngredients = this.props.ingRecord.spicesIngredients;
        return (<React.Fragment>
                <IngCatComponent title="Dairy & Eggs" ingredients={milkIngredients}/>
                <IngCatComponent title="Fruits & Vegetables" ingredients={vegIngredients}/>
                <IngCatComponent title="Meats" ingredients={meatIngredients}/>
                <IngCatComponent title="Bread & Bakery" ingredients={breadIngredients}/>
                <IngCatComponent title="Herbs & Spices" ingredients={spiceIngredients}/>
            </React.Fragment>
        );
    }

}

/*
*  Ingredients form component. Fetches ingredients from backend API's.
*  Displays ingredients, back and submit button to navigate from the page.
*/
class IngredientsFormComponent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ingRecords: null,
            isLoaded: false
        };
    }
    componentDidMount() {
        fetch('/ingredientInfo')
            .then(response => response.json())
            .then(data => this.setState({ ingRecords: data.ingredients, isLoaded:true}));
    }
    render() {
        const {ingRecords, isLoaded} = this.state;
        if(!isLoaded){
            return <div>Sorry something went wrong!</div>;
        } else {
            return (<React.Fragment>
                    <h1> Select Ingredients </h1>
                    <form action="/cuisinetime" method="post">
                        <IngredientsSelectionComponent ingRecord = {ingRecords} />
                        <button type="submit" className="btn">Next </button>
                    </form>
                </React.Fragment>
            );
        }
    }
}

const element = <IngredientsFormComponent/> ;
ReactDOM.render(element, document.getElementById('content'));