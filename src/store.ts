import {create} from "zustand";
import {devtools} from 'zustand/middleware';
import {Beer} from "./models/Beer";
import {immer} from "zustand/middleware/immer";

interface BeersState {
    beers: Beer[];
    page: number;
    fetchBeers: () => Promise<void>;
    getBeer: (id: string) => Promise<Beer | undefined>;
    deleteBeer: (beer: Beer) => void;
}

const useBeersStore = create<BeersState>()(
    devtools(
        immer((set, get) => ({
            beers: [],
            page: 1,
            fetchBeers: async () => {
                const result = await fetch(`https://api.punkapi.com/v2/beers?page=${get().page}`)
                const json = await result.json() as Beer[]
                set({beers: json})
            },
            getBeer: async (id: string): Promise<Beer | undefined> => {
                const result = await fetch(`https://api.punkapi.com/v2/beers/${id}`)
                const json = await result.json() as Beer[]
                return json[0] || undefined
            },
            deleteBeer: async (deleted: Beer) => {
                await set((state) => {
                    state.beers = state.beers.filter((beer) => beer.id !== deleted.id)
                })
                const state = get()
                if (state.beers.length === 0) {
                    state.page += 1
                    await state.fetchBeers()
                }
            },

        })),
        {name: 'beers-store'}
    )
);

export default useBeersStore;
