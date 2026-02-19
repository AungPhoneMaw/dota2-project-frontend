import {useEffect, useState, useContext} from "react";
import {HeroAbilitiesContext} from "./HeroPageContexts"
import { FacetTooltip } from "./Tooltips";
import "../ComponentsStyle/Facets.css"



//Components inside the Facets

function Facet({facetName, facetColor, facetIcon, deprecated, facetDescription}){
    const [showTooltip, setShowTooltip] = useState(false);
    if (deprecated !== "true" && deprecated !== "1"){
        return(
            <div className="facet-container"
            style={{backgroundColor : ` rgb(from ${facetColor} r g b / 0.6)`}}
            onMouseEnter={()=>{setShowTooltip(true)}} onMouseLeave={()=>{setShowTooltip(false)}}>
                {showTooltip && <FacetTooltip facetName = {facetName}
                facetColor = {facetColor} facetIcon = {facetIcon} 
                deprecated = {deprecated} facetDescription = {facetDescription}/>}
                <div className="facet-icon-container">
                    <img className="facet-icon"
                    src={`https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/facets/${facetIcon}.png`}/>
                </div>
                <h1 className="facet-title">{facetName}</h1>
            </div>

        )
}}

//----------------------------------------------------------------------------------------------------

//export component : Facets

export function Facets({heroName}){
    const heroAbilities = useContext(HeroAbilitiesContext);
    if (!heroAbilities) return null; 

    const facets = heroAbilities[`npc_dota_hero_${heroName}`]["facets"]
    return(
        <div className="facets-container">
            {facets.map((facet)=>{
                return(
                    <Facet facetName={facet["title"]} facetColor = {facet["color"]} 
                    facetIcon= { facet["icon"]} deprecated = {facet["deprecated"]}
                    facetDescription={facet["description"]}/>
                )
            })}
        </div>
    )

}