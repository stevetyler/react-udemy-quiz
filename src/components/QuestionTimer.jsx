import { useEffect, useState } from 'react';

export default function QuestionTimer({ timeout, onTimeout }) {
    const [remainingTime, setRemainingTime] = useState(timeout);

    // only use useEffect if state is updated => inifinite loop
    useEffect(() => {  
        const timer = setTimeout(onTimeout, timeout);
        console.log('timer started');
        return () => {
            clearTimeout(timer);
        }
    }, [timeout, onTimeout]);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(prevTime => prevTime - 100);
        }, 100);
  
        return () => {
            // cleanup function when component is removed / teardown
            clearInterval(interval);
        };
    }, []);

    return <progress id="question-time" value={remainingTime} max={timeout} />
}