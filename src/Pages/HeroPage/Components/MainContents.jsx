import { HeroProfileImage } from "./HeroProfileImage";
import { TextArea} from "./TextArea";
import {AbilitiesBox } from "./AbilitiesBox";
import {Facets} from "./Facets";
import { ContextProvider } from "./HeroPageContexts";
import "../ComponentsStyle/MainContens.css"



export function MainContents(){

    return(
        <ContextProvider>
            <div className="main-contents-container">
                <div style={{gridArea: "box-1"}}>
                    <HeroProfileImage />
                </div>
                <div style={{gridArea: "box-2"}}>
                    <TextArea />
                </div>
                <div style={{gridArea: "box-3"}}>
                    <AbilitiesBox />
                </div>
                <div style={{gridArea: "box-4"}}>
                    <Facets  />
                </div>
            </div>
        </ContextProvider>
        
    )
}