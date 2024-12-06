// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from ".//components/Header";
// import PrintPage from "./PrintingPage";  // Trang in
// import PrintPreviewPage from "./BuyingPage";  // Trang xem trước in
import PrintingHistory from "./pages/PrintingHistory"; // Trang lịch sử
import Home from "./pages/Home";         // Import Home Page

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/pages" element={<PrintingPage />} /> */}
        <Route path="/history" element={<PrintingHistory />} />
        {/* <Route path="/pages" element={<BuyingPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
