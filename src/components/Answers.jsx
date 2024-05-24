import { useRef } from 'react';

export default function Answers({answers, selectedAnswer, answerState, onSelect}) {
    const shuffledAnswers = useRef(); // to prevent answers getting reshuffled when selecting an answer. Ref will not rerender component

    if (!shuffledAnswers.current) {
        shuffledAnswers.current = [...answers];
        shuffledAnswers.current.sort(() => Math.random() - 0.5); // +ve and -ve answers to shuffle
    }

    return (
        <ul id="answers">
            {shuffledAnswers.current.map((answer) => {
                const isSelected = selectedAnswer === answer; // get last answer
                let className = '';
                
                if (answerState === 'answered' && isSelected) {
                    className = 'selected';
                }
                if ((answerState === 'correct' || answerState === 'wrong') && isSelected) {
                    className = answerState;
                }
                return (
                    <li key={answer} className="answer">
                        <button onClick={() => onSelect(answer)} className={className}>
                            {answer}
                        </button>
                    </li>
                )
            })}
        </ul>        
    )
}