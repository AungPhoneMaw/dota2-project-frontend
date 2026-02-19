import axios from 'axios';
import {heroInnates} from '../../../assets/heroInnates'
import { heroAghanim } from '../../../assets/heroAghanim';
import { use, useEffect, useState, Fragment } from "react";
import {AbilityTooltip, TalentTreeTooltip, 
        InnateTooltip, ScepterTooltip, ShardTooltip} from './Tooltips'
import "../ComponentsStyle/AbilitiesBox.css"

//tooltips components

//main components -->AbilityImage, AbilityImages

function AbilityImage({heroName, ability}){
    const [showTooltip, setShowTooltip] = useState(false);
    const apiLink = "https://api.opendota.com/api/constants/abilities";
    const [displayName, setDisplayName] = useState("");
    const [description, setDescription] = useState("");
    const [lore, setLore] = useState("");
    // get title, icon, description from the api

    useEffect(()=>{
        axios.get(apiLink).then((response)=>{
            setDisplayName(response.data[ability]["dname"])
            setDescription(response.data[ability]["desc"])
            setLore(response.data[ability]["lore"])
            
        })
    },[])
    return(
    <div key={ability} className = "image-container" 
    onMouseEnter={()=>{setShowTooltip(true)}} 
    onMouseLeave={()=>{setShowTooltip(false)}}>
        { showTooltip && <AbilityTooltip heroName={heroName} ability={ability} title={displayName} 
        desc = {description} lore={lore}/>}
        <img src = {`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`} 
                        onError = {(e)=>(e.currentTarget.parentElement.style.display="none")}/>
    </div>)
}

//export Component : AbilitiesBox

export function AbilitiesBox({heroName, abilities}){
    const [showInnateTooltip, setShowInnateTooltip] =  useState(false);
    const [showScepterTooltip, setShowScepterTooltip] =  useState(false);
    const [showShardTooltip, setShowShardTooltip] =  useState(false);
    const [showTalentTreeTooltip, setShowTalentTreeTooltip] =  useState(false);

    return(
        <div className="abilities-box-container">
            {/* Talent Treee */}
            <div className = "talent-tree image-container" 
            onMouseEnter={()=>{setShowTalentTreeTooltip(true)}}
            onMouseLeave={()=>{setShowTalentTreeTooltip(false)}}>
                {showTalentTreeTooltip && <TalentTreeTooltip heroName={heroName} />}
                <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/talents.svg" />
            </div>
            {/* Innate Ability */}
            <div className="innate-ability image-container"
            onMouseEnter={()=>{setShowInnateTooltip(true)}}
            onMouseLeave={()=>{setShowInnateTooltip(false)}}>
                {showInnateTooltip && <InnateTooltip heroName={heroName}/>}
                <img src="/shared/innate-abilityicon.png" />
            </div>
            {/* Hero Abilities */}
            {abilities.map((ability)=>{
                return(
                    ability.includes("_cancel")?(
                        <Fragment key={ability}/>
                    ):(
                        <AbilityImage heroName={heroName} ability={ability} key={ability} />    
                    )
                         
                )
            })}
            {/* Aghanim scepter and shard */}
            <div className="image-container">
                <div className='wrapper'
                    onMouseEnter={()=>{setShowScepterTooltip(true)}}
                    onMouseLeave={()=>{setShowScepterTooltip(false)}}>
                    {showScepterTooltip && <ScepterTooltip heroName={heroName} />}
                    <img className = "scepter-icon" src = "https://www.opendota.com/assets/images/dota2/scepter_0.png"/>
                </div>
                <div className='wrapper' 
                    onMouseEnter={()=>{setShowShardTooltip(true)}}
                    onMouseLeave={()=>{setShowShardTooltip(false)}}>
                    {showShardTooltip && <ShardTooltip heroName={heroName} />}
                    <img className = "shard-icon" src= "https://www.opendota.com/assets/images/dota2/shard_0.png"/>
                </div>
            </div>
        </div>
    )
}