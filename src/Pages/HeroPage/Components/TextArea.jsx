import { useContext} from "react";
import { HeroLoreContext } from "./HeroPageContexts";
import "../ComponentsStyle/TextArea.css"


//export component : TextArea

export function TextArea({heroName}){
    const heroLore = useContext(HeroLoreContext);
    if (!heroLore) return null;
        return(
        <div className="text-area-container">
            <p>{heroLore[heroName]}</p>
        </div>
    )
}