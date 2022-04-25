
import React from "react"
import { nanoid } from "nanoid"



export default function Home() {
    
    
    const [quiz, setQuiz] = React.useState([])
    
    React.useEffect(() => {
    
      fetch("https://opentdb.com/api.php?amount=5&difficulty=medium&type=multiple")
          .then(res => res.json())
          .then(data => setQuiz(data.results))
    
    }, [])

    quiz.id = nanoid()

    console.log(quiz)
  
    return(
        <div >

        <div className="wrapper">
            {quiz.map(quest => {
                return (
                    <ul>
                        <li key={quiz.id}>

                            <h2>{quest.category}</h2>
                            <p>{quest.question}</p>
                            <ul>
                                <li></li>
                            </ul>

                        </li>
                    </ul>
                    )
                })}
          
    
        </div>
        <button>sdsda</button>
        </div>
    )
}