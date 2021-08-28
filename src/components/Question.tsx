import React from "react"
type props = {
    isAnswered:boolean,
    questionNo:number,
    answers:string[],
    question:string,
    callback:React.MouseEventHandler<HTMLButtonElement> | undefined

    // correctAnswer:string,
}
const QuestionComp:React.FC<props> = ({isAnswered,questionNo,answers,question,callback}) => {
    return <>
        <h2>Question {questionNo}/10: </h2> <h2 dangerouslySetInnerHTML={{__html:question}}/>
        <br/>
        <div className='options'>
        {
            answers.map((answer)=><button disabled={isAnswered}value={answer} onClick={callback} key={answer}>{answer}</button>)
        }
        </div>
    </>
}

export default QuestionComp;
