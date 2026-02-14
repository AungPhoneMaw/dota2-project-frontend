import {use, useEffect, useState } from "react";
import "../ComponentsStyle/Facets.css"


function Facet({facetName, facetColor, facetIcon}){
    return(
        
        <div className="facet-container" style={{backgroundColor : `rgb(from ${facetColor} r g b / 0.25)`}}>
            <div className="facet-icon-container">
                <img className="facet-icon"
                src={`https://cdn.steamstatic.com/apps/dota2/images/dota_react/icons/facets/${facetIcon}.png`}/>
            </div>
            <h1 className="facet-title">{facetName}</h1>
        </div>
    )
}




export function Facets({heroName, facets}){

    return(
        <div className="facets-container">
            {facets.map((facet)=>{
                return(
                    <Facet facetName={facet["title"]} facetColor = {facet["color"]} 
                    facetIcon= { facet["icon"] }/>
                )
            })}
        </div>
    )

}