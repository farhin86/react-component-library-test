import { useState } from "react";
import "./timer.css";
import { TimerInput } from "../TimerInput/timerInput";
import { timerDummy } from "../../../Constants/timer";
import { TimerCounter } from "../TimerCounter/timerCounter";

export const Timer = () => {
  const [timer, setTimer] = useState<number[]>([]);

  function handleTimer(seconds: number) {
    setTimer([...timer, seconds]);
  }

  return (
    <div>
      <div>
        <TimerInput handleTimer={handleTimer} />
      </div>
      <div>
        {timer.map((seconds) => {
          return <TimerCounter secondsTimer={seconds} />;
        })}
      </div>
    </div>
  );
};
