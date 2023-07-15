import React, {FC} from 'react';
import {Hop, Malt} from "../models/Beer";

interface IngredientProps {
    ingredient: Malt | Hop
}

const IngredientComponent: FC<IngredientProps> = ({ingredient}) => {
    function unit(): string{
        switch (ingredient.amount.unit) {
            case 'kilograms':
                return 'kg'
            case 'grams':
                return 'g'
            default:
                return ''
        }
    }

    return (
        <div className="beer_ingredients_row">
            <div className="beer_ingredients_row-name">{ingredient.name}</div>
            <div className="beer_ingredients_row-value">{ingredient.amount.value} {unit()}</div>
        </div>
    );
};

export default IngredientComponent;