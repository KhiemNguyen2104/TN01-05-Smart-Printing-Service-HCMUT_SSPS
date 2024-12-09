import React from "react";
import PrinterList from "../components/ManagePrinterList";
import BackButton from "../components/BackButton";
import SearchBar from "../components/PrinterSearchBar";
import Pagination from "../components/Pagination"; // Import Pagination component
import Navbar from "../components/NarbarSystem";
import HeaderAdmin from "../components/HeaderAdmin";

const ManagePrinter = () => {
    const printerList = [
      {
        id: 1,
        name: "Printer Canon B4",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/a273f60d8a05d1181a7f8432d83b936037fe0cae3a7ea605190444617d25da7f?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
        state: "on",
      },
      {
        id: 2,
        name: "Máy in Canon tòa A2",
        image:
          "https://cdn.builder.io/api/v1/image/assets/TEMP/18e7b06f3ad085012d6a3327cb69d5d5658fdd3fc724b4c28a1ba436440fc5aa?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
        state: "off",
      },
      {
        id: 3,
        name: "Máy in Canon tòa C4",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a49d7f9efce41e7b2fc7866fb8eb3f065b79829d566e4a2d2ace37811f44f1a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
        state: "off",
      },
      {
        id: 4,
        name: "Printer Canon C5",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a49d7f9efce41e7b2fc7866fb8eb3f065b79829d566e4a2d2ace37811f44f1a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
        state: "on",
      },
      {
        id: 5,
        name: "Máy in Canon tòa H1",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a49d7f9efce41e7b2fc7866fb8eb3f065b79829d566e4a2d2ace37811f44f1a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
        state: "on",
      },
      {
        id: 6,
        name: "Máy in Canon tòa H3",
        image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a49d7f9efce41e7b2fc7866fb8eb3f065b79829d566e4a2d2ace37811f44f1a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
        state: "off",
      }
    ];
  
    const [printers, setPrinters] = React.useState(printerList);
    const [currentPage, setCurrentPage] = React.useState(1);
    const printersPerPage = 4;
    const totalPages = Math.ceil(printerList.length / printersPerPage);
  
    // Toggle handler
    const togglePrinterState = (id) => {
      setPrinters((prevPrinters) =>
        prevPrinters.map((printer) =>
          printer.id === id
            ? { ...printer, state: printer.state === "on" ? "off" : "on" }
            : printer
        )
      );
    };
  
    const indexOfFirstPrinter = (currentPage - 1) * printersPerPage;
    const currentPrinters = printers.slice(
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
            {/* Search Bar */}
            <SearchBar />
  
            {/* Divider */}
            <div className="shrink-0 self-stretch mt-5 h-px bg-neutral-400" />
  
            {/* Printer List */}
            <div className="printer-list mt-5 w-full px-5">
              <PrinterList
                printers={currentPrinters}
                onToggle={togglePrinterState}
              />
            </div>
          </div>
  
          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
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