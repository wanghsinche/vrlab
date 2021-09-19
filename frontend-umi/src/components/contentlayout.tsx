import React, { PropsWithChildren } from 'react';
export default function Layout(p: PropsWithChildren<{title?:string}>){
    return <div style={{padding: 10}}>
        <h1>{p.title}</h1>
        {p.children}
    </div>
}