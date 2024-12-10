import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { getDocument, GlobalWorkerOptions, version } from "pdfjs-dist";  // Import pdfjs from the legacy path
import { useNavigate } from "react-router-dom";
// import { pdfjs } from "pdfjs-dist";

GlobalWorkerOptions.workerSrc = "../pdf.worker.min.js";

const DefiningPrintingProps = () => {
  const navigate = useNavigate(); // Hook điều hướng

  // Existing state for print settings
  const [orientation, setOrientation] = useState("portrait");
  const [printOption, setPrintOption] = useState("all");
  const [pagesPerSheet, setPagesPerSheet] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  // File handling state
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [pdfDoc, setPdfDoc] = useState(null); // State to store PDF document
  const [pageNumber, setPageNumber] = useState(1);

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

  useEffect(() => {
    if (file && fileType === "application/pdf") {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const typedarray = new Uint8Array(this.result);
        getDocument(typedarray).promise.then(setPdfDoc);
      };
      fileReader.readAsArrayBuffer(file);
    }
  }, [file]);

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

    if (fileType === "application/pdf") {
      return (
        <div className="h-full w-full">
          <canvas id="pdf-canvas" />
        </div>
      );
    }

    if (fileType === "text/plain") {
      return (
        <div className="h-full w-full">
          <iframe 
            src={fileUrl}
            className="w-full h-full"
            title="Text Preview"
          />
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-500">
          File type not supported for preview. Please use PDF or TXT files.
        </p>
      </div>
    );
  };

  const renderPage = () => {
    if (pdfDoc) {
      pdfDoc.getPage(pageNumber).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport({ scale });

        const canvas = document.getElementById("pdf-canvas");
        const context = canvas.getContext("2d");
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        page.render({
          canvasContext: context,
          viewport: viewport,
        });
      });
    }
  };

  useEffect(() => {
    renderPage();
  }, [pdfDoc, pageNumber]);

  const handleNextButtonClick = async () => {
    const studentId = JSON.parse(localStorage.getItem("currentUser")).user_id;
    const printerId = 'printerId'; // Replace this with actual printer ID logic
    const fileName = localStorage.getItem("printFile");
    const noOfCopies = document.querySelector('input[type="number"]').value; // Assuming this is the input for copies
    const doubleSided = document.querySelector('input[type="checkbox"]').checked; // Assuming this is the checkbox for double-sided
    const direction = orientation; // Portrait or Landscape
    const pageType = pagesPerSheet; // A2, A3, A4, A5, Letter
    const pages = getPagesToDisplay().join(","); // Page range: 1-10, 12, 20-21

    // Construct the body for the POST request
    const requestBody = {
      student_id: studentId,
      printer_id: printerId,
      file_name: fileName,
      no_of_copies: noOfCopies,
      double_sided: doubleSided.toString(),
      direction: direction,
      page_type: pageType,
      pages: pages
    };

    // Make the HTTP request to store the print job
    try {
      const response = await fetch("http://localhost:3001/printer/prints", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Proceed to the next page
        navigate("/buy-printing-pages");
      } else {
        // Handle error
        console.error("Error storing the print job:", await response.text());
      }
    } catch (error) {
      console.error("Error during fetch:", error);
    }
  };

  useEffect(() => {
    if (!file) {
      const fetchFileForPreview = async () => {
        const studentId = JSON.parse(localStorage.getItem("currentUser")).user_id;
        const fileName = localStorage.getItem("printFile");
        const fileUrl = `http://localhost:3001/file/print?file_name=${fileName}&student_id=${studentId}`;

        try {
          const response = await fetch(fileUrl, {
            method: 'GET',
            headers: {
              "Content-Type":	"application/pdf",
              Authorization: "Bearer " + localStorage.getItem('token'),
            }
          });
          const fileBlob = await response.blob();

          console.log("URL: ", fileUrl);

          if (response.ok) {
            const fileObjectUrl = URL.createObjectURL(fileBlob);
            setFileUrl(fileObjectUrl);

            // Fetch the number of pages from the file
            const totalPages = await getNumberOfPages(fileBlob); // You need a function to calculate the number of pages based on the file type
            setTotalPages(totalPages);
          } else {
            console.error("Failed to fetch file:", await response.text());
          }
        } catch (error) {
          console.error("Error fetching file:", error);
        }
      };

      fetchFileForPreview();
    }
  }, [file]);

  const getNumberOfPages = (fileBlob) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = function () {
        const pdfData = new Uint8Array(this.result);
        getDocument(pdfData).promise
          .then((pdfDoc) => {
            resolve(pdfDoc.numPages); // Get number of pages
          })
          .catch(reject); // Reject if error occurs
      };
      fileReader.onerror = reject;
      fileReader.readAsArrayBuffer(fileBlob);
    });
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
            <label className="block font-medium mb-2 text-lg">Số bản in</label>
            <input
              type="number"
              min="1"
              className="w-full p-2 bg-white text-black border"
            />
          </div>

          {/* Lật 2 mặt */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5"
              id="doubleSided"
            />
            <label htmlFor="doubleSided" className="ml-2 text-lg">
              Lật 2 mặt
            </label>
          </div>

          <NextButton onClick={handleNextButtonClick} />
        </aside>
        <section className="w-4/5 p-6">{renderPreview()}</section>
      </main>
    </div>
  );
};

export default DefiningPrintingProps;
