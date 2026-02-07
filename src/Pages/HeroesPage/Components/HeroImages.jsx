import { heroData } from "../../../assets/herodata"
import '../ComponentsStyle/HeroImages.css'
import { useNavigate } from 'react-router'
function HeroImage({ hero, attribute }) {
  const navigate = useNavigate();
  return (
    <div className='hero-image-container' data-type={attribute} role="button"
      onClick={()=>{navigate(`/heroes/${hero.name.slice(14)}`)}}>
      <img className={`hero-image ${attribute}`} src={`https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${hero.name.slice(14)}.png`} />
    </div>
  );
}

function HeroesByAttribute({ attribute }) {
  return (
    <div className={`hero-image-attr-grid ${attribute}`}>
      {heroData.filter(hero => hero.primary_attr === attribute).map((hero) => {
        return (
          <HeroImage key={hero.id} hero={hero} attribute={attribute} />
        )
      })}
    </div>
  );
}

export function HeroImages() {
  const attributes = ["str", "agi", "int", "all"];
  const attributeLong
    = { "str": "Strength", "agi": "Agility", "int": "Intelligence", "all": "Universal" };

  return (
    <div className="hero-images-grid">
      {attributes.map((attribute) => {
        return (
          <div key={crypto.randomUUID()} className="hero-attr-container">
            <div className="attr-bar">
              <span><img
                src={`https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/hero_${attributeLong[attribute].toLowerCase()}.png`} /></span>{attributeLong[attribute]}</div>
            <HeroesByAttribute attribute={attribute} />
          </div>
        )
      })}
    </div>
  )
}