import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HeroAbilitiesContext = createContext();
export const AbilitiesContext = createContext();

export function ContextProvider({children}){
    const heroAbilitiesAPI = "https://api.opendota.com/api/constants/hero_abilities";
    const abilitiesAPI = "https://api.opendota.com/api/constants/abilities";
    const [heroAbilities, setHeroAbilities] = useState();
    const [abilities, setAbilities] = useState();

    useEffect(()=>{
        axios.get(heroAbilitiesAPI).then((response)=>{
            setHeroAbilities(response.data);
        })
        axios.get(abilitiesAPI).then((response)=>{
            setAbilities(response.data);
        })
    })
    return(
        <HeroAbilitiesContext.Provider value={heroAbilities}>
            <AbilitiesContext.Provider value={abilities}>
                {children}
            </AbilitiesContext.Provider>
        </HeroAbilitiesContext.Provider>
    )
}