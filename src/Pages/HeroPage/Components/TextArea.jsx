import axios from "axios";
import { use, useEffect, useState } from "react";
import "../ComponentsStyle/TextArea.css"

export function TextArea({heroName}){
    const apiLink = "https://api.opendota.com/api/constants/hero_lore";
    const [lore, setLore] = useState("");
    useEffect(() => {
        axios.get(apiLink).then((response)=>{
            setLore(response.data[heroName]).catch((error)=>{
                console.log(error);
        })})
    },[])
        return(
        <div className="text-area-container">
            <p>{lore}</p>
        </div>
    )
}