import { useEffect, useState } from "react";
import "./timerCounter.css";

interface Props {
  secondsTimer: number;
}
export function TimerCounter({ secondsTimer }: Props) {
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);

  useEffect(() => {
    // console.log("EFFECT 1", secondsTimer);
    setTimer(secondsTimer);
  }, [secondsTimer]);

  useEffect(() => {
    // console.log("EFFECT 2", timer);
    if (isTimerRunning) {
      const intervalId = setInterval(() => {
        if (secondsTimer > 0) setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    }
  }, [timer, isTimerRunning]);

  function getHourMinSec(seconds: number) {
    let hrs = Math.floor(seconds / 3600);
    let mins = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor((seconds % 3600) % 60);
    // console.log("TIME", hrs + ":" + mins + ":" + secs);
    return hrs + ":" + mins + ":" + secs;
  }
  function handleStopClick() {
    // clearInterval(intervalId);\
    setIsTimerRunning(false);
  }

  function handleRestartClick() {
    // setTimer(timer - 1);
    setIsTimerRunning(true);
  }
  return (
    <div className="timer-wrapper-wr">
      {timer > 0 && (
        <div className="timer-wrapper">
          <div className="timer-countdown">{getHourMinSec(timer)}</div>
          <button onClick={() => handleStopClick()}>Stop</button>
          <button onClick={() => handleRestartClick()}>Restart</button>
        </div>
      )}
    </div>
  );
}
