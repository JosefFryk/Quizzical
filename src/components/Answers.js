import React from  "react"
import "./css/Answers.css"

export default function Answers(props) {



//opravuje API znaky ' " "
const htmlDecode = input => {
    const doc = new DOMParser().parseFromString(input, "text/html")
    return doc.documentElement.textContent
  }

return(

   
    <div>
         <p className="mainQuestions">{htmlDecode(props.question.question)}</p>
       
        <ul className="choices" >
        {props.question.answers.map(answer => {

        const style1 = {
                     backgroundColor: props.question.correctAnswer === props.question.userAnswer ? "green":"red"
}

        const style2 = {
                     backgroundColor: answer.isHeld ? "#4D5B9E": "",
}
   
            return (
                    
   

                 <li 
                    key={answer.id} 
                    onClick={(event) => props.handleChoice(event, props.question.id, answer.id)}
                    >
                     <button
                        className="answersBtn"
                         style={props.showAnswers && answer.isHeld ? style1 : style2}
                         >
                        {htmlDecode(answer.answer)}
                     </button>
                </li>
                   
)
})}
           </ul>             
      </div>       

    )
  
}
