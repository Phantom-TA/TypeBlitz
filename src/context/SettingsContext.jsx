import { createContext ,useState , useContext} from "react";

const SettingsContext = createContext();

export const SettingsProvider=({children})=>{
    const [seconds,setSeconds] =useState(15);
    
    return (
        <SettingsContext.Provider value={{seconds,setSeconds}}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings(){
    return useContext(SettingsContext)
}

