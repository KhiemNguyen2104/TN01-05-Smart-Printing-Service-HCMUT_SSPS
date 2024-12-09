import * as React from "react";

const Pagination = ({currentPage, totalPages, onPageChange}) => {
    const handlePrevious = () => {
      if (currentPage > 1) {
        onPageChange(currentPage - 1);
      }
    };
  
    const handleNext = () => {
      if (currentPage < totalPages) {
        onPageChange(currentPage + 1);
      }
    };
  
    const renderPageNumbers = () => {
      const pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            key={i}
            aria-current={i === currentPage ? "page" : undefined}
            className={`px-3 py-2 rounded-lg ${
              i === currentPage
                ? "bg-zinc-800 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        );
      }
      return pages;
    };
  
    return (
      <nav
        className="flex gap-4 items-center justify-center mt-5"
        aria-label="Pagination"
      >
        {/* Previous Button */}
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === 1
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={handlePrevious}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          Trước
        </button>
  
        {/* Page Numbers */}
        <div className="flex gap-2">{renderPageNumbers()}</div>
  
        {/* Next Button */}
        <button
          className={`px-4 py-2 rounded-lg text-sm font-medium ${
            currentPage === totalPages
              ? "text-gray-400 cursor-not-allowed"
              : "text-blue-600 hover:bg-blue-100"
          }`}
          onClick={handleNext}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Tiếp
        </button>
      </nav>
    );
}

export default Pagination