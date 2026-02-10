import { HeroProfileImage } from "./HeroProfileImage";
import { TextArea} from "./TextArea";
import {AbilitiesBox } from "./AbilitiesBox";
import "../ComponentsStyle/MainContens.css"


export function MainContents({heroName}){
    return(
        <div className="main-contents-container">
            <div style={{gridArea: "box-1"}}><HeroProfileImage heroName = {heroName}/></div>
            <div style={{gridArea: "box-2"}}><TextArea heroName = {heroName}/></div>
            <div style={{gridArea: "box-3"}}><AbilitiesBox heroName = {heroName}/></div>
        </div>
    )
}