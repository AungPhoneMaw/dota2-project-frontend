import { useContext } from "react"
import { HeroNameContext } from "../HeroNameContext"
import "../ComponentsStyle/HeroProfileImage.css"




//export component : HeroProfileImage

export function HeroProfileImage() {
    const heroName = useContext(HeroNameContext);
    return(
        <div className = "hero-profile-image-container">
            <video className = "hero-profile-image" autoPlay preload="auto" loop playsInline
            poster={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.png`}>
                <source type="video/webm" 
                src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/heroes/renders/${heroName}.webm?undefined`}/>
            </video>
        </div>
    )
}