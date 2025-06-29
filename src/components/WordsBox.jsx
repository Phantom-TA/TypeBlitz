import { useState } from "react";
import { useSettings } from "../context/SettingsContext";
import {generate} from 'random-words'
import '../styles/style.css'

const Wordsbox =() =>{
    
  
  const [words,setWords]= useState(generate(300))
  const [currentWord,setCurrentWord]=useState('');
  
  const generateRandomWord = () =>{
    const index= Math.floor(Math.random()*words.length);
    setCurrentWord(words[index]);
  }
  const {seconds} = useSettings;

  const [currCharInd , setCurrCharInd] =useState(0)
  const [currWordInd , setCurrWordInd] =useState(0)

  const [time,setTime]=useState(seconds)
    
  
   const handleKeyDown =(e) =>{

   }

    return(
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
            <input
              type="text"
              onKeyDown={(e) => handleKeyDown(e)}
            />
        </div>

        
    )
}
export default Wordsbox