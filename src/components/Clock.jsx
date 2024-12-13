
import { useEffect, useState } from "react";
import "./clock.css";
import { useEffect, useState } from 'react';
import './clock.css';

function Clock() {
  const [time, setTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    period: "AM",
  });

  useEffect(() => {
    const updateClock = () => {
      const today = new Date();
      let hours = today.getHours();
      const period = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();

      setTime({
        hours: hours < 10 ? `0${hours}` : `${hours}`,
        minutes: minutes < 10 ? `0${minutes}` : `${minutes}`,
        seconds: seconds < 10 ? `0${seconds}` : `${seconds}`,
        period: period,
      });
    };

    const intervalId = setInterval(updateClock, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="clock-container">
      <div className="clock-time">
        <span className="clock-element">{time.hours}</span>
        <span className="clock-colon">:</span>
        <span className="clock-element">{time.minutes}</span>
        <span className="clock-colon">:</span>
        <span className="clock-element">{time.seconds}</span>
        <span className="clock-period">{time.period}</span>
      </div>
    </div>
  );
}

export default Clock;
