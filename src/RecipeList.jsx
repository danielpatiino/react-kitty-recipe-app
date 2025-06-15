import React from "react";

/**
 * RecipeList component renders a list of recipes or a highlighted random recipe.
 * @param {Object} props
 * @param {Object|null} props.randomRecipe - The random recipe to highlight, if any
 * @param {Array} props.possibleRecipes - List of possible recipes to display
 */
export default function RecipeList({ randomRecipe, possibleRecipes }) {
  return (
    <div className="recipes-box">
      <h2>Meowlicious Recipes</h2>
      {randomRecipe ? (
        <div className="random-recipe-highlight">
          <span role="img" aria-label="food">{randomRecipe.emoji}</span> <b>{randomRecipe.name}</b> <span className="recipe-ingredients">({randomRecipe.ingredients.join(", ")})</span>
        </div>
      ) : possibleRecipes.length === 0 ? (
        <p>No recipes found. Try different combinations!</p>
      ) : (
        <ul>
          {possibleRecipes.map(recipe => (
            <li key={recipe.name} className="recipe-animate">
              <span role="img" aria-label="food">{recipe.emoji}</span> <b>{recipe.name}</b> <span className="recipe-ingredients">({recipe.ingredients.join(", ")})</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
