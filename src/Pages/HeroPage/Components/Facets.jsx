import {use, useEffect, useState } from "react";


function Facet({facetName}){
    return(
        <div className="facet-container">{facetName}</div>
    )
}




export function Facets({heroName}){
    const apiLink = "https://api.opendota.com/api/constants/hero_abilities"
    const {facets, setFacets} = useState([]);
    useEffect(()=>{

    },[])

    return(
        <div className="facets-container"></div>
    )

}