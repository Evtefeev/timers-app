"use client"


import React, { useEffect, useState } from 'react';
import './globals.css'; // Assuming the styles are moved to App.css
import { Timer, getTimerName, getTimerImg, getTimerId } from "@/app/Timer";

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
