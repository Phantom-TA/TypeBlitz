import { createContext } from "react";

const SettingsContext = createContext();

export function SettingsProvider({children}){
    const [seconds,setSeconds] =useState(30);
    
    return (
        <SettingsContext.Provider value={{seconds,setSeconds}}>
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings(){
    return useContext(SettingsContext)
}

