import { HeroProfileImage } from "./HeroProfileImage";
import { TextArea} from "./TextArea";
import {AbilitiesBox } from "./AbilitiesBox";
import {Facets} from "./Facets";
import "../ComponentsStyle/MainContens.css"
import { useEffect, useState } from "react";
import axios from "axios";


export function MainContents({heroName}){
    const apiLink = "https://api.opendota.com/api/constants/hero_abilities"
    const [facets, setFacets] = useState([]);
    const [abilities, setAbilities] = useState([]);
    const [talents, setTalents] = useState([]);

    useEffect(()=>{
        axios.get(apiLink).then((response)=>{
            setAbilities(response.data[`npc_dota_hero_${heroName}`]["abilities"]);
            setTalents(response.data[`npc_dota_hero_${heroName}`]["talents"])
            setFacets(response.data[`npc_dota_hero_${heroName}`]["facets"])
            console.log(response.data[`npc_dota_hero_${heroName}`]["abilities"]);
            console.log(response.data[`npc_dota_hero_${heroName}`]["talents"]);
        }).catch((error)=>{
            console.log(error);
        })


    },[])

    return(
        <div className="main-contents-container">
            <div style={{gridArea: "box-1"}}>
                <HeroProfileImage heroName = {heroName}/>
            </div>
            <div style={{gridArea: "box-2"}}>
                <TextArea heroName = {heroName}/>
            </div>
            <div style={{gridArea: "box-3"}}>
                <AbilitiesBox heroName = {heroName} abilities = {abilities}/>
            </div>
            <div style={{gridArea: "box-4"}}>
                <Facets heroName = {heroName} facets={facets}/>
            </div>
        </div>
    )
}