import { useState, useCallback } from "react";
import QUESTIONS from "../questions.js";
import quizCompleteImg from "../assets/quiz-complete.png"
import QuestionTimer from "./QuestionTimer.jsx";

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);
    const activeQuestionIndex = userAnswers.length;
    const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

    const handleSelectAnswer = useCallback(function handleSelectAnswer(selectedAnswer) {
        setUserAnswers(prevUserAnswers => [...prevUserAnswers, selectedAnswer]);
    });

    const handleSkipAnswer = useCallback(() => handleSelectAnswer(null), [handleSelectAnswer]);

    if (quizIsComplete) {
        return <div id="summary">
            <img src={quizCompleteImg} alt="Trophy icon" />
            <h2>Quiz Completed!</h2>
        </div>
    }

    const shuffledAnswers = [...QUESTIONS[activeQuestionIndex].answers]
    shuffledAnswers.sort(() => Math.random() - 0.5); // +ve and -ve answers to shuffle

    return (
        <div id="quiz">
            <div id="question">
                <QuestionTimer 
                    timeout={10000} 
                    onTimeout={handleSkipAnswer}
                    key={activeQuestionIndex} // causes component to rerender when question changes
                />
                <h2>{QUESTIONS[activeQuestionIndex].text}</h2>
                <ul id="answers">
                    {shuffledAnswers.map((answer) => {
                        return (
                            <li key={answer} className="answer">
                                <button onClick={() => { handleSelectAnswer(answer) }}>{answer}</button>
                                
                            </li>
                        )
                    })}
                </ul>
                
            </div>
        </div>
    )
}