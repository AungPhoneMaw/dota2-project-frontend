/* measure tooltip and anchor dimensions, make sure the tooltip is inside the viewport */


export function measureTooltip(anchorRef, tooltipRef){
        if (!anchorRef.current || !tooltipRef.current) return;

        const anchor = anchorRef.current.getBoundingClientRect();
        const tooltip = tooltipRef.current.getBoundingClientRect();
        let left = anchor.left+anchor.width/2 - tooltip.width/2;
        let top = anchor.top -tooltip.height-5 ;
        const padding = 12;
        console.log("anchor", anchor);
        console.log("tooltip", tooltip);
        console.log("top, left", top, left);

        /* clamping logic here
        if tooltip.left + tooltip.width >= window.width,  move to left,
        if tooltip.left < 12 , move to right
        if tooltip.bottom - tooltip.height < 12 , move down
        if tooltip.bottom > window.height, move up */

        left = Math.max(padding, Math.min(left, window.innerWidth-tooltip.width-padding));
        top = Math.max(padding, Math.min(top, window.innerHeight-tooltip.height -padding));

        /* if(left + tooltip.width >= window.innerWidth){
            left = window.innerWidth - tooltip.width - 12;//12px padding
        }if(left <12){
            left = 12;
        }if(top + tooltip.height >= window.innerHeight){
            top = window.innerHeight - tooltip.height -12;//12px padding
        }if(top <12){
            top = 12;
        }
 */

        return [left, top]
    }