import React, {useEffect} from 'react';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import './css/App.scss';
import {publicRoutes} from "./routes";
import {RECIPES_ROUTE} from "./utils/consts";
import useBeersStore from "./store";

function App() {
    const fetchBeers = useBeersStore((state) => state.fetchBeers)
    useEffect(() => {
        fetchBeers().then()
    }, [])

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    {publicRoutes.map(route =>
                        <Route key={route.path} path={route.path} element={<route.Component/>}/>
                    )}
                    <Route path="*" element={<Navigate to={RECIPES_ROUTE}/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
