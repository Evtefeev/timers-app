"use client"
import '@/app/globals.css'; // Assuming the styles are moved to App.css
import TimersPage from '@/components/Tokens';
import ReactGA from "react-ga4";

const TRACKING_ID = "G-XXXXXXXXX";

const App = () => {
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID);
    // Send pageview with a custom path
    ReactGA.send({ hitType: "pageview", page: "/", title: "Timers Page" });
  }, [])
  return (
    <>
      <TimersPage />
    </>
  );

};

export default App;
