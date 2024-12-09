import React, { useState } from "react";

const UploadButton = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState("");

  const handleUpload = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    if (option === "device") {
      document.getElementById("fileInput").click();
    } else if (option === "drive") {
      setShowUrlInput(true);
    }
    setShowOptions(false); // Đóng menu sau khi chọn
  };

  const handleUrlSubmit = () => {
    alert(`Google Drive URL: ${url}`);
    setShowUrlInput(false);
    setUrl(""); // Reset URL input
  };

  return (
    <div className="relative">
      <button
        onClick={handleUpload}
        className="flex gap-1 sm:gap-2 px-6 sm:px-6 py-3 sm:py-3 text-base sm:text-lg font-bold text-white bg-emerald-600 rounded-xl sm:rounded-xl shadow-sm hover:bg-blue-500 max-md:px-3"
        aria-label="Tải tài liệu lên"
      >
        <div className="my-auto">Tải lên</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4acfe8118af2572a8b0be4cd0670d5074b6391fe0ff7f9bdd744ac0eb6453dbe?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
          className="object-contain shrink-0 aspect-square w-[25px]"
          alt=""
        />
      </button>

      {/* Dropdown menu */}
      {showOptions && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <button
            onClick={() => handleOptionClick("device")}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
          >
            Từ thiết bị
          </button>
          <button
            onClick={() => handleOptionClick("drive")}
            className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-200"
          >
            Từ Google Drive
          </button>
        </div>
      )}

      {/* Hidden file input */}
      <input
        type="file"
        id="fileInput"
        className="hidden"
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        aria-label="Chọn tài liệu để tải lên"
      />

      {/* Google Drive URL Input */}
      {showUrlInput && (
        <div className="absolute right-0 mt-2 p-4 w-80 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <h3 className="mb-2 text-sm font-semibold">Nhập URL Google Drive</h3>
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Nhập URL"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-3 flex justify-end gap-2">
            <button
              onClick={() => setShowUrlInput(false)}
              className="px-4 py-2 text-sm text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Hủy
            </button>
            <button
              onClick={handleUrlSubmit}
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Xác nhận
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadButton;
