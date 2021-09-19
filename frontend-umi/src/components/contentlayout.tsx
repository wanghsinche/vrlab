import React, { PropsWithChildren } from 'react';
export default function Layout(p: PropsWithChildren<{}>){
    return <div style={{padding: 10}}>
        {p.children}
    </div>
}