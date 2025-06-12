import { useState } from "react";
import "./timerInput.css";

type TimerInputProps = {
  handleTimer: Function;
};
export const TimerInput = ({ handleTimer }: TimerInputProps) => {
  const [hrs, setHrs] = useState<number>(0);
  const [mins, setMins] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);

  function handleStartTimer() {
    const timeInSecond = hrs * 3600 + mins * 60 + seconds;
    handleTimer(timeInSecond);
  }
  return (
    <div className="timer-input-wrapper">
      <input
        placeholder="Hrs"
        value={hrs}
        onChange={(e) => setHrs(Number(e.target.value))}
      />
      <input
        placeholder="Mins"
        value={mins}
        onChange={(e) => setMins(Number(e.target.value))}
      />
      <input
        placeholder="Secs"
        value={seconds}
        onChange={(e) => setSeconds(Number(e.target.value))}
      />
      <button onClick={() => handleStartTimer()}>Submit</button>
    </div>
  );
};
