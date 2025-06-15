import React, { useState } from "react";
import "./App.css";
import confetti from "canvas-confetti";
import IngredientList from "./IngredientList";
import RecipeList from "./RecipeList";

// List of available ingredients
const INGREDIENTS = [
  "Chicken",
  "Onion",
  "Garlic",
  "Cucumber",
  "Cabbage",
  "Lettuce",
  "Rice",
  "Beans",
  "Macaroni",
  "Spaghetti",
  "Pork",
  "Tomatoes",
  "Lemons",
  "Strawberries",
  "Bananas",
  "Potatoes", 
  "Sausages"  
];

// Mapping of ingredient names to emojis for display
const INGREDIENT_EMOJIS = {
  "Chicken": "🍗",
  "Onion": "🧅",
  "Garlic": "🧄",
  "Cucumber": "🥒",
  "Cabbage": "🥬",
  "Lettuce": "🥗",
  "Rice": "🍚",
  "Beans": "🫘",
  "Macaroni": "🍝",
  "Spaghetti": "🍝",
  "Pork": "🐷",
  "Tomatoes": "🍅",
  "Lemons": "🍋",
  "Strawberries": "🍓",
  "Bananas": "🍌",
  "Potatoes": "🥔", // Added
  "Sausages": "🌭"   // Added
};

