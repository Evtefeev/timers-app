"use client"


import React, { useEffect, useState } from 'react';
import { Timer, getTimerName, getTimerImg, getTimerId } from "@/app/Timer";
import Header from './Header';

const TimersPage = () => {

  const timers = [
    ["hamster", 3 * 60 * 60, "https://t.me/Hamster_kombat_bot/start?startapp=kentId1712026351"],
    ["blum", 8 * 60 * 60, "https://t.me/BlumCryptoBot/app?startapp=ref_u1zCViQjXi"],
    ["hot", 2 * 60 * 60, "https://t.me/herewalletbot/app?startapp=12750980"],
    ["iceberg", 6 * 60 * 60, "https://t.me/IcebergAppBot?start=referral_1712026351"],
    ["pixelTap", 8 * 60 * 60, "https://t.me/pixelversexyzbot?start=1712026351"],
    ["tapSwap", 12 * 60 * 60, "https://t.me/tapswap_mirror_bot?start=r_1712026351"],
    ["yesCoin", 12 * 60 * 60, "https://t.me/theYescoin_bot/Yescoin?startapp=GAw08x"],
    ["memeFi", 2 * 60 * 60, "https://t.me/memefi_coin_bot?start=r_2642b444e7"],
    ["tonStation", 8 * 60 * 60, "https://t.me/tonstationgames_bot/app?startapp=ref_6kbaljw8tzkfmivuyrxm2i"],
  ]

  return (
    <>
      {/* <Header /> */}
      <div id="cont" className='timer-container'>
        {timers.map(([name, time, link]) => (
          <Timer
            title={getTimerName(name)}
            imgSrc={getTimerImg(name)}
            initialDuration={time}
            timerId={getTimerId(name)}
            link={link}
            key={getTimerId(name)}
            className="timer-item"
          />
        ))}
      </div>
    </>

  );
};

export default TimersPage;
