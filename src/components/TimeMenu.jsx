
import { useSettings } from "../context/SettingsContext"


const TimeMenu =({countdown})=>{
    const {seconds,setSeconds} = useSettings()
    
    //update the time if user chooses different time mode
   const updateTime =(e) =>{
    setSeconds(e.target.id);
   }

    return (
        <div className="time-menu">
            <div className="counter">
                {countdown}
            </div>
            <div className="time-modes">
                <div className={seconds==15 ? "active-time time" : " time "} id={15} onClick={updateTime}>15s</div>
                <div className={seconds==30 ? "active-time time" : " time "} id={30} onClick={updateTime}>30s</div>
                <div className={seconds==60 ? "active-time time" : " time "} id={60} onClick={updateTime}>60s</div>
                <div className={seconds==120 ? "active-time time" : " time "} id={120} onClick={updateTime}>120s</div>

            </div>
        </div>
    )
}

export default TimeMenu;