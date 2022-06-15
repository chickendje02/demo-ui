import {useRef, useEffect} from "react";

/**
 * this component run after dependencies update, not run first time
 * @param effect
 * @param dependencies
 */
const useUpdateEffect = (effect: any, dependencies : any[] = []) => {
    const isInitialMount = useRef(true);
    useEffect(() => {
        isInitialMount.current = true;
        return () => {
            isInitialMount.current = false;
        }
    }, []);
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            return effect();
        }
    }, dependencies);
}
export default useUpdateEffect;