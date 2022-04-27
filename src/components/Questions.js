
import React from "react"
import { nanoid } from "nanoid"



export default function Home() {
    
    
    const [quiz, setQuiz] = React.useState([])
    const [answer, setAnswer] = React.useState() 


    // function selectAnswer(){
    //     setAnswer(document.addEventListener('click', function(){

    //         document.getElementById
    //     }))

    // }

    // function checkAnswers (){

    //     if (selectAnswer === quiz.correct_answer)
    // }
    
    
    React.useEffect(() => {
    
      fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
          .then(res => res.json())
          .then(data => setQuiz(data.results))
    
    }, [])

  //fixing API znaky
  const htmlDecode = input => {
    const doc = new DOMParser().parseFromString(input, "text/html")
    return doc.documentElement.textContent
  }


      return(
        <div >

        <div className="wrapperQuest">
            {quiz.map(quest => {
                return (
                    <ul className="questionBox">
                        <li >

                            <h2>{quest.category}</h2>
                            <p>{htmlDecode(quest.question)}</p>
                           <Answers
                                    
                                    incorrect = {quest.incorrect_answers}
                                    correct = {quest.correct_answer}
                             />

                        </li>
                    </ul>
                    )
                })}

            <button className="checkAnswers">Check Answers</button>
          
    
        </div>
      
        </div>
    )
}