// List of all possible recipes with their required ingredients
const RECIPES = [
  { name: "Whisker-Lickin' Rice Fiesta", emoji: "🍚", ingredients: ["Chicken", "Rice", "Onion", "Garlic"] },
  { name: "Purrfect Pork Pasta", emoji: "🍝", ingredients: ["Spaghetti", "Pork", "Onion", "Garlic", "Tomatoes"] },
  { name: "Cheddar Paws Mac & Chick", emoji: "🧀", ingredients: ["Chicken", "Macaroni", "Garlic"] },
  { name: "Cabbage Cuddle Bowl", emoji: "🥬", ingredients: ["Pork", "Onion", "Garlic", "Cabbage"] },
  { name: "Tomato Tangle Spaghetti", emoji: "🍅", ingredients: ["Spaghetti", "Tomatoes", "Garlic"] },
  { name: "Leafy Kitty Paw Wraps", emoji: "🥗", ingredients: ["Chicken", "Lettuce", "Onion", "Garlic"] },
  { name: "Lazy Kitty Beans & Rice", emoji: "🍛", ingredients: ["Beans", "Rice", "Onion"] },
  { name: "Whisker Tacos (deconstructed)", emoji: "🌮", ingredients: ["Pork", "Onion", "Lettuce", "Tomatoes"] },
  { name: "Catnap Creamy Noodle Bake", emoji: "🍲", ingredients: ["Chicken", "Macaroni", "Onion", "Garlic"] },
  { name: "Zesty Lemon Kitty Clucks", emoji: "🍋", ingredients: ["Chicken", "Garlic", "Lemons"] },
  { name: "Tomato Snuggle Pilaf", emoji: "🍚", ingredients: ["Tomatoes", "Rice", "Onion", "Garlic"] },
  { name: "Meowbean Energy Bowl", emoji: "🥣", ingredients: ["Chicken", "Beans", "Rice"] },
  { name: "Piglet Fried Rice", emoji: "🐷", ingredients: ["Pork", "Rice", "Onion", "Garlic"] },
  { name: "Veggie Pawsta", emoji: "🥦", ingredients: ["Spaghetti", "Onion", "Cabbage", "Tomatoes"] },
  { name: "Crispy Cucumber Cluck", emoji: "🥒", ingredients: ["Chicken", "Lettuce", "Cucumber", "Onion"] },
  { name: "Tomato Dream Mac", emoji: "🍅", ingredients: ["Macaroni", "Tomatoes"] },
  { name: "Kitten-Bean Stew", emoji: "🍲", ingredients: ["Pork", "Beans", "Tomatoes", "Onion"] },
  { name: "Berry Best Smoothie", emoji: "🍓", ingredients: ["Bananas", "Strawberries"] },
  { name: "Tomato Purrfection Bowl", emoji: "🍲", ingredients: ["Chicken", "Tomatoes", "Rice"] },
  { name: "Bolognese Whiskers", emoji: "🍝", ingredients: ["Spaghetti", "Pork", "Onion", "Garlic"] },
  { name: "Piggy Lettuce Bites", emoji: "🥬", ingredients: ["Pork", "Lettuce", "Garlic"] },
  { name: "Snuggly Bean Cat Bowl", emoji: "🍲", ingredients: ["Garlic", "Beans", "Rice"] },
  { name: "Sunshine Pork Chops", emoji: "🍋", ingredients: ["Pork", "Lemons", "Garlic"] },
  { name: "Purr & Crunch Cabbage Stir", emoji: "🥬", ingredients: ["Chicken", "Cabbage", "Garlic", "Onion"] },
  { name: "Cool Cat Salad", emoji: "🥗", ingredients: ["Tomatoes", "Cucumber", "Onion"] },
  { name: "Snuggle Mac Chick Bake", emoji: "🍗", ingredients: ["Chicken", "Macaroni", "Garlic"] },
  { name: "Snout & Cabbage Skillet", emoji: "🥘", ingredients: ["Pork", "Cabbage", "Onion", "Garlic"] },
  { name: "Banana Cloud Purrfait", emoji: "🍌", ingredients: ["Bananas", "Strawberries"] },
  { name: "Zesty Bean Paws", emoji: "🍋", ingredients: ["Lemons", "Garlic", "Beans"] },
  { name: "Meow-meow Lemon Pasta", emoji: "🍝", ingredients: ["Spaghetti", "Garlic", "Lemons"] },
  { name: "Warm Kitty Broth", emoji: "🍲", ingredients: ["Chicken", "Rice", "Onion", "Garlic"] },
  { name: "Crunchy Bean Cabbage", emoji: "🥬", ingredients: ["Cabbage", "Beans", "Garlic"] },
  { name: "Cucumber Hug Wraps", emoji: "🥒", ingredients: ["Chicken", "Cucumber", "Lettuce"] },
  { name: "Oink Mac Skillet", emoji: "🐷", ingredients: ["Pork", "Macaroni", "Onion"] },
  { name: "Lonely Banana Hug", emoji: "🍌", ingredients: ["Bananas"] },
  { name: "Tomato Pork Belly Bowl", emoji: "🍲", ingredients: ["Pork", "Tomatoes", "Rice"] },
  { name: "Lemony Kitty Pickle", emoji: "🥒", ingredients: ["Cucumber", "Garlic", "Lemons"] },
  { name: "Cabbage Soup Snuggle", emoji: "🥬", ingredients: ["Chicken", "Cabbage", "Onion", "Garlic"] },
  { name: "Beanie Meow Bake", emoji: "🍲", ingredients: ["Beans", "Spaghetti", "Garlic"] },
  { name: "Tomato Snort Stew", emoji: "🍅", ingredients: ["Pork", "Tomatoes", "Garlic"] },
  { name: "Meadow Mew Salad", emoji: "🥗", ingredients: ["Cucumber", "Lettuce"] },
  { name: "Macaroni Cluck Chunks", emoji: "🍗", ingredients: ["Chicken", "Macaroni", "Onion"] },
  { name: "Pork Wrap-a-paws", emoji: "🥬", ingredients: ["Pork", "Rice", "Cabbage"] },
  { name: "Salad Surprise Trio", emoji: "🥗", ingredients: ["Tomatoes", "Cucumber", "Lettuce"] },
  { name: "Sunshine Kitty Garlic Bowl", emoji: "🍋", ingredients: ["Chicken", "Garlic", "Rice"] },
  { name: "Lemon Paws Salad", emoji: "🍋", ingredients: ["Chicken", "Lettuce", "Lemons"] },
  { name: "Purrberry Dream Smoothie", emoji: "🍓", ingredients: ["Bananas", "Strawberries"] },
  { name: "Bean Quesa-Kitty", emoji: "🌮", ingredients: ["Chicken", "Beans", "Garlic"] },
  { name: "Mac Meow Porky", emoji: "🐷", ingredients: ["Pork", "Macaroni", "Onion"] },
  { name: "Spaghetti Bean-a-Bite", emoji: "🍝", ingredients: ["Spaghetti", "Garlic", "Beans"] },
  { name: "Garlic Potato Wedges", emoji: "🥔", ingredients: ["Potatoes", "Garlic", "Onion", "Lemons"] },
  { name: "Potato Cabbage Hash", emoji: "🥔", ingredients: ["Potatoes", "Cabbage", "Onion", "Garlic"] },
  { name: "Lemon Kitty Cozy Bake", emoji: "🍗", ingredients: ["Chicken", "Potatoes", "Garlic", "Lemons"] },
  { name: "Beanie Tater Stew", emoji: "🥔", ingredients: ["Potatoes", "Beans", "Tomatoes", "Onion"] },
  { name: "Piglet Spud Sizzle", emoji: "🐷", ingredients: ["Pork", "Potatoes", "Onion", "Garlic"] },
  { name: "Snoozy Sausage Rice Skillet", emoji: "🌭", ingredients: ["Sausages", "Rice", "Onion", "Garlic"] },
  { name: "Twirl & Waggle Sausage Pasta", emoji: "🍝", ingredients: ["Spaghetti", "Sausages", "Tomatoes", "Garlic"] },
  { name: "Snuggle Pup Cabbage Skillet", emoji: "🌭", ingredients: ["Sausages", "Cabbage", "Onion", "Garlic"] },
  { name: "Macaroni Meow-sage Bake", emoji: "🍝", ingredients: ["Macaroni", "Sausages", "Tomatoes", "Onion"] },
  { name: "Sausage Bean Parade", emoji: "🌭", ingredients: ["Sausages", "Beans", "Tomatoes", "Garlic"] },
];

