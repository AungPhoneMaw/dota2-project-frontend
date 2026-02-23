import { HeroProfileImage } from "./HeroProfileImage";
import { TextArea} from "./TextArea";
import {Stats} from "./Stats";
import {AbilitiesBox } from "./AbilitiesBox";
import {Facets} from "./Facets";
import { useEffect, useContext } from "react";
import { HeroAbilitiesContext} from './HeroPageContexts';
import { HeroNameContext } from '../HeroNameContext';
import "../ComponentsStyle/MainContens.css";



export function MainContents(){
    const heroName = useContext(HeroNameContext);
    const heroAbilities = useContext(HeroAbilitiesContext);
    if(!heroAbilities) return null;

    const abilities = heroAbilities[`npc_dota_hero_${heroName}`]["abilities"];

    useEffect(()=>{
        abilities.forEach(ability=>{
            const video = document.createElement("video");
            const videoWebm = `https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.webm` ;
            const videoMp4 = `https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.mp4` ;
            const poster = `https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.jpg`;

            //preload poster
            const img = new Image();
            img.src = poster;

            //preload videos
/* 
            fetch(videoWebm).catch(()=>{});
            fetch(videoMp4).catch(()=>{}); */
        });

    }, [heroName])
    return(
            <div className="main-contents-container">
                <div style={{gridArea: "box-1"}}>
                    <HeroProfileImage />
                </div>
                <div style={{gridArea: "box-2"}}>
                    <TextArea />
                </div>
                <div style={{gridArea: "box-3"}}>
                    <AbilitiesBox />
                </div>
                <div style={{gridArea: "box-4"}}>
                    <Facets  />
                </div>
                <div style={{gridArea: "box-5"}}>
                    <Stats  />
                </div>
            </div>
    )
}