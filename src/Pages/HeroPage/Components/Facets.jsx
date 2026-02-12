import {use, useEffect, useState } from "react";
import "../ComponentsStyle/Facets.css"


function Facet({facetName, facetColor}){
    return(
        <div className="facet-container" style={{backgroundColor : facetColor}}>{facetName}</div>
    )
}




export function Facets({heroName, facets}){

    return(
        <div className="facets-container">
            {facets.map((facet)=>{
                return(
                    <Facet facetName={facet["title"]} facetColor = {facet["color"]} />
                )
            })}
        </div>
    )

}