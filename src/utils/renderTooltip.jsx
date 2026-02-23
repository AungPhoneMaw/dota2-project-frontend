import {measureTooltip} from './measureTooltip'


export function renderTooltip(anchorRef, tooltipRef, ready, setStyle){
    if(!ready) return;

    const observer = new ResizeObserver(()=>{
        let [left, top] = measureTooltip(anchorRef, tooltipRef);

    setStyle({
        position : "fixed",
        left : `${left}px`,
        top : `${top}px`
        })

    });
    observer.observe(tooltipRef.current);
    return()=>observer.disconnect();
}