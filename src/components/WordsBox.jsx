import { useState } from "react";
import { useSettings } from "../context/SettingsContext";
import {generate} from 'random-words'
import '../styles/style.css'

const Wordsbox =() =>{
    
  
  const [words,setWords]= useState(generate(300))
  const [currentWord,setCurrentWord]=useState('');
  
 
  const {seconds} = useSettings;

  const [currCharInd , setCurrCharInd] =useState(0)
  const [currWordInd , setCurrWordInd] =useState(0)

  const [time,setTime]=useState(seconds)
  const [countDown,setCountDown] =useState(seconds);
  const [end,setEnd]=useState(false);

  const startTimer = () =>{
    const interval = setInterval(timer,1000)
     function timer() {
        setCountDown((prevCountDown)=>{
             if(prevCountDown === 1)
             {
                setEnd(true);
                clearInterval(interval)
                return 0;
             }
             return prevCountDown-1;
        })
     }
  }

  



  
   const handleKeyDown =(e) =>{

   }

    return(
        <div >
        <div className="words-box">
            <div className="words">
                {
                    words.map((word,index)=>(
                    
                        <span className="word"> 
                        {
                            word.split("").map((char,ind)=>(
                                <span className="char">{char}</span>
                            ))
                        }
                        </span>
                    )
                )
                }
            </div>
         </div>
            <input
              type="text"
             
              onKeyDown={(e) => handleKeyDown(e)}
            />
       
        </div>
        
    )
}
export default Wordsbox