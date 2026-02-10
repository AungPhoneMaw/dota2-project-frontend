export function HeroProfileImage({heroName}) {
    return(
        <div className = "hero-profile-image-container">
            <img className = "hero-profile-image" src = {
                `https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/${heroName}.png`

            }/>
        </div>
    )
}