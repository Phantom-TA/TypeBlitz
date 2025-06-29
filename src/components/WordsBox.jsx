import { useRef, useState,useEffect, createRef } from "react";
import { useSettings } from "../context/SettingsContext";
import {generate} from 'random-words'
import '../styles/style.css'

const Wordsbox =() =>{
    
  
  const [words,setWords]= useState(generate(300))
  
  const {seconds} = useSettings;

  
  const [time,setTime]=useState(seconds)
  const [countDown,setCountDown] =useState(seconds);
  const [start,setStart]=useState(false)
  const [end,setEnd]=useState(false);

  const [currCharInd , setCurrCharInd] =useState(0)
  const [currWordInd , setCurrWordInd] =useState(0)
  const [correctChars, setCorrectChars] =useState(0)
  const [correctWords , setCorrectWords] = useState(0)
  const [incorrectChars , setIncorrectChars] = useState(0)
  const [extraChars ,setExtraChars] =useState(0)
  
  const arrRef = () =>{
    return Array(words.length).fill(0).map(() => createRef(null))
  }
  
  const inputRef= useRef(null)
  const[wordsRef,setWordsRef] = useState(arrRef)
  
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
    
    useEffect(() => {
        inputRef.current.focus()
      }, [])

   const handleKeyDown =(e) =>{
      if(!start){
        startTimer();
        setStart(true);
      }
      
      if(e.keyCode!==8 && e.key.length > 1){
        e.preventDefault()
        return 
      }

      let allChars = wordsRef[currWordInd].current.childNodes;
      
      
      if(e.keyCode === 32){
       
         const correctChars = wordsRef[currWordInd].current.querySelectorAll('.correct')
         
         if(correctChars.length === allChars.length)
            setCorrectWords(correctWords+1)
         
         if (
            wordsRef[currWordInd + 1].current.offsetLeft < wordsRef[currWordInd].current.offsetLeft
          ) {
           wordsRef[currWordInd].current.scrollIntoView();
         }


         setCurrWordInd(currWordInd + 1)
         setCurrCharInd(0)

         return 
      }

      if(e.key === allChars[currCharInd].innerText){
        allChars[currCharInd].className="char correct"
        setCorrectChars(correctChars+1)
      }
      else{
        allChars[currCharInd].className="char incorrect"
        setIncorrectChars(incorrectChars+1)
      }

      setCurrCharInd(currCharInd+1)

   }

    return(
        <div >
        <div className="words-box">
            <div className="words">
                {
                    words.map((word,index)=>(
                    
                        <span className="word" ref={wordsRef[index]}> 
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
              ref={inputRef}
              onKeyDown={(e) => handleKeyDown(e)}
            />
       
        </div>
        
    )
}
export default Wordsbox