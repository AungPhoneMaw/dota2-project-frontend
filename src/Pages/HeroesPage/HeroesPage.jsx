import './HeroesPage.css'
import {heroData} from '../../assets/herodata'
import {HeroImages} from './Components/HeroImages'
import {HeaderBar} from '../SharedComponents/HeaderBar'
export function HeroesPage(){
  return(
    <>
    <div className="heroes-page">
      <HeaderBar/>
      <HeroImages/>
    </div>
      
    </>
    )
} 