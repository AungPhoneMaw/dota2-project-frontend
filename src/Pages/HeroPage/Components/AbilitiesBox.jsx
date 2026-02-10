import axios from 'axios';
import { useEffect, useState } from "react";

export function AbilitiesBox({heroName}){
    const apiLink = "https://api.opendota.com/api/constants/hero_abilities"
    const [abilities, setAbilities] = useState([]);
    const [talents, setTalents] = useState([]);
    useEffect(()=>{
        axios.get(apiLink).then((response)=>{
            setAbilities(response.data[`npc_dota_hero_${heroName}`]["abilities"]);
            setTalents(response.data[`npc_dota_hero_${heroName}`]["talents"])
            console.log(response.data[`npc_dota_hero_${heroName}`]["abilities"]);
            console.log(response.data[`npc_dota_hero_${heroName}`]["talents"]);
        }).catch((error)=>{
            console.log(error);
        })
    },[])
    return(
        <div className="abilities-box-container">
            <div className = "image-container">
                <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/talents.svg" />
            </div>
            <div className="image-container">
                <img src="/shared/innate-abilityicon.png" />
            </div>
            {abilities.map((ability)=>{
                return(
                    <div key={ability} className = "image_container">
                        <img src = {`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`} />
                    </div>
                )
            })}
            <div className="image-container">
                <img src = "https://www.opendota.com/assets/images/dota2/scepter_0.png"/>
                <img src= "https://www.opendota.com/assets/images/dota2/shard_0.png"/>
            </div>
        </div>
    )
}