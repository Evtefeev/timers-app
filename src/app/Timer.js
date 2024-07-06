"use client"


import React, { useEffect, useState } from 'react';
import './globals.css'; // Assuming the styles are moved to App.css


export function getTimerName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getTimerImg(str) {
    return "/images/" + str + ".jpg";
};

export function getTimerId(str) {
    return str + "-timer";
};



export function Timer({ title, imgSrc, initialDuration, timerId, link, working, setWorkingState }) {

    const [timeLeft, setTimeLeft] = useState(0);
    const [percent, setPercent] = useState(0);


    function setWorking(state) {
        const workingState = Object.assign({}, working);
        workingState[timerId] = state;
        setWorkingState(workingState);
    }

    const openInNewTab = url => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };
    const TimerFun = () => {
        let interval;
        // if (!working[timerId]) {
        //     return () => clearInterval(interval);
        // }
        const storedStartTime = localStorage.getItem(timerId);
        let startTime
        if (storedStartTime) {
            startTime = new Date(storedStartTime)
        } else if (working[timerId] == 1) {
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
            setPercent(100-progressPercent);

            if (remainingSeconds <= 0) {
                // clearInterval(interval);
                localStorage.removeItem(timerId);
                setPercent(0)
                setWorking(0)
                setTimeLeft(0);
            }
        };
        setWorking(1)
        interval = setInterval(updateTimer, 500);

        return () => clearInterval(interval);
    };


    useEffect(TimerFun, [timeLeft]);



    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
        const secs = String(Math.floor(seconds % 60)).padStart(2, '0');
        return `${hours}:${minutes}:${secs}`;
    };

    const handleClick = () => {
        if (!working[timerId] || working[timerId] == 0) {
            setWorking(1);
            setTimeLeft(initialDuration);
            openInNewTab(link)
        }
    };

    const stopTimer = () => {
        setWorking(0);
        setTimeLeft(0);
        setPercent(0);
        localStorage.removeItem(timerId);
    };

    const rotation = 360 * (percent / 100);
    const rightRotation = Math.min(rotation, 180);
    const leftRotation = Math.max(rotation - 180, 0);

    return (
        <div className="timer">
            <h2>{title}</h2>
            <button onClick={stopTimer}>reset</button>
            <div className="progress-circle">
                <div className="progress-bar">
                    <span style={{ transform: `rotate(${rightRotation}deg)` }}></span>
                </div>
                <div className="progress-bar progress-bar-left">
                    <span style={{ transform: `rotate(${leftRotation}deg)` }}></span>
                </div>
                <img src={imgSrc} alt={title} onClick={handleClick} />
            </div>
            <div>{formatTime(timeLeft)}</div>
        </div>
    );
};