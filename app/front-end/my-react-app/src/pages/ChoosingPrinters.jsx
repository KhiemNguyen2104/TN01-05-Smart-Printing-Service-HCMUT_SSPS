import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import PrinterList from "../components/PrinterList";
import BackButton from "../components/BackButton";
import SearchBar from "../components/PrinterSearchBar";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const ChoosingPrinters = () => {
  const navigate = useNavigate();
  const [printers, setPrinters] = useState([]);
  const [filteredPrinters, setFilteredPrinters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const printersPerPage = 4;

  const initialPrintersRef = useRef([]);

  const handlePrinterClick = (printerID) => {
    navigate("/defining-printing-props");
  };

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

          const enabledPrinters = result.filter((printer) => printer.is_enable);

          const printersData = enabledPrinters.map((printer) => ({
            printer_id: printer.printer_id,
            printer_name: `Máy in ${printer.manufacturer} tòa ${printer.location}`,
            image:
              "https://cdn.builder.io/api/v1/image/assets/TEMP/18e7b06f3ad085012d6a3327cb69d5d5658fdd3fc724b4c28a1ba436440fc5aa?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
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
    <div className="flex flex-col pb-12 bg-white overflow-hidden">
      <Header />
      <main className="flex flex-col px-14 mt-9 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
          <h1 className="my-2 text-3xl sm:text-3xl text-black font-semibold">
            Hệ thống in{" "}
            <span className="text-xs sm:text-sm text-neutral-400">
              CHỌN MÁY IN
            </span>
          </h1>
        </div>

        <div className="flex flex-col items-center pt-5 pb-9 mt-8 w-full bg-white rounded-2xl shadow-md shadow-[rgba(0,0,0,0.1)] border border-solid border-neutral-300">
          <SearchBar onSearch={handleSearch} onSort={handleSort} />
          <div className="shrink-0 self-stretch mt-5 h-px bg-neutral-400" />
          {loading ? (
            <p>Loading printers...</p>
          ) : (
            <div className="printer-list mt-5 w-full px-5">
              <PrinterList
                printers={currentPrinters}
                onPrinterClick={handlePrinterClick}
              />
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />

        <div className="flex justify-between mt-16 max-md:mt-10">
          <BackButton onClick={() => window.history.back()} />
        </div>
      </main>
    </div>
  );
};

export default ChoosingPrinters;