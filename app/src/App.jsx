import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChoosingDocuments from "./pages/ChoosingDocuments";
import ChoosingPrinters from "./pages/ChoosingPrinters";
import DefiningPrintingProps from "./pages/DefiningPrintingProps";
import BuyPrintingPages from "./pages/BuyPrintingPages";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChoosingDocuments />} />
        <Route path="/choosing-printers" element={<ChoosingPrinters />} />
        <Route path="/defining-printing-props" element={<DefiningPrintingProps />} />
        <Route path="/buy-printing-pages" element={<BuyPrintingPages />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/user-info" element={<ProfileDetails />} />
        
      </Routes>
    </Router>
  );
};

export default App;
