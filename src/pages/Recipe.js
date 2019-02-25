//Dependencies
import React from 'react';
import { Helmet } from 'react-helmet'

//API
import mealdb from '../mealdb-api'

//Components
import RecipeIngredients from '../components/RecipeIngredients'
import RecipeInstructions from '../components/RecipeInstructions'

class Recipe extends React.Component {

  constructor(props) {
    super(props)
    this.state = { recipe: null, isLoading: true }
  }

  async componentDidMount() {
    var recipe = null
    try {
      recipe = await mealdb.getRecipe(this.props.match.params.recipeId)
    } catch(e) {
      recipe = null
    }
    this.setState({ recipe, isLoading: false })
  }

  render() {
    const { recipe, isLoading } = this.state

    if( isLoading ) {
      return <div className="message">Loading...</div>
    }
    else if( recipe === null ) {
      return <div className="message">Something was wrong :(</div>
    }

    return <div className="Recipe">
      <Helmet>
        <title>{ recipe.name }</title>
      </Helmet>

      <div className="hero" style={{ backgroundImage: `url(${recipe.thumbnail})` }} />
      
      <div className="title">
        <div className="info">
          <h1>{ recipe.name }</h1>
          <p>{ recipe.origin }</p>
        </div>
        <div>
        </div>
      </div>


      <RecipeIngredients ingredients={ recipe.ingredients } />

      <RecipeInstructions instructions={ recipe.instructions } />

    </div>
  }

}

export default Recipe;