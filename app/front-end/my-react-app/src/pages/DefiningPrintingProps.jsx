import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

const DefiningPrintingProps = () => {
  const navigate = useNavigate(); // Hook điều hướng

  // Existing state for print settings
  const [orientation, setOrientation] = useState("portrait");
  const [printOption, setPrintOption] = useState("all");
  const [pagesPerSheet, setPagesPerSheet] = useState(1);
  const [totalPages] = useState(10);

  // File handling state
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  };

  useEffect(() => {
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileUrl]);

  const getPagesToDisplay = () => {
    let pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    if (printOption === "odd") pages = pages.filter((page) => page % 2 !== 0);
    if (printOption === "even") pages = pages.filter((page) => page % 2 === 0);
    return pages;
  };

  const renderPreview = () => {
    if (!file) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-gray-500 text-lg mb-4">Chọn file để xem trước</p>
          <label className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            Chọn File
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.txt,.doc,.docx"
              className="hidden"
            />
          </label>
        </div>
      );
    }

    switch (fileType) {
      case 'application/pdf':
        return (
          <div className="h-full w-full">
            <iframe 
              src={fileUrl}
              className="w-full h-full"
              title="PDF Preview"
            />
          </div>
        );
      case 'text/plain':
        return (
          <div className="h-full w-full">
            <iframe 
              src={fileUrl}
              className="w-full h-full"
              title="Text Preview"
            />
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              File type not supported for preview. Please use PDF or TXT files.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col bg-gray-100 h-screen overflow">
      <Header className="relative z-50" />
      <main className="flex h-full bg-gray-300 z-10">
        <aside className="w-1/5 bg-gray-800 p-6 shadow-lg text-white overflow-y-auto">
          {/* Cỡ giấy */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-lg">Cỡ giấy</label>
            <select className="w-full mt-1 p-2 bg-white text-black border">
              <option>A4</option>
              <option>A3</option>
              <option>A5</option>
            </select>
          </div>

          {/* Chiều giấy */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-lg">Chiều giấy</label>
            <div className="flex flex-col">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="orientation"
                  value="portrait"
                  checked={orientation === "portrait"}
                  onChange={() => setOrientation("portrait")}
                  className="appearance-none w-5 h-5 border border-white rounded-full checked:ring-2 checked:bg-white"
                />
                <span className="ml-2">Trang dọc</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="orientation"
                  value="landscape"
                  checked={orientation === "landscape"}
                  onChange={() => setOrientation("landscape")}
                  className="appearance-none w-5 h-5 border border-white rounded-full checked:ring-2 checked:bg-white"
                />
                <span className="ml-2">Trang ngang</span>
              </label>
            </div>
          </div>

          {/* Tùy chọn in */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-lg">Trang in</label>
            <div className="flex flex-col">
              {["all", "odd", "even"].map((option) => (
                <label key={option} className="inline-flex items-center mt-2">
                  <input
                    type="radio"
                    name="print-option"
                    value={option}
                    checked={printOption === option}
                    onChange={() => setPrintOption(option)}
                    className="appearance-none w-5 h-5 border border-white rounded-full checked:ring-2 checked:bg-white"
                  />
                  <span className="ml-2">
                    {option === "all"
                      ? "Tất cả"
                      : option === "odd"
                      ? "Chỉ trang lẻ"
                      : "Chỉ trang chẵn"}
                  </span>
                </label>
              ))}
            </div>
            <div className="mt-4">
              <input
                type="text"
                placeholder="e.g. 1-5, 8, 11-13"
                className="w-full p-2 bg-white text-black border"
              />
            </div>
          </div>

          {/* Số bản in */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Số bản in</label>
            <input
              type="number"
              min={1}
              max={10}
              className="w-full p-2 bg-white text-black border"
            />
          </div>

          {/* Số trang trên 1 tờ */}
          <div className="mb-4">
            <label className="block font-medium mb-2">Số trang trên 1 tờ</label>
            <select
              className="w-full mt-1 p-2 bg-white text-black border"
              value={pagesPerSheet}
              onChange={(e) => setPagesPerSheet(Number(e.target.value))}
            >
              {[1, 2, 4, 6, 9, 16].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          {/* In hai mặt */}
          <div>
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="appearance-none w-5 h-5 border border-white rounded-full checked:ring-2 checked:bg-white"
              />
              <span className="ml-2">In hai mặt</span>
            </label>
          </div>
        </aside>

        <section className="w-4/5 bg-gray-300 flex flex-col relative overflow-hidden">
          <div className="bg-white p-4 shadow-lg flex items-center">
            <h1 className="my-2 text-3xl sm:text-3xl text-black font-semibold">
              Hệ thống in{" "}
              <span className="text-xs sm:text-sm text-neutral-400">
                CHỈNH SỬA BẢN IN
              </span>
            </h1>
            <span className="ml-auto flex items-center">
              {file && (
                <span className="mr-2 text-sm text-gray-600">
                  {file.name}
                </span>
              )}
            </span>
          </div>

          <div className="flex-grow bg-gray-300 overflow-auto">
            {renderPreview()}
          </div>

          <div className="shadow-lg p-4 bg-white flex justify-between">
            <BackButton onClick={() => window.history.back()}/>
            <NextButton onClick={() => navigate("/buy-printing-pages")} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DefiningPrintingProps;