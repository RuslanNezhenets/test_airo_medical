import {
    RECIPES_ROUTE,
    RECIPE_ROUTE
} from "./utils/consts";
import Recipes from "./pages/recipes";
import Recipe from "./pages/recipe";

export const publicRoutes = [
    {path: RECIPES_ROUTE, Component: Recipes },
    {path: RECIPE_ROUTE, Component: Recipe }
]