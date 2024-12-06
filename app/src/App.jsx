import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ChoosingDocuments from "./pages/ChoosingDocuments";
import ChoosingPrinters from "./pages/ChoosingPrinters";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChoosingDocuments />} />
        <Route path="/choosing-printers" element={<ChoosingPrinters />} />
      </Routes>
    </Router>
  );
};

export default App;
