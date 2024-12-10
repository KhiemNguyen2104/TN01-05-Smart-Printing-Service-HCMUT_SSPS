import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChoosingDocuments from "./pages/ChoosingDocuments";
import ChoosingPrinters from "./pages/ChoosingPrinters";
import PrintingHistory from "./pages/PrintingHistory";
import Profile from "./pages/Profile";
import ProfileDetails from "./pages/ProfileDetails";
import ProfilePrints from "./pages/ProfilePrints";
import ProfileTransactions from "./pages/ProfileTransactions";
import ProfileCart from "./pages/ProfileCart"
import Home from "./pages/Home";
import BuyPrintingPages from "./pages/BuyPrintingPages";
import DefiningPrintingProps from "./pages/DefiningPrintingProps";
import DefautPageSet from "./pages/DefautPageSet"; // Trang cài đặt mặc định
import HomeAdmin from "./pages/HomeAdmin";
import FileListPrinciples from "./pages/FileListPrinciples";
import ManagePrinter from "./pages/ManagePrinter";
import Login from "./pages/Login";
import ManagePrintingHistory from "./pages/ManagePrintingHistory";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/admin" element={<HomeAdmin />} />
        <Route path="/principle" element={<FileListPrinciples />} />
        <Route path="/manage" element={<ManagePrinter />} />
        <Route path="/manage-printing-history" element={<ManagePrintingHistory />} />
        <Route path="/default" element={<DefautPageSet />} />
        <Route path="/choosing-documents" element={<ChoosingDocuments />} />
        <Route path="/choosing-printers" element={<ChoosingPrinters />} />
        <Route path="/buy-printing-pages" element={<BuyPrintingPages />} />
        <Route path="/defining-printing-props" element={<DefiningPrintingProps />} />
        <Route path="/printing-history" element={<PrintingHistory />} />
        <Route path="/profile/transactions" element={<ProfileTransactions />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/user-info" element={<ProfileDetails />} />
        <Route path="/profile/print-pages" element={<ProfilePrints />} />
        <Route path="/profile/cart" element={<ProfileCart />} />
      </Routes>
    </Router>
  );
};

export default App;
