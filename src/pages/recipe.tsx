import React, {useEffect, useState} from 'react';
import useBeersStore from "../store";
import {Beer} from "../models/Beer";
import {useParams} from "react-router-dom";
import {RECIPES_ROUTE} from "../utils/consts";

const Recipe = () => {
    const beers = useBeersStore((state) => state.beers)
    const getBeer = useBeersStore((state) => state.getBeer)
    const [beer, setBeer] = useState<Beer>()
    const {id} = useParams<string>()

    useEffect(() => {
        if (id) getBeer(id).then(beer => setBeer(beer))
    }, [beers])

    return (
        <>
            <a href={RECIPES_ROUTE}>
                <img className="back" src="https://cdn-icons-png.flaticon.com/512/10627/10627016.png" alt="back"/>
            </a>
            {beer && <div className="recipe_details container">
                <div className="recipe_header">
                    <div className="recipe_image">
                        <img src={beer.image_url} alt="Beer Image"/>
                    </div>
                    <div className="recipe_info">
                        <h1>{beer?.name}</h1>
                        <p className="recipe_tagline">"{beer.tagline}"</p>
                        <p><label>Description: </label> {beer.description}</p>
                        <p><label>First Brewed:</label> {beer.first_brewed}</p>
                        <p><label>ABV: </label> {beer.abv}%</p>
                        <p><label>IBU: </label> {beer.ibu}</p>
                        <div className="recipe_method">
                            <p>
                                <label>Mash Temp: </label>
                                {` ${beer.method.mash_temp[0].temp.value}
                                ${beer.method.mash_temp[0].temp.unit} 
                                (${beer.method.mash_temp[0].duration} minutes)`}</p>
                            <p>
                                <label>Fermentation Temp:</label>
                                {` ${beer.method.fermentation.temp.value}
                                ${beer.method.fermentation.temp.unit}`}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="recipe_ingredients">
                    <h3 className="text-center">Ingredients</h3>
                    <div className="recipe_ingredients_name">Malt</div>
                    <table className="recipe_ingredients_table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                        </tr>
                        </thead>
                        <tbody>
                        {beer.ingredients.malt.map((ingredient, i) => (
                            <tr key={i}>
                                <td>{ingredient.name}</td>
                                <td>{`${ingredient.amount.value} ${ingredient.amount.unit}`}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <div className="recipe_ingredients_name">Hops</div>
                    <table className="recipe_ingredients_table">
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Amount</th>
                            <th>Phase</th>
                            <th>Attribute</th>
                        </tr>
                        </thead>
                        <tbody>
                        {beer.ingredients.hops.map((ingredient, i) => (
                            <tr key={i}>
                                <td>{ingredient.name}</td>
                                <td>{ingredient.amount.value} {ingredient.amount.unit}</td>
                                <td>{ingredient.add}</td>
                                <td>{ingredient.attribute}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>


                    <div className="recipe_ingredients_name">Yeast</div>
                    <p>{beer.ingredients.yeast}</p>
                </div>
                <div className="food_pairing">
                    <p>
                        <label>Food Pairing:</label></p>
                    <ul>
                        {beer.food_pairing.map((pairing, i) => (
                            <li key={i}>{pairing}</li>
                        ))}
                    </ul>
                </div>
                <div className="brewers_tips">
                    <p><label>Brewers Tips:</label></p>
                    <p>{beer.brewers_tips}</p>
                </div>
                <div><i><label>Contributed by</label> {beer.contributed_by}</i></div>
            </div>}
        </>
    );
};

export default Recipe;