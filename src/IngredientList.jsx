import React from "react";

/**
 * IngredientList component renders a list of ingredient checkboxes.
 * @param {Object} props
 * @param {string[]} props.ingredients - List of ingredient names
 * @param {Object} props.ingredientEmojis - Mapping of ingredient names to emojis
 * @param {string[]} props.selected - Currently selected ingredients
 * @param {function} props.toggleIngredient - Handler for toggling ingredient selection
 */
export default function IngredientList({ ingredients, ingredientEmojis, selected, toggleIngredient }) {
  return (
    <form className="ingredients-list">
      {ingredients.map((ingredient) => (
        <label key={ingredient}>
          <input
            type="checkbox"
            checked={selected.includes(ingredient)}
            onChange={() => toggleIngredient(ingredient)}
          />
          <span>{ingredientEmojis[ingredient]} {ingredient}</span>
        </label>
      ))}
    </form>
  );
}
