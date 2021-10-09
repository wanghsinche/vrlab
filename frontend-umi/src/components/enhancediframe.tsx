import React, { createRef, HTMLProps, useEffect, useState } from 'react';
export const EnhancedIframe: React.FC< HTMLProps<HTMLIFrameElement> & {ratio?: number}> =p =>{
    const {ratio=1, width, height, ...others} = p;
    const divRef = createRef<HTMLDivElement>();
    const [w, setW] = useState(100);
    useEffect(()=>{
        if (divRef.current) {
            setW(Math.round(divRef.current.clientWidth*0.8));
        }
    }, [divRef.current]);
    return <div ref={divRef} style={{width: '100%'}}>
        <iframe width={w} height={w*ratio} {...others as any} />
    </div>;
} 