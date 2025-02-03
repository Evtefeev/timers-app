"use client";

import React, { useEffect, useState } from "react";
import "./globals.css";


export function getTimerName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export function getTimerImg(str) {
    if (str.includes("test")) {
        str = "test";
    }
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
    openTelegramLink
}) {
    const [timeLeft, setTimeLeft] = useState(initialDuration);
    const [percent, setPercent] = useState(100);
    const [startTime, setStartTime] = useState(null);
    const [isClient, setIsClient] = useState(false);


    // get start time in localstorage from client browser
    useEffect(() => {
        setIsClient(true);
        const storedStartTime = localStorage.getItem(timerId);
        if (storedStartTime) {
            setStartTime(new Date(storedStartTime));
        }
        // console.log(storedStartTime);

        if (working[timerId] == 1 && !storedStartTime) {
            const now = new Date();
            setStartTime(now);
            localStorage.setItem(timerId, now);
        } else {
            setPercent(0);
            setTimeLeft(0);
        }

    }, [working]);

    useEffect(() => {
        if (working[timerId] == 1 && startTime) {
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
            if (title.toLowerCase().includes("test")) {
                return
            }
            if (openTelegramLink.isAvailable()) {
                openTelegramLink(link);
            } else {
                window.open(link, "_blank", "noopener,noreferrer");
            }
        }
    };


    const stopTimer = () => {
        localStorage.removeItem(timerId);
        setWorkingState({ ...working, [timerId]: 0 });
        console.log(working);
        setTimeLeft(0);
        setPercent(0);
    };

    const rotation = 360 * (percent / 100);
    const rightRotation = Math.min(rotation, 180);
    const leftRotation = Math.max(rotation - 180, 0);
    if (!isClient) {
        return <div className="timer">
            <h2>{title}</h2>
            {/* <button onClick={stopTimer}>reset</button> */}
            <div className="progress-circle">
                <div className="progress-bar">
                    <span style={{ transform: `rotate(${rightRotation}deg)` }}></span>
                </div>
                <div className="progress-bar progress-bar-left">
                    <span style={{ transform: `rotate(${leftRotation}deg)` }}></span>
                </div>
                <img src={imgSrc} alt={title} />
            </div>
            <div>Loading...</div>
        </div> // Ensures the server and client render the same content
    }
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
