import React, {FC, useState} from 'react';
import {Beer} from "../models/Beer";
import IngredientsComponent from "./IngredientsComponent";
import {RECIPES_ROUTE} from "../utils/consts";

interface BeerProps {
    beer: Beer,
    highlighted: boolean,
    handleHighlighted: (event: React.MouseEvent<HTMLDivElement>, beer: Beer) => void
}

const BeerComponent: FC<BeerProps> = ({beer, highlighted, handleHighlighted}) => {
    const [showIngredients, setShowIngredients] = useState(false)

    function quantityIngredients() {
        const uniqueIngredients = new Set()

        for (const key in beer.ingredients) {
            if (beer.ingredients.hasOwnProperty(key)) {
                const ingredients = (beer.ingredients as any)[key]
                if (Array.isArray(ingredients)) {
                    ingredients.forEach((ingredient) => {
                        uniqueIngredients.add(ingredient.name)
                    })
                } else {
                    uniqueIngredients.add(ingredients)
                }
            }
        }
        return uniqueIngredients.size
    }

    function handleClick() {
        window.location.href = `${RECIPES_ROUTE}/${beer.id}`
    }

    return (
        <div
            className={`beer ${highlighted && 'highlighted'}`}
            onContextMenu={(event) => handleHighlighted(event, beer)}
        >
            <div className="beer_img">
                <img src={beer.image_url} alt={beer.name} onClick={handleClick}/>
            </div>
            <div className="beer_content">
                <div className="beer_title" onClick={handleClick}>{beer.name}</div>
                <div className="beer_tagline"><i>"{beer.tagline}"</i></div>
                <div>
                    <div className="beer_abv">Strength: {beer.abv} %</div>
                    <div className="beer_ibu">Bitterness: {beer.ibu} IBUs</div>
                    <div className="beer_ibu">Chromaticity: {beer.srm} SRM</div>
                    <div className="beer_ibu">Lot size: {beer.volume.value} {beer.volume.unit}</div>
                </div>
            </div>
            <div className="beer_ingredients">
                <div
                    className={`beer_ingredients_title ${showIngredients ? 'active' : ''}`}
                    onClick={() => setShowIngredients(!showIngredients)}
                >
                    {quantityIngredients()} ingredients
                </div>
                <div
                    className={`beer_ingredients_content ${showIngredients ? 'visible' : ''}`}
                >
                    <IngredientsComponent ingredients={beer.ingredients}/>
                </div>
            </div>
        </div>
    );
};

export default BeerComponent;