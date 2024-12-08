// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HeaderAdmin from ".//components/HeaderAdmin";
// import PrintPage from "./PrintingPage";  // Trang in
// import PrintPreviewPage from "./BuyingPage";  // Trang xem trước in
// import PrintingHistory from "./pages/PrintingHistory"; // Trang lịch sử
import DefautPageSet from "./pages/DefautPageSet"; // Trang cài đặt mặc định
import HomeAdmin from "./pages/HomeAdmin";         // Import Home Page
import FileListPrinciples from "./pages/FileListPrinciples";
import ManagePrinter from "./pages/ManagePrinter";
import  Login  from "./pages/Login";
// import System from "./pages/System";               // Import System Page

const App = () => {
  return (
    <Router>
      {/* <Login/> */}
      <HeaderAdmin />
      <Routes>
        {/* Route cho trang chủ */}
          <Route path="/" element={<HomeAdmin />} />
          <Route path="/principle" element={<FileListPrinciples />} />
          <Route path="/manage" element={<ManagePrinter />} />
          <Route path="/default" element={<DefautPageSet />} />
      </Routes>
    </Router>
  );
};

export default App;
