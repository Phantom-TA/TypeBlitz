import { useRef, useState,useEffect, createRef } from "react";
import { useSettings } from "../context/SettingsContext.jsx";
import {generate} from 'random-words'
import '../styles/style.css'
import TimeMenu from "./TimeMenu.jsx";

const Wordsbox =() =>{
    
  
  const [words,setWords]= useState(generate(400))
  
  const {seconds} = useSettings();
  
  
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
  const [missedChars ,setMissedChars] = useState(0)
  const [interval , setInter] =useState(null)
  
  const arrRef = () =>{
    return Array(words.length).fill(0).map(() => createRef(null))
  }
  
  const inputRef= useRef(null)

  //referencing words
  const[wordsRef,setWordsRef] = useState(arrRef())


  //function to start the timer and the countdown
  const startTimer = () =>{
   
    const interval = setInterval(timer,1000)
    setInter(interval)
     function timer() {
        setCountDown((prevCountDown)=>{
             if(prevCountDown === 1)
             {
                setEnd(true);
                clearInterval(interval)
                return 0;
             }
             console.log(prevCountDown)
             return prevCountDown-1;
        })
        }
    }
    
    //to focus on the input field 
    const focusInput = () => {
        inputRef.current.focus()
    }

    //to focus on the input field on initial render and to put the cursor at the beginning
    useEffect(() => {
        inputRef.current.focus()
        wordsRef[0].current.childNodes[0].className ="char cursor-current"
      }, [])
    
    //function to restart and to refresh all the states
    const restart =() =>{
        setCurrCharInd(0)
        setCurrWordInd(0)
        clearInterval(interval)
        setStart(false)
        setEnd(false)
        setWords(generate(400))
        setWordsRef(arrRef())
        setCountDown(seconds)
        setTime(seconds)
        setCorrectChars(0)
        setCorrectWords(0)
        setIncorrectChars(0)
        setMissedChars(0)
        setExtraChars(0)
        focusInput();
        resetClassname();

   }
   
   //To handle the key pressed by the user 
   const handleKeyDown =(e) =>{
      
    //To prevent default functioning of the keys other than backspace and keys having length less than 2 
      if(e.keyCode!==8 && e.key.length > 1){
        e.preventDefault()
        return 
      }
     
    
      if(!start){
        startTimer();
        setStart(true);
      }
      
      let allChars = wordsRef[currWordInd].current.childNodes;
      
      //to handle if key is a space 
      if(e.keyCode === 32){
       
         const correctChars = wordsRef[currWordInd].current.querySelectorAll('.correct')
         
         if(correctChars.length === allChars.length)
            setCorrectWords(correctWords+1) 

         if(allChars.length <= currCharInd)
            allChars[currCharInd-1].classList.remove('cursor-right-current')
        else{
             setMissedChars(missedChars + ( allChars.length-currCharInd))
         for(let i=currCharInd; i < allChars.length ; i++){
            allChars[i].className +=" skipped"
         }

         allChars[currCharInd].classList.remove('cursor-current')
        }

         
         if (
            wordsRef[currWordInd + 1].current.offsetLeft < wordsRef[currWordInd].current.offsetLeft
          ) {
           wordsRef[currWordInd].current.scrollIntoView();
         }

         wordsRef[currWordInd+1].current.childNodes[0].className ="char cursor-current"
         setCurrWordInd(currWordInd + 1)
         setCurrCharInd(0)

         return 
      }
      //to handle when key is backspace 
      if(e.keyCode===8){
        if(currCharInd !==0 ){
            if(currCharInd === allChars.length){
                if(allChars[currCharInd-1].className.includes("extra")){
                    allChars[currCharInd-1].remove();
                    allChars[currCharInd-2].className += " cursor-right-current"
                }
                else
                    allChars[currCharInd-1].className="char cursor-current"

                setCurrCharInd(currCharInd-1)
                return;
            }

            allChars[currCharInd].className ="char"
            allChars[currCharInd-1].className="char cursor-current"
            setCurrCharInd(currCharInd-1)
            
        }
        return ;
      }
      
      //to handle the extra characters 
      if(currCharInd === allChars.length){
         setExtraChars(extraChars+1)
         let extraChar = document.createElement('span')
         extraChar.innerText = e.key
         extraChar.className = "char incorrect extra cursor-right-current"
         allChars[currCharInd-1].classList.remove('cursor-right-current')
         wordsRef[currWordInd].current.append(extraChar)
         setCurrCharInd(currCharInd+1)
         return;
      }
      
      //to handle the correct characters
      if(e.key === allChars[currCharInd].innerText){
        allChars[currCharInd].className="char correct"
        setCorrectChars(correctChars+1)
      }
      //to handle the incorrect characters
      else{
        allChars[currCharInd].className="char incorrect"
        setIncorrectChars(incorrectChars+1)
      } 

      //handling the placing of cursor 
      if(currCharInd+1 === allChars.length)
      {
        allChars[currCharInd].className += " cursor-right-current"
      }
      else{
        allChars[currCharInd+1].className = "char cursor-current"
      }
       

      setCurrCharInd(currCharInd+1)

   }
   
   //to restart if there is a change in seconds after the first render
   const isFirstRender = useRef(true);
    useEffect(() => {
        if (isFirstRender.current) {
        isFirstRender.current = false;
        return; 
        }
        restart();
    }, [seconds]);
   
    //to reset the className of all chars that have been changed 
   const resetClassname = () =>{
      wordsRef.map( (i)=> { 
        Array.from(i.current.childNodes).map((j) =>{
            if(j.className.includes("extra"))
                j.remove();
            j.className = "char"
        })
      })
      wordsRef[0].current.childNodes[0].className="char cursor-current"
   }
   
   //function to calculate WPM 
   const calcWPM =() =>{
     return Math.round((correctChars / 5) / ( time / 60) )
   }
    
   //function to calculate accuracy
   const calcAccuracy = () =>{ 
     return  Math.round((correctChars / (correctChars + incorrectChars + extraChars + missedChars))*100 )
   }
   
   
   const handleRestart=() =>{
    restart();
   }
    return(
        <div >
            
            {end ? (
                <div>
                   <h1>WPM : {calcWPM()}</h1>
                   <h1>Accuracy : {calcAccuracy()}% </h1>
                </div>
            ) :

        (<div>
            <TimeMenu countdown={countDown} />
        <div className="words-box" onClick={focusInput}>
            
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
          </div>  )}
            <div className="restart-container">
            <button className="restart" onClick={handleRestart}> Restart</button>
            </div>

            <input
              type="text"
              ref={inputRef}
              className="   input-hidden"
              onKeyDown={(e) => handleKeyDown(e)}
            />
            
       
        </div>
        
    )
}
export default Wordsbox