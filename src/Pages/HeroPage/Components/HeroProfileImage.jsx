import { useContext } from "react"
import { HeroNameContext } from "../HeroNameContext"
import "../ComponentsStyle/HeroProfileImage.css"




//export component : HeroProfileImage

export function HeroProfileImage() {
    const heroName = useContext(HeroNameContext);
    return(
        <div className = "hero-profile-image-container">
            <img className = "hero-profile-image" src = {
                `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroName}_vert.jpg`

            }/>
        </div>
    )
}