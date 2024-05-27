import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState, useCallback, useEffect } from 'react';
import QUESTIONS from "../questions.js";

export default function Question({ activeQuestionIndex, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if (answer.selectedAnswer) {
        timer = 1000;
    }
    if (answer.isCorrect !== null) {
        timer = 2000
    }
    
    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });
        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: answer === QUESTIONS[activeQuestionIndex].answers[0]
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000)
    }

    let answerState = '';

    if (answer.selectedAnswer && answer.isCorrect !== null) {
       answerState =  answer.isCorrect ? 'correct' : 'wrong'
    } else if (answer.selectedAnswer) {
        answerState = 'answered'
    }
    
    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer 
                    key={timer}
                    timeout={timer} 
                    onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null}
                    mode={answerState}
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <Answers 
                    answers={QUESTIONS[activeQuestionIndex].answers} 
                    selectedAnswer={answer.selectedAnswer}
                    answerState={answerState}
                    onSelect={handleSelectAnswer}
                />                
            </div>
        </div>
    )
}