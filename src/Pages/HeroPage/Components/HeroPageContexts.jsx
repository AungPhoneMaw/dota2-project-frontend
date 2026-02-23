import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const HeroAbilitiesContext = createContext();
export const AbilitiesContext = createContext();
export const HeroLoreContext = createContext();
export const HeroesContext = createContext();

export function ContextProvider({children}){
    const heroAbilitiesAPI = "https://api.opendota.com/api/constants/hero_abilities";
    const abilitiesAPI = "https://api.opendota.com/api/constants/abilities";
    const heroLoreAPI = "https://api.opendota.com/api/constants/hero_lore";
    const heroesAPI = "https://api.opendota.com/api/constants/heroes";
    const [heroAbilities, setHeroAbilities] = useState();
    const [abilities, setAbilities] = useState();
    const [heroLore,setHeroLore] = useState();
    const [heroes, setHeroes] = useState();

    useEffect(()=>{
        async function fetchData(){
            try{
                const [heroAbilitiesRes, abilitiesRes, heroLoreRes, heroesRes] = await Promise.all([
                axios.get(heroAbilitiesAPI),
                axios.get(abilitiesAPI),
                axios.get(heroLoreAPI),
                axios.get(heroesAPI)
                ]);

                setHeroAbilities(heroAbilitiesRes.data);
                setAbilities(abilitiesRes.data);
                setHeroLore(heroLoreRes.data);
                setHeroes(heroesRes);
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
                    <HeroesContext.Provider value={heroes}>
                        {children}
                    </HeroesContext.Provider>                        
                </HeroLoreContext.Provider>
            </AbilitiesContext.Provider>
        </HeroAbilitiesContext.Provider>
 
    )
}