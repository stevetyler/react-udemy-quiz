import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import { useState, useCallback, useEffect } from 'react';
import QUESTIONS from "../questions.js";

export default function Question({ activeQuestionIndex, onSelectAnswer, onSkipAnswer }) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

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
        }, 2000)
    }

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

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
                    timeout={10000} 
                    onTimeout={handleSkipAnswer}
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