import axios from 'axios';
import { use, useEffect, useState, Fragment } from "react";
import "../ComponentsStyle/AbilitiesBox.css"

function AbilityTooltip({ability, title, desc}){

    return(
        <div className="ability-tooltip-container">
            <div className="ability-tooltip-header-container">
                <div className="ability-tooltip-icon-container">
                    <img src = {`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`} 
                        onError = {(e)=>(e.currentTarget.parentElement.style.display="none")}/>
                </div>
                <h1 className="ability-tooltip-title">
                    {title}
                </h1>
            </div>
            <div className="ability-tooltip-description-container">
                <p className = "ability-tooltip-description">{desc}</p>
            </div>
        </div>
    )
}

function TalentsTooltip(){

}

function InnateTooltip(){

}

function AghanimTooltip(){

}
function AbilityImage({ability}){
    const [showTooltip, setShowTooltip] = useState(false);
    const apiLink = "https://api.opendota.com/api/constants/abilities";
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    
    // get title, icon, description from the api

    useEffect(()=>{
        axios.get(apiLink).then((response)=>{
            setDisplayName(response.data[ability]["dname"])
            setDescription(response.data[ability]["desc"])
            
        })
    })
    return(
    <div key={ability} className = "image-container" 
    onMouseEnter={()=>{setShowTooltip(true)}} 
    onMouseLeave={()=>{setShowTooltip(false)}}>
        { showTooltip && <AbilityTooltip ability={ability} title={displayName} 
        desc = {description}/>}
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