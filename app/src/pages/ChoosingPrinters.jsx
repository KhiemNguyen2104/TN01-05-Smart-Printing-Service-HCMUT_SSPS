import React from "react";
import Header from "../components/Header";
import PrinterList from "../components/PrinterList";
import BackButton from "../components/BackButton";
import SearchBar from "../components/PrinterSearchBar";
import Pagination from "../components/Pagination"; // Import Pagination component

const ChoosingPrinters = () => {
  const printerList = [
    {
      id: 1,
      name: "Printer Canon B4",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/a273f60d8a05d1181a7f8432d83b936037fe0cae3a7ea605190444617d25da7f?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
    },
    {
      id: 2,
      name: "Máy in Canon tòa A2",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/18e7b06f3ad085012d6a3327cb69d5d5658fdd3fc724b4c28a1ba436440fc5aa?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
    },
    {
      id: 3,
      name: "Máy in Canon tòa C4",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a49d7f9efce41e7b2fc7866fb8eb3f065b79829d566e4a2d2ace37811f44f1a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
    },
    {
      id: 4,
      name: "Máy in Canon tòa H1",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a49d7f9efce41e7b2fc7866fb8eb3f065b79829d566e4a2d2ace37811f44f1a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
    },
    {
      id: 5,
      name: "Máy in Canon tòa H2",
      image: "https://cdn.builder.io/api/v1/image/assets/TEMP/0a49d7f9efce41e7b2fc7866fb8eb3f065b79829d566e4a2d2ace37811f44f1a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
    }
  ];

  const [printers, setPrinters] = React.useState(printerList);
  const [currentPage, setCurrentPage] = React.useState(1);
  const printersPerPage = 4;
  const totalPages = Math.ceil(printerList.length / printersPerPage);

  const handleSearch = (searchTerm) => {
    const filteredPrinters = printerList.filter((printer) =>
      printer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPrinters(filteredPrinters);
  };

  const handleSort = () => {
    const sortedPrinters = [...printers].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setPrinters(sortedPrinters);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const indexOfFirstPrinter = (currentPage - 1) * printersPerPage;
  const currentPrinters = printers.slice(
    indexOfFirstPrinter,
    indexOfFirstPrinter + printersPerPage
  );

  return (
    <div className="flex flex-col pb-12 bg-white overflow-hidden">
      {/* Header */}
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

        {/* Search Bar and Printer List */}
        <div className="flex flex-col items-center pt-5 pb-9 mt-8 w-full bg-white rounded-2xl shadow-md shadow-[rgba(0,0,0,0.1)] border border-solid border-neutral-300">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} onSort={handleSort} />

          {/* Divider */}
          <div className="shrink-0 self-stretch mt-5 h-px bg-neutral-400" />

          {/* Printer List */}
          <div className="printer-list mt-5 w-full px-5">
            <PrinterList printers={currentPrinters} />
          </div>
        </div>
        
        {/* Pagination */}
        <div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-16 max-md:mt-10">
          <BackButton onClick={() => window.history.back()} />
        </div>
      </main>
    </div>
  );
};

export default ChoosingPrinters;
