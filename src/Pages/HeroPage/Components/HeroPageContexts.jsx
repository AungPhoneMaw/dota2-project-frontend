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
        async function fetchData(){
            try{
                const [heroAbilitiesRes, abilitiesRes] = await Promise.all([
                axios.get(heroAbilitiesAPI),
                axios.get(abilitiesAPI)
                ]);

                setHeroAbilities(heroAbilitiesRes);
                setAbilities(abilitiesRes);
            } catch(error){
                console.error("API error :", error);
            }
            
            
        }

        // -------------------------------------------------------------

    }, [])
    return(
        <HeroAbilitiesContext.Provider value={{heroAbilities}}>
            <AbilitiesContext.Provider value={{abilities}}>
                {children}
            </AbilitiesContext.Provider>
        </HeroAbilitiesContext.Provider>
    )
}