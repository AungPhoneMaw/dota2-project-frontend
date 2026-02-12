import axios from 'axios';
import { use, useEffect, useState, Fragment } from "react";
import "../ComponentsStyle/AbilitiesBox.css"

function AbilityImage({ability}){
    return(
    <div key={ability} className = "image-container">
        <img src = {`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`} 
                        onError = {(e)=>(e.currentTarget.parentElement.style.display="none")}/>
    </div>)
}
export function AbilitiesBox({heroName, abilities}){

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
                    ability.includes("_cancel")?(
                        <Fragment key={ability}/>
                    ):(
                        <AbilityImage ability={ability} key={ability} />    
                    )
                         
                )
            })}
            <div className="image-container">
                <img className = "scepter-icon" src = "https://www.opendota.com/assets/images/dota2/scepter_0.png"/>
                <img className = "shard-icon" src= "https://www.opendota.com/assets/images/dota2/shard_0.png"/>
            </div>
        </div>
    )
}