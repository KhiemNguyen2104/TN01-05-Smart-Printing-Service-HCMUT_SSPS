import React, { useState, useEffect, useRef } from "react";
import PrinterList from "../components/ManagePrinterList";
import BackButton from "../components/BackButton";
import SearchBar from "../components/PrinterSearchBar";
import Pagination from "../components/Pagination";
import Navbar from "../components/NarbarSystem";
import HeaderAdmin from "../components/HeaderAdmin";
// import { useNavigate } from "react-router-dom";

const ManagePrinter = () => {
  // const navigate = useNavigate();
  const [printers, setPrinters] = useState([]);
  const [filteredPrinters, setFilteredPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const printersPerPage = 4;
  const initialPrintersRef = useRef([]);

  const fetchPrinters = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3001/printer/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (response.ok) {
        const result = await response.json();
        const printersData = result.map((printer) => ({
          printer_id: printer.printer_id,
          printer_name: `Máy in ${printer.manufacturer} tòa ${printer.location}`,
          image:
            "https://cdn.builder.io/api/v1/image/assets/TEMP/18e7b06f3ad085012d6a3327cb69d5d5658fdd3fc724b4c28a1ba436440fc5aa",
          is_enable: printer.is_enable,
        }));
        initialPrintersRef.current = printersData;
        setPrinters(printersData);
        setFilteredPrinters(printersData);
        setTotalPages(Math.ceil(printersData.length / printersPerPage));
      } else {
        console.error("Failed to fetch printers:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching printers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrinters();
  }, []);

  const togglePrinterState = async (id) => {
    const targetPrinter = printers.find((printer) => printer.printer_id === id);
    if (!targetPrinter) {
      console.error(`Printer with ID ${id} not found.`);
      return;
    }

    const url = `http://localhost:3001/printer/${targetPrinter.is_enable ? "disables" : "enables"}/${id}`;
    try {
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      fetchPrinters(); // Fetch printers again to update state
    } catch (error) {
      console.error("Error toggling printer state:", error);
      alert("Không thể thay đổi trạng thái máy in. Vui lòng thử lại.");
    }
  };

  const handleSearch = (searchTerm) => {
    const filtered = initialPrintersRef.current.filter((printer) =>
      printer.printer_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPrinters(filtered);
    setTotalPages(Math.ceil(filtered.length / printersPerPage));
    setCurrentPage(1);
  };

  const handleSort = (criteria) => {
    const sorted = [...initialPrintersRef.current].sort((a, b) => {
      if (criteria === "name") {
        return a.printer_name.localeCompare(b.printer_name);
      }
      else if (criteria === "location") {
        const dataA = a.printer_name.split(" ").pop();
        const dataB = b.printer_name.split(" ").pop();
        return dataA.localeCompare(dataB);
      }
      else if (criteria === "type") {
        const typeA = a.printer_name.split(" ")[2];
        const typeB = b.printer_name.split(" ")[2];
        return typeA.localeCompare(typeB); // Example "abc.doc" and "xyz.ppt" we will compare "doc" and "ppt"
      }
      else {
        return 0; // Default case if no valid criteria is provided
      }
    });

    setFilteredPrinters(sorted);

    console.log(filteredPrinters);
  };

  const indexOfFirstPrinter = (currentPage - 1) * printersPerPage;
  const currentPrinters = filteredPrinters.slice(
    indexOfFirstPrinter,
    indexOfFirstPrinter + printersPerPage
  );

  return (
    <div className="max-md:px-5 max-md:max-w-full w-full mx-auto">
      <HeaderAdmin />
      <Navbar />
      <main className="flex flex-col px-14 mt-9 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-col items-center pt-5 pb-9 mt-8 w-full bg-white rounded-2xl shadow-md shadow-[rgba(0,0,0,0.1)] border border-solid border-neutral-300">
          <SearchBar onSearch={handleSearch} onSort={handleSearch}/>
          <div className="shrink-0 self-stretch mt-5 h-px bg-neutral-400" />
          {loading ? (
            <p>Loading printers...</p>
          ) : (
            <div className="printer-list mt-5 w-full px-5">
              <PrinterList printers={currentPrinters} onToggle={togglePrinterState} />
            </div>
          )}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        <div className="flex justify-between px-5 mt-16 mb-4 max-md:mt-10">
          <BackButton onClick={() => window.history.back()} />
        </div>
      </main>
    </div>
  );
};

export default ManagePrinter;