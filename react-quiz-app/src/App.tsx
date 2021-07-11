import React, { useState } from "react";
import { Difficulty, fetchQeustionFromAPI, QuestionState } from "./API";
import './utils';
// css
import './App.css';
// components
import QuestionComp from "./components/Question";

const TOTAL_NUMBER_OF_QUESTIONS = 10


function App() {
  const [Loading, setLoading] = useState(false);
  const [Score, setScore] = useState(0);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  // const [prevScore, setprevScore] = useState<Function>(()=>(localStorage.getItem('prevScore')))
  let prevScore:string|null = localStorage.getItem('prevScore') ;
  if(!prevScore){
    prevScore = '0'
  }
  // const [currQuestion, setCurrQuestion] = useState<Question | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [answered, setAnswered] = useState<boolean>(false);
  const start = async () => {
    setLoading(true);
    setGameOver(false);
    setScore(0);
    const QuestionsData: QuestionState[] = await fetchQeustionFromAPI(TOTAL_NUMBER_OF_QUESTIONS, Difficulty.Easy);
    setQuestions(QuestionsData);
    // setCurrQuestion(QuestionsData[0])
    setQuestionIndex(0);
    setLoading(false)
  }


  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnswered(true)
    if(e.currentTarget.value === questions[questionIndex]['correct_answer']){
      // alert('Hey , Your answer is correct!');
      setScore(state => state +1);
      localStorage.setItem('prevScore',JSON.stringify(Score))

    }else{
      // alert('Sorry, Your answer is wrong!')
    }

  }
  const nextQuestion = () => {
    setAnswered(false);
    if (questionIndex === 9) {
      setGameOver(true)
      localStorage.setItem('prevScore',JSON.stringify(Score))
      return;
    }
    setQuestionIndex(state => state + 1);

  }
  return (
    <div className="App">
      {gameOver || questionIndex === TOTAL_NUMBER_OF_QUESTIONS ? <button className='StartBtn' onClick={start}>Start</button> : null}

      {!gameOver ? <p className="score">Score: {Score}</p> : null}
      {gameOver ? <p className="score"> Your Previous Score : {prevScore}</p> :null}
      {Loading ? <p className="loading">Loading Questions</p> : null}
      {(!Loading && !gameOver) ? <QuestionComp isAnswered={answered} callback={checkAnswer} questionNo={questionIndex + 1} question={questions[questionIndex]['question']} answers={questions[questionIndex]['answers']} /> : null}
      <br></br>
      {(questionIndex < TOTAL_NUMBER_OF_QUESTIONS && !gameOver && !Loading) ? <button className='nextBtn' onClick={nextQuestion}>Next</button> : null}
    </div>
  );
}

export default App;
