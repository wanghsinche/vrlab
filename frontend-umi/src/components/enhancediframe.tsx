import React, { createRef, HTMLProps, useEffect, useState } from 'react';
export const EnhancedIframe: React.FC< HTMLProps<HTMLIFrameElement> & {ratio?: number}> =p =>{
    const {ratio=1, width, height, style,...others} = p;
    const divRef = createRef<HTMLDivElement>();
    const [w, setW] = useState(100);
    useEffect(()=>{
        if (divRef.current) {
            setW(Math.round(divRef.current.clientWidth * 0.95));
        }
    }, [divRef.current]);
    return <div ref={divRef} style={{width: '100%', position:'relative'}}>
        <iframe width={w} height={w*ratio} 
        style={{margin:'auto', display:'block'}} {...others}
        mozallowfullscreen="true"  
        scrolling="no" msallowfullscreen="true" 
        allowfullscreen="true" 
        webkitallowfullscreen="true" allowtransparency="true"
        allow="autoplay; fullscreen; geolocation; microphone; camera; midi" 
         frameborder="0" />
         {p.disabled && <div style={{width:'100%', height:'100%', opacity:.6,position:'absolute', top:'0', left:0, background:'rgba(0,0,0,.6)'}}/>}
    </div>;
} 