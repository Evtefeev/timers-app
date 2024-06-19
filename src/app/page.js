"use client"


import React, { useEffect, useState } from 'react';
import './globals.css'; // Assuming the styles are moved to App.css

const Timer = ({ title, imgSrc, initialDuration, timerId }) => {

  const [timeLeft, setTimeLeft] = useState(initialDuration);
  const [percent, setPercent] = useState(0);
  const [working, setWorking] = useState(0);
  const TimerFun = () => {
    let interval;



    const storedStartTime = localStorage.getItem(timerId);

    let startTime
    if (storedStartTime) {
      startTime = new Date(storedStartTime)
    } else if (working == 1) {
      const date = new Date()
      localStorage.setItem(timerId, date);
      startTime = date
    } else {
      return () => clearInterval(interval);

    }

    const updateTimer = () => {

      const currentTime = new Date();
      const elapsedSeconds = (currentTime - startTime) / 1000;
      const remainingSeconds = initialDuration - elapsedSeconds;

      setTimeLeft(Math.max(0, remainingSeconds));

      const progressPercent = (elapsedSeconds / initialDuration) * 100;
      setPercent(progressPercent);

      if (remainingSeconds <= 0) {
        // clearInterval(interval);
        localStorage.removeItem(timerId);
        setPercent(0)
        setWorking(0)
        setTimeLeft(initialDuration);
      }
    };
    setWorking(1)
    interval = setInterval(updateTimer, 50);

    return () => clearInterval(interval);
  };


  useEffect(TimerFun, [initialDuration, timerId, working, percent]);



  const formatTime = (seconds) => {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
  };

  const handleClick = () => {
    if (working == 0) {
      setWorking(1)
      setTimeLeft(initialDuration);
      // TimerFun();
    }
  };

  const stopTimer = () => {
    setWorking(0)
    setTimeLeft(initialDuration);
    setPercent(0)
    localStorage.removeItem(timerId)
  };

  const rotation = 360 * (percent / 100);
  const rightRotation = Math.min(rotation, 180);
  const leftRotation = Math.max(rotation - 180, 0);

  return (
    <div className="timer" onClick={handleClick}>
      <h2>{title}</h2>
      <button onClick={stopTimer}>reset</button>
      <div className="progress-circle">
        <div className="progress-bar">
          <span style={{ transform: `rotate(${rightRotation}deg)` }}></span>
        </div>
        <div className="progress-bar progress-bar-left">
          <span style={{ transform: `rotate(${leftRotation}deg)` }}></span>
        </div>
        <img src={imgSrc} alt={title} />
      </div>
      <div>{formatTime(timeLeft)}</div>
    </div>
  );
};
const getTimerName = str => {
  return str.charAt(0).toUpperCase() + str.slice(1) + " Timer";
};

const getTimerImg = str => {
  return "/images/" + str + ".jpg";
};

const getTimerId = str => {
  return str + "-timer";
};
const App = () => {

  const timers = [
    ["hamster", 3 * 60 * 60],
    ["blum", 8 * 60 * 60],
    ["hot", 2 * 60 * 60],
    ["test", 10]
  ]

  return (
    <div id="cont">
      {timers.map(([name, time]) => (
        <Timer
          title={getTimerName(name)}
          imgSrc={getTimerImg(name)}
          initialDuration={time}
          timerId={getTimerId(name)}
          key={getTimerId(name)}
        />
      ))}
    </div>
  );
};

export default App;
