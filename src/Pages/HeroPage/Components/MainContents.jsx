import { HeroProfileImage } from "./HeroProfileImage";
import { TextArea} from "./TextArea";
import {AbilitiesBox } from "./AbilitiesBox";


export function MainContents({heroName}){
    return(
        <div className="main-contents-container">
            <HeroProfileImage heroName = {heroName}/>
            <TextArea heroName = {heroName}/>
            <AbilitiesBox heroName = {heroName}/>
        </div>
    )
}