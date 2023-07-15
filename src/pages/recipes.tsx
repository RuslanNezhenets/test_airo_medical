import React, {useState} from 'react';
import useBeersStore from "../store";
import {Beer} from "../models/Beer";
import BeerComponent from "../components/Beer";

const Recipes = () => {
    const beers = useBeersStore(state => state.beers.slice(0, 15))
    const deleteBeer = useBeersStore((state) => state.deleteBeer)
    const [highlightedBeers, setHighlightedBeers] = useState<Beer[]>([])

    const handleHighlighted = (event: React.MouseEvent<HTMLDivElement>, beer: Beer) => {
        event.preventDefault()

        if (!highlightedBeers.includes(beer))
            setHighlightedBeers(prevState => [...prevState, beer])
        else
            setHighlightedBeers(prevState => prevState.filter(item => item !== beer))
    }

    const handleDelete = () => {
        for (const item of highlightedBeers) {
            deleteBeer(item)
        }
        setHighlightedBeers([])
    }

    return (
        <div className="App">
            <div className="container">
                <div className="beers">
                    {beers.map((beer) => (
                        <BeerComponent
                            key={beer.id}
                            beer={beer}
                            handleHighlighted={handleHighlighted}
                            highlighted={highlightedBeers.includes(beer)}
                        />
                    ))}
                </div>
                {highlightedBeers.length > 0 &&
                    <div
                        className="button button-delete"
                        onClick={handleDelete}
                    >
                        Delete
                    </div>
                }
            </div>
        </div>
    );
};

export default Recipes;