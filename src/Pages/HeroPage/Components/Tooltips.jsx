import {useState, useEffect} from 'react'

//tooltips components

function FacetTooltip({facetName, facetColor, facetIcon, deprecated, facetDescription}){
    if (deprecated !== "true" && deprecated !== "1"){
        return(
            <div className="facet-tooltip-container">
                <div className="facet-tooltip-header-container" 
                style={{backgroundColor : `rgb(from ${facetColor} r g b / 0.6) `}}>
                    <div className="facet-tooltip-icon-container">
                        <img className="facet-tooltip-icon"
                        src={`https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/facets/${facetIcon}.png`}/>
                    </div>
                    <h1 className="facet-tooltip-title">{facetName}</h1>
                </div>
                <div className="facet-tooltip-description">
                    <p>{facetDescription}</p>
                </div>

            </div>
        )
    }
}

function BaseTooltipContainer({icon, title, desc}){
    return(
        <>
            <div className="ability-tooltip-header-container">
                <div className="ability-tooltip-icon-container">
                    <img src = {icon} 
                        onError = {(e)=>(e.currentTarget.parentElement.style.display="none")}/>
                </div>
                <h1 className="ability-tooltip-title">
                    {title}
                </h1>
            </div>
            <div className="ability-tooltip-description-container">
                <p className = "ability-tooltip-description">{desc}</p>
            </div>
        </>
    )
}

function AbilityTooltip({heroName, ability, title, desc, lore}){
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`

    return(
        <div className="ability-tooltip-container">
            <div className="tooltip-video-container">
                <video autoPlay preload='auto' loop playsInline
                poster={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.jpg` }>
                    <source type="video/web" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.webm`} />
                    <source type= "video/mp4" src={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.mp4`} />
                </video>
            </div>
            <BaseTooltipContainer icon = {icon} title = {title}  desc={desc} />
            <div className="ability-tooltip-lore-container">
                <p className="ability-tooltip-lore">{lore}</p>
            </div>
        </div>
    )
}

function TalentTreeTooltip({heroName}){
    const heroAbilitiesURL = "https://api.opendota.com/api/constants/hero_abilities";
    const abilitiesURL = "https://api.opendota.com/api/constants/abilities";

    const [talentDesc, setTalentDesc] = useState([]);
    useEffect(()=>{
        // getting talent treee description logic here
        async function fetchData(){
            const [heroAbilities, abilities] = await Promise.all([
                axios.get(heroAbilitiesURL),
                axios.get(abilitiesURL)
            ]);
            console.log(heroName);
            console.log(heroAbilities);
            const heroTalents = heroAbilities.data[`npc_dota_hero_${heroName}`]["talents"];
            const descriptions = heroTalents.map((talent) => {
                                        return abilities.data[talent.name]["dname"];
                                });
            setTalentDesc(descriptions)

            console.log(heroName)
            console.log(talentDesc)

        }

        fetchData();
    },[heroName])

    function TalentTreeLevel({level, left, right}){
        return(
        <div className="talent-tree-level">
            <div className="left-branch"> {left}</div>
            <div className="level">{level}</div>
            <div className="right-branch">{right}</div>
        </div>
        )
    }
    return(
        <div className="talent-tree-tooltip-container">
            <h1 className='talent-tree-title'>TALENT TREE</h1>
            {[25,20,15,10].map((level)=>{
                return(
                <TalentTreeLevel key={`${level}${heroName}`} level={level} 
                left={talentDesc[(level/5 - 2)*2]}
                right={talentDesc[(level/5 - 2)*2 +1]}/>
            )
            })}
        </div>
    )

}

function InnateTooltip({heroName}){
    const apiLink = "https://api.opendota.com/api/constants/abilities";
    const icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png"
    const innateName = heroInnates[`npc_dota_hero_${heroName}`][0]
    const [title, setTitle]  = useState("");
    const [desc, setDesc] = useState("");

    useEffect(()=>{
        axios.get(apiLink).then((response)=>{
            setTitle(response.data[innateName]["dname"]);
            setDesc(response.data[innateName]["desc"]);
            
        })

    }, [])

        return(
        <div className="ability-tooltip-container">
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )
}

function ScepterTooltip({heroName}){
    const abilityName = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_skill_name_nd"];
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`;
    const title = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_skill_name"];
    const desc = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_desc"];



    return(
        <div className="ability-tooltip-container">
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )
}

function ShardTooltip({heroName}){

    const abilityName = heroAghanim[`npc_dota_hero_${heroName}`]["shard_skill_name_nd"];
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`;
    const title = heroAghanim[`npc_dota_hero_${heroName}`]["shard_skill_name"];
    const desc = heroAghanim[`npc_dota_hero_${heroName}`]["shard_desc"];



    return(
        <div className="ability-tooltip-container">
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )

}