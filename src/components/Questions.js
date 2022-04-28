
import React from "react"
import Answers from "./Answers"
import "./css/Questions.css"



export default function Home(props) {
    
    
    function scoreElement(){
        return (
          <>
           <div className="scoreText">You got {props.score} / 5 questions correct!</div>
           <button onClick={props.replay}
                    className="resetBtn"
           >Play Again</button>
         </>
        )
      }

      function reload(){
          return(
                window.location.reload()
          )
      }
      
         
      return(
        <div >
        <div className="wrapperQuest">
            {props.questions.map(question => {
                return (
                            
                    <ul className="questionBox">
                        <li >

                            <h2>{question.category}</h2>
                         
                           <Answers
                                    question={question} 
                                    showAnswers={props.showAnswers} 
                                    handleChoice={props.handleChoice}
                                    
                                    />

                        </li>
                    </ul>
                    )
                })}
            <div className="btnBox">

                {props.showAnswers ? null : <button className="checkAnswers"
                    onClick={props.handleScore}
                    >Check Answers</button>}
                {props.showAnswers && scoreElement()}
                <button onClick={() => reload()}
                        className="backBtn"    
                
                >Back to Menu</button>
           
            </div>
          
    
        </div>
      
        </div>
    )
}