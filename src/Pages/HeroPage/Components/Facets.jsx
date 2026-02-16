import {useEffect, useState } from "react";
import "../ComponentsStyle/Facets.css"

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

export function Facets({heroName, facets}){

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