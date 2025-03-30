"use client";

import React, { useEffect, useState } from 'react';
import { Timer, getTimerName, getTimerImg, getTimerId } from "@/app/Timer";
import Header from './Header';
import { init, openTelegramLink } from '@telegram-apps/sdk';

try {
  init();
} catch (error) {

}


const TimersPage = () => {
const [timers, setTimers] = useState(
  [
["evoSim", 24 * 60 * 60, "https://t.me/evosimgame_bot?start=01E6HH"],
["moonbix", 24 * 60 * 60, "https://t.me/Binance_Moonbix_bot/start?startapp=ref_1712026351&startApp=ref_1712026351"],
["timeFarm", 4 * 60 * 60, "https://t.me/TimeFarmCryptoBot?start=uwrKQKgw9aZyOVxn"],
["mouse", 24 * 60 * 60, "https://t.me/mousehous_bot/mouseapp?startapp=ref_1712026351"],
    ["cats", 24 * 60 * 60, "https://t.me/catsgang_bot/join?startapp=xCETv3LVPWjXU_gGrIqX9"],
    ["coub", 24 * 60 * 60, "https://t.me/coub/app?startapp=coub__marker_19420027"],
    ["dormint", 8 * 60 * 60, "https://t.me/dormint_bot/dormint_bot?startapp=ref_R3X2Z6UGB7XXEC3GAAC6"],
    ["w-coin", 8 * 60 * 60, "https://t.me/wcoin_tapbot/wcoin_app?startapp=MTcxMjAyNjM1MQ=="],
    ["tonStation", 8 * 60 * 60, "https://t.me/tonstationgames_bot/app?startapp=ref_6kbaljw8tzkfmivuyrxm2i"],
    // ["memeFi", 3 * 60 * 60, "https://t.me/memefi_coin_bot?start=r_2642b444e7"],
    ["yesCoin", 12 * 60 * 60, "https://t.me/theYescoin_bot/Yescoin?startapp=GAw08x"],
    //["tapSwap", 12 * 60 * 60, "https://t.me/tapswap_mirror_bot?start=r_1712026351"],
    // ["pixelTap", 8 * 60 * 60, "https://t.me/pixelversexyzbot?start=1712026351"],
    ["iceberg", 6 * 60 * 60, "https://t.me/IcebergAppBot?start=referral_1712026351"],
    ["hot", 4 * 60 * 60, "https://t.me/herewalletbot/app?startapp=12750980"],
    ["blum", 8 * 60 * 60, "https://t.me/BlumCryptoBot/app?startapp=ref_u1zCViQjXi"],
   // ["hamster", 3 * 60 * 60, "https://t.me/Hamster_kombat_bot/start?startapp=kentId1712026351"],
//["cats", 24 * 60 * 60, ""],
    // ["test", 15, "#"],
    // ["test2", 20, "#"],
    // ["test3", 25, "#"],
    // ["test4", 30, "#"],
    // ["test5", 35, "#"],
    // ["test6", 40, "#"],
    // ["test7", 45, "#"],
    // ["test8", 50, "#"],
    // ["test9", 55, "#"],
    // ["test10", 60, "#"],
    // ["test11", 65, "#"],

  ]);
  const [working, setWorking] = useState({});
  const [currentTime, setCurrentTime] = useState(Date.now());


  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])




  function sort_timers(a, b) {

    // const aInDict = getTimerId(a[0]) in working;
    // const bInDict = getTimerId(b[0]) in working;
    if (typeof window !== 'undefined') {
      const el1 = localStorage.getItem(getTimerId(a[0]))
      const el2 = localStorage.getItem(getTimerId(b[0]))

      if (el1 && !el2) {
        return 1; // a идет перед b
      }
      if (!el1 && el2) {
        return -1; // b идет перед a
      }
    }
    return 0; // a и b остаются на месте относительно друг друга

  }

  useEffect(() => {
    const localTimers = {};
    timers.forEach((timer) => {
      const timerId = getTimerId(timer[0]);
      const time = new Date(localStorage.getItem(timerId));
      const time_end = new Date(time.getTime() + (1000 * timer[1]));
      const now = new Date();
      if (time == null) {
        localTimers[timerId] = 0;
      }
      if (time_end > now) {
        localTimers[timerId] = 1;
      } else {
        localTimers[timerId] = 0;
        localStorage.removeItem(timerId);
      }
    });
    const sortedTimers = timers.sort(sort_timers);
    setTimers(sortedTimers)
    setWorking(localTimers);
    // console.log(localTimers);

  }, []);


  function stopAll() {
    const localTimers = {};
    timers.forEach((timer) => {
      const timerId = getTimerId(timer[0]);
      localStorage.removeItem(timerId);
      setWorking({});
    });
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);

  if (isClient) {

    return (
      <>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
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
                openTelegramLink={openTelegramLink}
              />
            ))}
          </div>
          <div style={{ marginBottom: "34px", textAlign: "center" }}>
            <button onClick={stopAll}>Stop all</button>
          </div>
        </div>
      </>

    );
  }
  else {
    return "Loading...";
  }

};

export default TimersPage;
