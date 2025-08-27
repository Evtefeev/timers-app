import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/next"




export const metadata = {
  title: "Tokens Timer",
  description: "Timer for collect tokens",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <div className="page">
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
