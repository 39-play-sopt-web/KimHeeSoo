import { useCallback, useEffect, useRef, useState } from 'react'; // React에서 사용할 훅 

const TICK_MS = 10;

export const useTimer = () => {
    const [elapsed, setElapsed] = useState(0);
    const startTimeRef = useRef(0);
    const intervalIdRef = useRef(null);
    const clear = () => {
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    };

    const start = useCallback(() => {
        if (intervalIdRef.current)
            return;
        startTimeRef.current = Date.now();

        intervalIdRef.current = setInterval(() => {
            setElapsed(Date.now() - startTimeRef.current);
        },TICK_MS);
       }, []);
       
    const stop = useCallback(() => {
        clear();
        const finalTime = Date.now() - startTimeRef.current;
        setElapsed(finalTime);
        return finalTime;
    }, []);

    const reset = useCallback(() => {
        clear();
        setElapsed(0);
    },[]);
    
    useEffect(() => clear, []);

    return { elapsed, start, stop, reset };
};
