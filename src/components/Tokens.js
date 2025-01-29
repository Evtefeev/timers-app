"use client"


import React, { useEffect, useState } from 'react';
import { Timer, getTimerName, getTimerImg, getTimerId } from "@/app/Timer";
import Header from './Header';

const TimersPage = () => {

  const [timers, setTimers] = useState([
    // ["hamster", 3 * 60 * 60, "https://t.me/Hamster_kombat_bot/start?startapp=kentId1712026351"],
    ["blum", 8 * 60 * 60, "https://t.me/BlumCryptoBot/app?startapp=ref_u1zCViQjXi"],
    ["hot", 3 * 60 * 60, "https://t.me/herewalletbot/app?startapp=12750980"],
    ["iceberg", 6 * 60 * 60, "https://t.me/IcebergAppBot?start=referral_1712026351"],
    // ["pixelTap", 8 * 60 * 60, "https://t.me/pixelversexyzbot?start=1712026351"],
    ["tapSwap", 12 * 60 * 60, "https://t.me/tapswap_mirror_bot?start=r_1712026351"],
    ["yesCoin", 12 * 60 * 60, "https://t.me/theYescoin_bot/Yescoin?startapp=GAw08x"],
    // ["memeFi", 3 * 60 * 60, "https://t.me/memefi_coin_bot?start=r_2642b444e7"],
    ["tonStation", 8 * 60 * 60, "https://t.me/tonstationgames_bot/app?startapp=ref_6kbaljw8tzkfmivuyrxm2i"],
    ["w-coin", 8 * 60 * 60, "https://t.me/wcoin_tapbot/wcoin_app?startapp=MTcxMjAyNjM1MQ=="],
    ["dormint", 8 * 60 * 60, "https://t.me/dormint_bot/dormint_bot?startapp=ref_R3X2Z6UGB7XXEC3GAAC6"],
    ["coub", 24 * 60 * 60, "https://t.me/coub/app?startapp=coub__marker_19420027"],
    ["cats", 24 * 60 * 60, "https://t.me/catsgang_bot/join?startapp=xCETv3LVPWjXU_gGrIqX9"]
  ])
  const [working, setWorking] = useState({});
  const [currentTime, setCurrentTime] = useState(Date.now());
  function sort_timers(a, b) {

    // const aInDict = getTimerId(a[0]) in working;
    // const bInDict = getTimerId(b[0]) in working;
    const aInDict = localStorage.getItem(getTimerId(a[0]))
    const bInDict = localStorage.getItem(getTimerId(b[0]))

    if (aInDict && !bInDict) {
      return 1; // a идет перед b
    }
    if (!aInDict && bInDict) {
      return -1; // b идет перед a
    }
    return 0; // a и b остаются на месте относительно друг друга

  }

  useEffect(() => {
    const localTimers = [];
    timers.forEach((timer) => {
      const timerId = getTimerId(timer[0]);
      if (localStorage.getItem(timerId)) {
        localTimers.push({ timerId: 1 });
      }
    });
    const sortedTimers = timers.sort(sort_timers);
    setWorking(localTimers);
  }, []);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());

    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);


  return (
    <>
      {/* <Header /> */}
      <div id="cont" className='timer-container'>
        {timers.sort(sort_timers).map(([name, time, link]) => (
          <Timer
            title={getTimerName(name)}
            imgSrc={getTimerImg(name)}
            initialDuration={time}
            timerId={getTimerId(name)}
            link={link}
            working={working}
            setWorkingState={setWorking}
            key={getTimerId(name)}
            className="timer-item"
            currentTime={currentTime}
          />
        ))}
      </div>
    </>

  );
};

export default TimersPage;
