import {useState, useEffect, useContext, useRef, useLayoutEffect} from 'react'
import axios from 'axios';
import { HeroAbilitiesContext, AbilitiesContext } from './HeroPageContexts';
import {renderTooltip} from '../../../utils/renderTooltip';
import {heroInnates} from '../../../assets/heroInnates'
import { heroAghanim } from '../../../assets/heroAghanim';
import "../ComponentsStyle/Tooltips.css"

//ToolTips

//FacetTooltip, AbilityTooltip, TalentTreeTooltip, InnateTooltip, ScepterTooltip, ShardTooltip

// base tooltips component
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

//----------------------------------------------------------------------------------------------

//Facet Tooltips
export function FacetTooltip({facetName, facetColor, facetIcon, deprecated, facetDescription}){
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

//----------------------------------------------------------------------------------------------------

// Ability Tooltips
export function AbilityTooltip({anchorRef,heroName, ability, title, desc, lore}){
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${ability}.png`
    /* tooltip Ref here */
    const tooltipRef = useRef(null);

    const [style, setStyle] = useState({position:"fixed", left:"-9999px", top: "-9999px",
get right() {
            return this._right;
        },
set right(value) {
            this._right = value;
        },
});
    const [ready, setReady] = useState(false)

    /* fixing tooltip getting out of frame */
    useLayoutEffect(()=>{
        renderTooltip(anchorRef,tooltipRef, ready, setStyle)
    },[ready]);

    return(
        <div ref={tooltipRef}  className="ability-tooltip-container" 
        style={style}>
            <div className="tooltip-video-container">
                <video autoPlay
                preload='auto' 
                loop 
                playsInline
                muted
                poster={`https://cdn.steamstatic.com/apps/dota2/videos/dota_react/abilities/${heroName}/${ability}.jpg`}
                onLoadedMetadata = {()=> setReady(true)} 
                onError={()=> setReady(true)}>
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

//-----------------------------------------------------------------------------------------------------

//Talent Tree Tooltips
export function TalentTreeTooltip({anchorRef, heroName}){
    const [style, setStyle] = useState({position:"fixed", left:"-9999px", top:"-9999px"});
    /* tooltip Ref here */
    const tooltipRef = useRef(null);

    //context variable here
    const heroAbilities = useContext(HeroAbilitiesContext);
    if(!heroAbilities) return null;
    const abilities = useContext(AbilitiesContext);
    if(!abilities) return null;

    const heroTalents = heroAbilities[`npc_dota_hero_${heroName}`]["talents"];
    const talentDesc = heroTalents.map((talent) => {
                                        return abilities[talent.name]?.dname || "";
                                    });
    
    function TalentTreeLevel({level, left, right}){
        return(
        <div className="talent-tree-level">
            <div className="left-branch"> {left}</div>
            <div className="level">{level}</div>
            <div className="right-branch">{right}</div>
        </div>
        )
    }

    useLayoutEffect(()=>{
        return renderTooltip(anchorRef, tooltipRef, true, setStyle)
    }, []
    )
    
    return(
        <div ref={tooltipRef} className="talent-tree-tooltip-container" style={style}>
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

//--------------------------------------------------------------------------------------------------

//Innate Tooltips
export function InnateTooltip({anchorRef, heroName}){
    const [style, setStyle] = useState({position:"fixed", left:"-9999px", top:"-9999px"});
    /* tooltip Ref here */
    const tooltipRef = useRef(null);

    const icon = "https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/innate_icon.png"   
    const innateName = heroInnates[`npc_dota_hero_${heroName}`][0]

    //context variable here
    const abilities = useContext(AbilitiesContext);
    if(!abilities) return null;

    const title = abilities[innateName]["dname"]; 
    const desc = abilities[innateName]["desc"];

    useLayoutEffect(()=>{
        return renderTooltip(anchorRef, tooltipRef, true, setStyle)
    }, []
    )

        return(
        <div ref={tooltipRef} className="ability-tooltip-container" style={style}>
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )
}

//---------------------------------------------------------------------------------------------------------------------

//Scepter Tooltips

export function ScepterTooltip({anchorRef, heroName}){
    const [style, setStyle] = useState({position:"fixed", left:"-9999px", top:"-9999px"});
    /* tooltip Ref here */
    const tooltipRef = useRef(null);

    const abilityName = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_skill_name_nd"];
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`;
    
    const title = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_skill_name"];
    const desc = heroAghanim[`npc_dota_hero_${heroName}`]["scepter_desc"];

    useLayoutEffect(()=>{
        return renderTooltip(anchorRef, tooltipRef, true, setStyle)
    }, []
    )

    return(
        <div ref={tooltipRef} className="ability-tooltip-container" style={style}>
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )
}

//-----------------------------------------------------------------------------------------------------------------

//Shard Tooltips
export function ShardTooltip({anchorRef, heroName}){
    const [style, setStyle] = useState({position:"fixed", left:"-9999px", top:"-9999px"});
    /* tooltip Ref here */
    const tooltipRef = useRef(null);
    const abilityName = heroAghanim[`npc_dota_hero_${heroName}`]["shard_skill_name_nd"];
    const icon = `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/abilities/${abilityName}.png`;
    const title = heroAghanim[`npc_dota_hero_${heroName}`]["shard_skill_name"];
    const desc = heroAghanim[`npc_dota_hero_${heroName}`]["shard_desc"];

    useLayoutEffect(()=>{
        return renderTooltip(anchorRef, tooltipRef, true, setStyle)
    }, []
    )

    return(
        <div ref={tooltipRef} className="ability-tooltip-container" style={style}>
            <BaseTooltipContainer icon = {icon} title={title} desc={desc} />

        </div>
    )

}