import './HeroesPage.css'
import {heroData} from '../../assets/herodata'
import {HeroImages} from './Components/HeroImages'
import {TopBar} from './Components/TopBar'
export function HeroesPage(){
  return(
    <>
    <div className="hero-page">
      <TopBar/>
      <HeroImages/>
    </div>
      
    </>
    )
} 