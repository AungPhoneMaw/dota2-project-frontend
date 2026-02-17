import axios from 'axios';
import {heroInnates} from '../../../assets/heroInnates'
import { heroAghanim } from '../../../assets/heroAghanim';
import { use, useEffect, useState, Fragment } from "react";
import "../ComponentsStyle/AbilitiesBox.css"

//tooltips components

function BaseTooltipContainer({icon, title, desc}){
    return(
        <>
            <div className="ability-tooltip-header-container">
                <div className="ability-tooltip-icon-container">
                    <img src = {icon} 
                        onError = {(e)=>(e.currentTarget.parentElement.style.display="none")}/>
                </div>
                <h1 className="ability-tooltip-title">
                    {title}
                </h1>
            </div>
            <div className="ability-tooltip-description-container">
                <p className = "ability-tooltip-description">{desc}</p>
            </div>
        </>
    )
}

function AbilityTooltip({heroName, ability, title, desc, lore}){
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`

    return(
        <div className="ability-tooltip-container">
            <div className="tooltip-video-container">
                <video autoPlay preload='auto' loop playsInline
                poster={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.jpg` }>
                    <source type="video/web" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.webm`} />
                    <source type= "video/mp4" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.mp4`} />
                </video>
            </div>
            <BaseTooltipContainer icon = {icon} title = {title}  desc={desc} />
            <div className="ability-tooltip-lore-container">
                <p className="ability-tooltip-lore">{lore}</p>
            </div>
        </div>
    )
}

function TalentTreeTooltip(){
    function TalentTreeLevel({level}){
        return(
        <div className="talent-tree-level">
            <div className="left-branch"> adkfjasdfaksdfasdfas</div>
            <div className="level">{level}</div>
            <div className="right-branch">safdafksjfadsfasfd</div>
        </div>
        )
    }
    return(
        <div className="talent-tree-tooltip-container">
            <h1 className='talent-tree-title'>TALENT TREE</h1>
            {[5,10,15,20,25].map((level)=>{
                return(
                <TalentTreeLevel level={level}/>
            )
            })}
        </div>
    )

}

function InnateTooltip({heroName}){
    const apiLink = "https://api.opendota.com/api/constants/abilities";
    const icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png"
    const innateName = heroInnates[`npc_dota_hero_${heroName}`][0]
    const [title, setTitle]  = useState("");
    const [desc, setDesc] = useState("");

    useEffect(()=>{
        axios.get(apiLink).then((response)=>{
            setTitle(response.data[innateName]["dname"]);
            setDesc(response.data[innateName]["desc"]);
            
        })

    }, [])

        return(
        <div className="ability-tooltip-container">
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )
}

function ScepterTooltip({heroName}){
    const abilityName = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_skill_name_nd"];
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`;
    const title = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_skill_name"];
    const desc = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_desc"];



    return(
        <div className="ability-tooltip-container">
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )
}

function ShardTooltip({heroName}){

    const abilityName = heroAghanim[`npc_dota_hero_${heroName}`]["shard_skill_name_nd"];
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`;
    const title = heroAghanim[`npc_dota_hero_${heroName}`]["shard_skill_name"];
    const desc = heroAghanim[`npc_dota_hero_${heroName}`]["shard_desc"];



    return(
        <div className="ability-tooltip-container">
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )

}
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
                {showTalentTreeTooltip && <TalentTreeTooltip />}
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