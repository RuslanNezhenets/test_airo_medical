import React, {FC} from 'react';
import {Hop, Ingredients, Malt} from "../models/Beer";
import Ingredient from "./IngredientComponent";

interface IngredientsProps {
    ingredients: Ingredients
}

const IngredientsComponent: FC<IngredientsProps> = ({ingredients}) => {
    function removeRepetitiveIngredients(array: Malt[] | Hop[]): Malt[] | Hop[] {
        let uniqueArray: any[] = []
        const copiedArray = JSON.parse(JSON.stringify(array))
        for (const item of copiedArray) {
            const name = item.name
            const amount = item.amount.value
            if (uniqueArray.some(item => item.name === name)) {
                uniqueArray.find(item => item.name === name).amount.value += amount
            } else {
                uniqueArray.push(item)
            }
        }
        return uniqueArray
    }


    return (
        <div className="beer_ingredients_table">
            <div className="beer_ingredients_table-type">
                <div><b>Malt</b></div>
                <div>
                    {ingredients.malt.map(((ingredient, i) => (
                        <Ingredient key={i} ingredient={ingredient}/>
                    )))}
                </div>
            </div>
            <div className="beer_ingredients_table-type">
                <div><b>Hops</b></div>
                <div>
                    {removeRepetitiveIngredients(ingredients.hops).map(((ingredient, i) => (
                        <Ingredient key={i} ingredient={ingredient}/>
                    )))}
                </div>
            </div>
            <div className="beer_ingredients_table-type">
                <div><b>Yeast</b></div>
                <div>{ingredients.yeast}</div>
            </div>
        </div>

    );
};

export default IngredientsComponent;