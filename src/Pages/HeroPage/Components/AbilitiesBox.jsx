import { HeroAbilitiesContext, AbilitiesContext } from './HeroPageContexts';
import { HeroNameContext } from '../HeroNameContext';
import { useContext, useState, useRef, useLayoutEffect, Fragment } from "react";
import {AbilityTooltip, TalentTreeTooltip, 
        InnateTooltip, ScepterTooltip, ShardTooltip} from './Tooltips'
import "../ComponentsStyle/AbilitiesBox.css"


//Components inside the ability box

function AbilityImage({ability}){
    const anchorRef = useRef(null);
    //toggle tooltip
    const [showTooltip, setShowTooltip] = useState(false);

    //context variable here
    const heroName = useContext(HeroNameContext);
    const abilitiesConstant = useContext(AbilitiesContext);
    if (!abilitiesConstant) return null;

    const title = abilitiesConstant[ability]["dname"];
    const desc = abilitiesConstant[ability]["desc"];
    const lore = abilitiesConstant[ability]["lore"]

    return(
    <div key={ability} className = "image-container" 
    onMouseEnter={()=>{setShowTooltip(true)}} 
    onMouseLeave={()=>{setShowTooltip(false)}}>
        { showTooltip && <AbilityTooltip ref={anchorRef} heroName={heroName} 
        ability={ability} title={title} desc = {desc} lore={lore}/>}
        <img src = {`https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`} 
                        onError = {(e)=>(e.currentTarget.parentElement.style.display="none")}/>
    </div>)
}
//-----------------------------------------------------------------------------------------------

// Talent Tree

function TalentTree({heroName}){
    const anchorRef = useRef(null);
    const [showTalentTreeTooltip, setShowTalentTreeTooltip] =  useState(false);
    return(
        <div className = "talent-tree image-container" 
        onMouseEnter={()=>{setShowTalentTreeTooltip(true)}}
        onMouseLeave={()=>{setShowTalentTreeTooltip(false)}}>
            {showTalentTreeTooltip && <TalentTreeTooltip ref={anchorRef} heroName={heroName} />}
            <img src="https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/icons/talents.svg" />
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------- */

// Innate

function InnateAbility({heroName}){
    const anchorRef = useRef(null);
    const [showInnateTooltip, setShowInnateTooltip] =  useState(false);
    return(
        <div className="innate-ability image-container"
        onMouseEnter={()=>{setShowInnateTooltip(true)}}
        onMouseLeave={()=>{setShowInnateTooltip(false)}}>
            {showInnateTooltip && <InnateTooltip ref={anchorRef} heroName={heroName}/>}
            <img src="/shared/innate-abilityicon.png" />
        </div>
    )
}

/* --------------------------------------------------------------------------------------------------------- */

//Agh Box
function Scepter({heroName}){
    const anchorRef = useRef(null);
    const [showScepterTooltip, setShowScepterTooltip] =  useState(false);
    return(
        <div className='wrapper'
        onMouseEnter={()=>{setShowScepterTooltip(true)}}
        onMouseLeave={()=>{setShowScepterTooltip(false)}}>
            {showScepterTooltip && <ScepterTooltip ref={anchorRef} heroName={heroName} />}
            <img className = "scepter-icon" src = "https://www.opendota.com/assets/images/dota2/scepter_0.png"/>
        </div>
    )
}


function Shard({heroName}){
    const anchorRef = useRef(null);
     const [showShardTooltip, setShowShardTooltip] =  useState(false);
    return(
        <div className='wrapper' 
        onMouseEnter={()=>{setShowShardTooltip(true)}}
        onMouseLeave={()=>{setShowShardTooltip(false)}}>
            {showShardTooltip && <ShardTooltip ref={anchorRef} heroName={heroName} />}
            <img className = "shard-icon" src= "https://www.opendota.com/assets/images/dota2/shard_0.png"/>
        </div>
    )
}
/* ------------------------------------------------------------------------------------------------------------------ */

//export Component : AbilitiesBox

export function AbilitiesBox(){
    
    /*context variables here*/
    const heroName = useContext(HeroNameContext);
    const heroAbilities = useContext(HeroAbilitiesContext);
    if(!heroAbilities) return null;

    const abilities = heroAbilities[`npc_dota_hero_${heroName}`]["abilities"];

    return(
        <div className="abilities-box-container">
            <TalentTree heroName={heroName}/>
            <InnateAbility heroName={heroName}/>
            {abilities.map((ability)=>{
                return(
                    ability.includes("_cancel")?(
                        <Fragment key={ability}/>
                    ):(
                        <AbilityImage heroName={heroName} ability={ability} key={ability} />    
                    )
                         
                )
            })}

            <div className="image-container">
                <Scepter heroName={heroName}/>
                <Shard heroName={heroName}/>
            </div>
        </div>
    )
}