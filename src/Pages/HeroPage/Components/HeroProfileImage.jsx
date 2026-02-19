import "../ComponentsStyle/HeroProfileImage.css"


//export component : HeroProfileImage

export function HeroProfileImage({heroName}) {
    return(
        <div className = "hero-profile-image-container">
            <img className = "hero-profile-image" src = {
                `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/heroes/${heroName}_vert.jpg`

            }/>
        </div>
    )
}