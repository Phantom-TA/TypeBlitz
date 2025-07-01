import { useState } from "react";
import Wordsbox from "../components/WordsBox";
import '../styles/style.css'
import Header from "../components/Header";

const Home = () =>{
     
  return(
    <div className="home-page">
    <Header />
    <div className='words-panel'> 
         <Wordsbox />
    </div>
    </div>
    
  )

}
export default Home;