import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChoosingDocuments from "./pages/ChoosingDocuments";
import ChoosingPrinters from "./pages/ChoosingPrinters";
import PrintingHistory from "./pages/PrintingHistory";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfileTransactions from "./pages/ProfileTransactions";
import ProfileCart from "./pages/ProfileCart"
import Home from "./pages/Home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/choosing-documents" element={<ChoosingDocuments />} />
        <Route path="/choosing-printers" element={<ChoosingPrinters />} />
        <Route path="/printing-history" element={<PrintingHistory />} />
        <Route path="/profile/transactions" element={<ProfileTransactions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/user-info" element={<ProfileDetails />} />
        <Route path="/profile/cart" element={<ProfileCart />} />
      </Routes>
    </Router>
  );
};

export default App;
