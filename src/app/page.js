"use client"
import '@/app/globals.css'; // Assuming the styles are moved to App.css
import TimersPage from '@/components/Tokens';
import ReactGA from "react-ga4";
import { useEffect } from 'react';

const TRACKING_ID = "G-PCYEZBYF9D";

const App = () => {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
  }, [])
  return (
    <>
      <TimersPage />
    </>
  );

};

export default App;
