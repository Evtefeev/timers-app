"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";


export function getTimerName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getTimerImg(str) {
    return "/images/" + str + ".jpg";
};

export function getTimerId(str) {
    return str + "-timer";
};


export function Timer({
    title,
    imgSrc,
    initialDuration,
    timerId,
    link,
    working,
    setWorkingState,
    currentTime,
}) {
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [percent, setPercent] = useState(100);
    const [startTime, setStartTime] = useState(() => {
        const storedStartTime = localStorage.getItem(timerId);
        return storedStartTime ? new Date(storedStartTime) : null;
    });

    useEffect(() => {
        if (working[timerId] && !startTime) {
            const now = new Date();
            setStartTime(now);
            localStorage.setItem(timerId, now);
        } else {
            setPercent(0);
            setTimeLeft(0);
        }
    }, [working, timerId, startTime]);

    useEffect(() => {
        if (startTime) {
            const elapsedSeconds = (currentTime - startTime) / 1000;
            const remainingSeconds = initialDuration - elapsedSeconds;

            if (remainingSeconds <= 0) {
                setTimeLeft(0);
                setPercent(0);
                localStorage.removeItem(timerId);
                setWorkingState({ ...working, [timerId]: 0 });
            } else {
                setTimeLeft(Math.max(0, remainingSeconds));
                setPercent(100 - (elapsedSeconds / initialDuration) * 100);
            }
        }
    }, [currentTime, startTime, initialDuration, timerId, working, setWorkingState]);

    const formatTime = (seconds) => {
        const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
        const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
        return `${hours}:${minutes}:${secs}`;
    };

    const handleClick = () => {
        if (!working[timerId]) {
            setWorkingState({ ...working, [timerId]: 1 });
            setTimeLeft(initialDuration);
            window.open(link, "_blank", "noopener,noreferrer");
        }
    };

    const stopTimer = () => {
        setWorkingState({ ...working, [timerId]: 0 });
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
}
