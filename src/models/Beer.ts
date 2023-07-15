export interface Beer {
    id: number
    name: string
    tagline: string
    first_brewed: string
    description: string
    image_url: string
    abv: number | null
    ibu: number | null
    target_fg: number
    target_og: number
    ebc: number | null
    srm: number | null
    ph: number | null
    attenuation_level: number
    volume: Volume
    boil_volume: Volume
    method: {
        mash_temp: MashTemp[]
        fermentation: Fermentation
        twist: string | null
    };
    ingredients: Ingredients
    food_pairing: string[]
    brewers_tips: string
    contributed_by: string
}


export interface Volume {
    value: number
    unit: string
}

export interface Temperature {
    value: number
    unit: string
}

export interface MashTemp {
    temp: Temperature
    duration: number | null
}

export interface Fermentation {
    temp: Temperature
}

export interface Malt {
    name: string
    amount: Volume
}

export interface Hop {
    name: string
    amount: Volume
    add: string
    attribute: string
}

export interface Ingredients {
    malt: Malt[]
    hops: Hop[]
    yeast: string
}
