import "../ComponentsStyle/Stats.css"
import {HeroesContext} from "./HeroPageContexts"
import {HeroNameContext} from "../HeroNameContext"

import { useContext } from "react"


function AttributeColumn({heroName, heroStats}){
    const hp = heroStats.base_health + heroStats.base_str*22;
    const hpRegen = heroStats.base_health_regen + (heroStats.base_str+heroStats.str_gain)*0.09;
    const mana = heroStats.base_mana + heroStats.base_int*12;
    const manaRegen = heroStats.base_mana_regen + (heroStats.base_int+ heroStats.int_gain)*0.05
    return(
        <div className="attr-col-container">
            <div className="flex-row-wrapper">
                <div className="images-container">
                    <img className="hero-img" 
                    src ={`https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`}/>
                    <div className="hp-bar">{hp}  +{Math.round(hpRegen*10)/10}</div>
                    <div className="mana-bar">{mana}  +{Math.round(manaRegen*10)/10}</div>

                </div>
                <div className="attr-container">
                    <div className="attr-row str-row">
                        <img className="attr-icon" 
                        src="https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/hero_strength.png"/>
                        <p>{heroStats.base_str}  +{heroStats.str_gain}</p>
                    </div>
                    <div className="attr-row agi-row">
                        <img className="attr-icon" 
                        src="https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/hero_agility.png"/>
                        <p>{heroStats.base_agi}  +{heroStats.agi_gain}</p>
                    </div>
                    <div className="attr-row int-row">
                        <img className="attr-icon" 
                        src="https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/hero_intelligence.png"/>
                        <p>{heroStats.base_int}  +{heroStats.int_gain}</p>
                    </div>

                </div>
            </div>
            
            <div className="text-container">Attributes</div>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------------- */

function RoleColumn({heroStats}){
    const roles = ["Carry" , "Support" , "Nuker", "Disabler", "Jungler", "Durable", 
                   "Escape", "Pusher", "Initiator"]

    function Role({roleName}){
        return(
            <div className="role-container">
                <p>{roleName}</p>
                <div className="score-bar"></div>
            </div>
        )
    }
    return(
        <div className="role-col-container">
            {roles.map((roleName)=>{
                return(
                    <Role roleName={roleName}/>
                )
            })}
            <div className="text-container">Roles</div>
        </div>
    )
}

/* ----------------------------------------------------------------------------------------------------------------- */

function StatsColumn({heroName, heroStats}){
    const PrimaryAttr = heroStats.primary_attr;
    const armor = heroStats.base_armor + heroStats.base_agi*(1/6)
    let attackDmgMin;
    let attackDmgMax;
    if (PrimaryAttr===""){
        attackDmgMin = heroStats.base_attack_min + 
        (heroStats["base_str"]+heroStats["base_agi"]+heroStats["base_int"])*0.6
        attackDmgMax = heroStats.base_attack_max + 
        (heroStats["base_str"]+heroStats["base_agi"]+heroStats["base_int"])*0.6
    }else{
        attackDmgMin = heroStats.base_attack_min + heroStats[`base_${PrimaryAttr}`]*1
        attackDmgMax = heroStats.base_attack_max + heroStats[`base_${PrimaryAttr}`]*1
    }


    function Stat({statName, icon, value}){
        return(
            <div className={`stat ${statName}`}>
                <img src={icon}/>
                <p>{value}</p>
            </div>
        )
    }
    return(
        <div className="stats-col-container">
            <div className="col-wrapper attack">
                <Stat statName={"attack-dmg"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_damage.png"
                value = {`${attackDmgMin}-${attackDmgMax}`}/>
                <Stat statName={"attack-rate"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_time.png"
                value = {heroStats.attack_rate}/>
                <Stat statName={"attack-range"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_attack_range.png"
                value = {heroStats.attack_range}/>
            </div>
            <div className="col-wrapper defense">
                <Stat statName={"armor"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_armor.png"
                value = {Math.round(armor)}/>
                <Stat statName={"mr"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_magic_resist.png"
                value = {heroStats.base_mr}/>
            </div>
            <div className="col-wrapper mobility">
                <Stat statName={"move-speed"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_movement_speed.png"
                value = {heroStats.move_speed}/>
                <Stat statName={"turn-rate"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_turn_rate.png"
                value = {heroStats.turn_rate??"0.6"}/>
                <Stat statName={"vision"} 
                icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react//heroes/stats/icon_vision.png"
                value = {`${heroStats.day_vision}/${heroStats.night_vision}`}/>
            </div>
            <div className="text-container">Roles</div>
        </div>
    )
}

/* ---------------------------------------------------------------------------------------------------- */

export function Stats(){
    const heroName = useContext(HeroNameContext);
    const heroes = useContext(HeroesContext);

    if(!heroes)     return null;
    const heroesByName = Object.fromEntries(
        Object.values(heroes.data).map(hero=>[hero.name,hero])
    )
    const heroStats = heroesByName[`npc_dota_hero_${heroName}`]
    return(
        <div className="stats-container">
            <AttributeColumn heroName={heroName} heroStats={heroStats}/>
            <div className="vertical-line"></div>
            <RoleColumn heroName={heroName} heroStats={heroStats}/>
            <div className="vertical-line"></div>
            <StatsColumn heroName={heroName} heroStats={heroStats}/>
        </div>
    )
}