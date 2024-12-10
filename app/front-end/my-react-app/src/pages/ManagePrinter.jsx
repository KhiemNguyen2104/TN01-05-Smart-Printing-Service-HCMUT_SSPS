import React, { useState, useEffect, useRef } from "react";
import PrinterList from "../components/ManagePrinterList";
import BackButton from "../components/BackButton";
import SearchBar from "../components/PrinterSearchBar";
import Pagination from "../components/Pagination"; // Import Pagination component
import Navbar from "../components/NarbarSystem";
import HeaderAdmin from "../components/HeaderAdmin";
import { useNavigate } from "react-router-dom";

const ManagePrinter = () => {
    const navigate = useNavigate();
    const [printers, setPrinters] = useState([]);
    const [filteredPrinters, setFilteredPrinters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const printersPerPage = 4;

    const initialPrintersRef = useRef([]);

    useEffect(() => {
      const fetchPrinters = async () => {
        try {
          setLoading(true);
          const url = "http://localhost:3001/printer/all";
          const response = await fetch(url, {
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
                "https://cdn.builder.io/api/v1/image/assets/TEMP/18e7b06f3ad085012d6a3327cb69d5d5658fdd3fc724b4c28a1ba436440fc5aa?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
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
  
      fetchPrinters();
    }, []);
  
    // Toggle handler
    const togglePrinterState = (id) => {
      setPrinters((prevPrinters) =>
        prevPrinters.map((printer) =>
          printer.printer_id === id
            ? { ...printer, is_enable: !printer.is_enable}
            : printer
        )
      );
    };
  
    const handleSearch = (searchTerm) => {
      const filtered = initialPrintersRef.current.filter((printer) =>
        printer.printer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPrinters(filtered);
      setTotalPages(Math.ceil(filtered.length / printersPerPage));
      setCurrentPage(1); // Reset to first page after search
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
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
  
    const indexOfFirstPrinter = (currentPage - 1) * printersPerPage;
    const currentPrinters = filteredPrinters.slice(
      indexOfFirstPrinter,
      indexOfFirstPrinter + printersPerPage
    );
  
    return (
      <div className="max-md:px-5 max-md:max-w-full w-full mx-auto">
        {/* Header */}
        <HeaderAdmin />
        <Navbar />
        <main className="flex flex-col px-14 mt-9 w-full max-md:px-5 max-md:max-w-full">
          {/* Search Bar and Printer List */}
          <div className="flex flex-col items-center pt-5 pb-9 mt-8 w-full bg-white rounded-2xl shadow-md shadow-[rgba(0,0,0,0.1)] border border-solid border-neutral-300">
            <SearchBar onSearch={handleSearch} onSort={handleSort} />
            <div className="shrink-0 self-stretch mt-5 h-px bg-neutral-400" />
            {loading ? (
              <p>Loading printers...</p>
            ) : (
              <div className="printer-list mt-5 w-full px-5">
                <PrinterList
                  printers={currentPrinters}
                  onToggle={togglePrinterState}
                />
              </div>
            )}
          </div>
  
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
  
          {/* Navigation Buttons */}
          <div className="flex justify-between px-5 mt-16 mb-4 max-md:mt-10">
            <BackButton onClick={() => window.history.back()} />
          </div>
        </main>
      </div>
    );
};
  
export default ManagePrinter;  