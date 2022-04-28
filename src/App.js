
import React from 'react';
import './App.css';
import Home from './components/Home';
import Questions from './components/Questions';
import {nanoid} from 'nanoid';


  
function App() {


    const [startGame, setStartGame] = React.useState(false);
    const [formData, setFormData] = React.useState({
      category: '8',
      difficulty: 'easy',
    })
    const [questions, setQuestions]= React.useState([])
    const [score, setScore] = React.useState(0)
    const [showAnswers, setShowAnswers] = React.useState(false);
    const [replay, setReplay] = React.useState(false);
    const selectedCategory = formData.category
   
    
    
    React.useEffect(()=> {
      fetch(selectedCategory ===  "8" ? 
     ` https://opentdb.com/api.php?amount=5&difficulty=${formData.difficulty}&type=multiple`
      :`https://opentdb.com/api.php?amount=5&category=${formData.category}&difficulty=${formData.difficulty}&type=multiple`)
        .then(res => res.json())
        .then(data => {
            //map skrz data -> mix corrent a incorrect -> return array
          const combinedAnswers = data.results.map(q => {
            const answerArr = shuffle([
              ...q.incorrect_answers,
              q.correct_answer,
            ])
            //add ID
            const allAnswers = answerArr.map(answer => {
              return {
                id: nanoid(),
                answer: answer,
                isHeld: false
              }
            })
            
            return {
              id: nanoid(),
              question: q.question,
              answers: allAnswers,
              correctAnswer: q.correct_answer,
              userAnswer: null,
              category: q.category
            }
          })
          setQuestions(combinedAnswers)
  
        }) 
          
    },[startGame, replay])
    
  
    function toggleStart(){
      setStartGame(true);
    }
  
    function handleChange(event){
      setFormData(prevState => {
        const {name, value} = event.target;
        return {
          ...prevState, 
          [name]: value
        }
      })
    }
  
    function handleChoice(event, questionId, answerId){
  
      let answersArray = questions.filter(x => x.id === questionId);
  
      let questionAnswered = questions.find(q => q.id === answersArray[0].id)
  
      let possibleAnswers = [...questionAnswered.answers]
  
      possibleAnswers.map(a => a.isHeld = false); //reset all isHeld so only 1 is 'isHeld' at a time
  
      let pickedAnswer = possibleAnswers.find(a => a.id === answerId)
  
      pickedAnswer.isHeld = !pickedAnswer.isHeld //can have multiple held
  
      let answerIdx = possibleAnswers.indexOf(pickedAnswer)
  
      possibleAnswers.splice(answerIdx, 1, pickedAnswer)
  
      let answersArrayUpdated = {...possibleAnswers, userAnswer: event.target.innerText}
  
      //console.log({answersArrayUpdated})
      
      let questionUpdated = {...questionAnswered, answersArrayUpdated, userAnswer: answersArrayUpdated.userAnswer}
  
      //console.log({questionAnswered})
   
     let index = questions.findIndex(el => el.id === questionAnswered.id);
  
     //console.log(index)
  
     let clonedQuestions = [...questions];
  
     clonedQuestions[index] = questionUpdated;
  
     setQuestions(clonedQuestions);
    }
  
    //console.log({questions})
  
    function shuffle(array) {
      let currentIndex = array.length,  randomIndex;
    
      // While there remain elements to shuffle...
      while (currentIndex !== 0) {
    
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
  }
  
  function handleScore(){
    setScore(0);
    for(let i = 0; i < questions.length; i++){
      if(questions[i].correctAnswer === questions[i].userAnswer){
        setScore(prev => prev + 1)
      }
    }
    setShowAnswers(prev => !prev);
  }
  
  function restart(){
    setScore(0)
    setShowAnswers(false)
    setReplay(prev => !prev)
  }




  return (
    <div className="App">
      {startGame ? 
      <Questions score={score} 
                    questions={questions} 
                    handleChoice={handleChoice} 
                    showAnswers={showAnswers} 
                    handleScore={handleScore}
                    replay={restart} /> : 
     
     
     <Home toggleStart={toggleStart} 
            formData={formData} 
            setFormData={setFormData} 
            handleChange={handleChange}
             />}
    </div>
  );
}

export default App;

////https://opentdb.com/api_config.php