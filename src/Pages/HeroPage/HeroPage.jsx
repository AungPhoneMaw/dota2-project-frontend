import "./HeroPage.css"
import { heroData } from "../../assets/herodata"
import { useParams } from 'react-router'
import { HeaderBar} from '../SharedComponents/HeaderBar'
import { MainContents } from "./Components/MainContents"; 
import { createContext } from "react";
import { HeroNameContext } from "./HeroNameContext";

export function HeroPage() {
  const { heroName } = useParams();

  return (
    <HeroNameContext.Provider value={heroName}>
      <div className ="hero-page-container">
        <HeaderBar title = {heroData.find(hero => hero.name === `npc_dota_hero_${heroName}`).localized_name}/>
        <MainContents heroName = {heroName}/>
      </div>
    </HeroNameContext.Provider>
    
    
  )
}