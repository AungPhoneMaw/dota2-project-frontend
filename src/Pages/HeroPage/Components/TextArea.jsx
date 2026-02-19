import { useContext} from "react";
import { HeroLoreContext } from "./HeroPageContexts";
import { HeroNameContext } from "../HeroNameContext"
import "../ComponentsStyle/TextArea.css"


//export component : TextArea

export function TextArea(){
    const heroName = useContext(HeroNameContext);
    const heroLore = useContext(HeroLoreContext);
    if (!heroLore) return null;
        return(
        <div className="text-area-container">
            <p>{heroLore[heroName]}</p>
        </div>
    )
}