/**
 * Returns recipes that include ALL selected ingredients.
 * @param {string[]} selectedIngredients
 * @returns {Array}
 */
function getPossibleRecipes(selectedIngredients) {
  if (selectedIngredients.length === 0) return [];
  // Show recipes that include ALL selected ingredients
  return RECIPES.filter((recipe) =>
    selectedIngredients.every((ing) => recipe.ingredients.includes(ing))
  );
}

/**
 * Returns a random recipe from the filtered list (or all if none selected).
 * @param {string[]} selectedIngredients
 * @returns {Object|null}
 */
function getRandomRecipe(selectedIngredients) {
  // If no ingredients selected, pick from all recipes
  const possible = selectedIngredients.length === 0 ? RECIPES : getPossibleRecipes(selectedIngredients);
  if (possible.length === 0) return null;
  return possible[Math.floor(Math.random() * possible.length)];
}

/**
 * Main App component for Lea's Kitty Kitchen
 */
export default function App() {
  // State for selected ingredients
  const [selected, setSelected] = useState([]);
  // State for the currently displayed random recipe
  const [randomRecipe, setRandomRecipe] = useState(null);

  // Handles toggling ingredient selection
  const toggleIngredient = (ingredient) => {
    setSelected((sel) => {
      const newSel = sel.includes(ingredient)
        ? sel.filter((i) => i !== ingredient)
        : [...sel, ingredient];
      setRandomRecipe(null); // Reset random recipe on ingredient change
      return newSel;
    });
  };

  // Clears all selected ingredients
  const clearAll = () => {
    setSelected([]);
    setRandomRecipe(null); // Reset random recipe on clear
  };

  // Recipes that match the selected ingredients
  const possibleRecipes = getPossibleRecipes(selected);

  // Handles picking a random recipe and showing confetti
  const handleRandomRecipe = () => {
    // Always pick from all recipes, not filtered by selected ingredients
    const recipe = RECIPES[Math.floor(Math.random() * RECIPES.length)];
    setRandomRecipe(recipe);
    setSelected([]); // Clear all checkboxes when random recipe is clicked
    if (recipe) confetti({ particleCount: 80, spread: 70, origin: { y: 0.5 } });
  };

  return (
    <div className="kitty-container">
      {/* Cat image header */}
      <div className="cute-cat-img-wrapper">
        <img
          src="/images/cutecat.png"
          alt="Cute Cat"
          className="cute-cat-img"
        />
      </div>
      <h1>
        Lea's Kitty Kitchen <span role="img" aria-label="cat">🐾</span>
      </h1>
      <p className="kitty-greeting">
        Hi! Ready to cook something meowlicious? <span role="img" aria-label="sparkle">✨</span>
      </p>
      {/* Ingredient selection form */}
      <IngredientList
        ingredients={INGREDIENTS}
        ingredientEmojis={INGREDIENT_EMOJIS}
        selected={selected}
        toggleIngredient={toggleIngredient}
      />
      <div className="button-row">
        <button type="button" className="kitty-btn" onClick={handleRandomRecipe}>
          🎲 Random Recipe
        </button>
        <button type="button" className="kitty-btn" onClick={clearAll} disabled={selected.length === 0}>
          ❌ Clear All
        </button>
      </div>
      {/* Recipe results section */}
      <RecipeList randomRecipe={randomRecipe} possibleRecipes={possibleRecipes} />
      <footer className="kitty-footer">
        Made with <span role="img" aria-label="heart">❤️</span> 
      </footer>
    </div>
  );
}
