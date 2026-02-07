import "./HeroPage.css"
import { heroData } from "../../assets/herodata"
import { useParams } from 'react-router'
export function HeroPage() {
  const { heroName } = useParams();

  return (
    <div>{heroData.find(hero => hero.name === `npc_dota_hero_${heroName}`).localized_name
    }
    </div>
  )
}