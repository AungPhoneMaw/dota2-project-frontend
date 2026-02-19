import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HeroAbilitiesContext = createContext();
export const AbilitiesContext = createContext();
export const HeroLoreContext = createContext();


export function ContextProvider({children}){
    const heroAbilitiesAPI = "https://api.opendota.com/api/constants/hero_abilities";
    const abilitiesAPI = "https://api.opendota.com/api/constants/abilities";
    const heroLoreAPI = "https://api.opendota.com/api/constants/hero_lore";
    const [heroAbilities, setHeroAbilities] = useState();
    const [abilities, setAbilities] = useState();
    const [heroLore,setHeroLore] = useState();

    useEffect(()=>{
        async function fetchData(){
            try{
                const [heroAbilitiesRes, abilitiesRes, heroLoreRes] = await Promise.all([
                axios.get(heroAbilitiesAPI),
                axios.get(abilitiesAPI),
                axios.get(heroLoreAPI)
                ]);

                setHeroAbilities(heroAbilitiesRes.data);
                setAbilities(abilitiesRes.data);
                setHeroLore(heroLoreRes.data);
            } catch(error){
                console.error("API error :", error);
            }
            
            
        }

        fetchData();

        // -------------------------------------------------------------

    }, [])
    return(

        <HeroAbilitiesContext.Provider value={heroAbilities}>
            <AbilitiesContext.Provider value={abilities}>
                <HeroLoreContext.Provider value= {heroLore}>
                        {children}
                </HeroLoreContext.Provider>
            </AbilitiesContext.Provider>
        </HeroAbilitiesContext.Provider>
 
    )
}