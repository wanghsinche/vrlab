export const throttle = (fn:(...a: unknown[])=>void, gap: number) => {
    let lastExecuted: number = 0;
    return (...arr:unknown[])=>{
        const now = Date.now();
        if (now - lastExecuted > gap) {
            lastExecuted = now;
            fn(...arr);
        } 
    }
}