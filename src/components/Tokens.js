"use client"


import React, { useEffect, useState } from 'react';
import { Timer, getTimerName, getTimerImg, getTimerId } from "@/app/Timer";
import Header from './Header';

const TimersPage = () => {

  const timers = [
    ["hamster", 3 * 60 * 60],
    ["blum", 8 * 60 * 60],
    ["hot", 2 * 60 * 60],
    ["iceberg", 6 * 60 * 60],
    ["pixelTap", 8 * 60 * 60],
    // ["test", 10]
  ]

  return (
    <>
      {/* <Header /> */}
      <div id="cont" className='timer-container'>
        {timers.map(([name, time]) => (
          <Timer
            title={getTimerName(name)}
            imgSrc={getTimerImg(name)}
            initialDuration={time}
            timerId={getTimerId(name)}
            key={getTimerId(name)}
            className="timer-item"
          />
        ))}
      </div>
    </>

  );
};

export default TimersPage;
