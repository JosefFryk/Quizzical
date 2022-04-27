import React from  "react"


export default function Answers(props) {


const incorrectQuest = props.incorrect
const newArr = incorrectQuest.concat(props.correct)
console.log(newArr)


return(

   
        <div >
    
        <div >
            <ul className="choices">
             {newArr.map((quest)=> {
                return (
                    <li >
                  <button>{quest}</button>
                    </li>
                    
                )
                })}

                    
            </ul>
          
    
        </div>
      
        </div>
    
    )
  
}
