import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import WebFont from "webfontloader";
// @ts-ignore
import Header from "./components/header/Header.tsx";
// @ts-ignore
import Advertisement from "./components/advertisement/Advertisement.tsx";
// @ts-ignore
import Footer from "./components/footer/Footer.tsx";
// @ts-ignore
import Landingpage from "./pages/Landingpage.js";

WebFont.load({ google: { families: ["Roboto:300,400,500"] } });




function App() {
  return (
    <div className="App">
      <Header />
      <Advertisement />
      <Routes>
        <Route path="/" element={<Landingpage />} />
        <Route
          path="/om_oss"
          element={
            <div>
              <p> Fysi for alle!</p>{" "}
            </div>
          }
        />
      </Routes>
      <Advertisement />
      <Footer />
    </div>

  );
}

export default App;
