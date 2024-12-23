import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NextButton from "../components/NextButton";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

const DefiningPrintingProps = () => {
  useEffect(() => {
    // Ensure the workerSrc is set after the component mounts
    pdfjs.GlobalWorkerOptions.workerSrc = "https://unpkg.com/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";
    console.log(pdfjs.GlobalWorkerOptions.workerSrc); // Check if the URL is set correctly
  }, []);

  const navigate = useNavigate(); // Hook điều hướng

  // Existing state for print settings
  const [orientation, setOrientation] = useState("portrait");
  const [printOption, setPrintOption] = useState("all");
  const [pageType, setPageType] = useState("A4");
  const [pagesPerSheet, setPagesPerSheet] = useState(1);
  const [noOfCopies, setNoOfCopies] = useState(1);
  const [pages, setPages] = useState("");
  const [doubleSided, setDoubleSided] = useState('false');
  const [totalPages, setTotalPages] = useState(10);
  const [student, setStudent] = useState(null);

  // File handling state
  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [fileData, setFileData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileType(selectedFile.type);
      setFileUrl(URL.createObjectURL(selectedFile));
    }
  };

  const fetchFileForPreview = async () => {
    const printFile = localStorage.getItem('printFile');
    const userId = JSON.parse(localStorage.getItem("currentUser")).user_id;
    // console.log(printFile, userId);
    const response = await fetch(`http://localhost:3001/file/print?file_name=${printFile}&student_id=${userId}`, {
      method: 'GET',
      headers: {
        "Content-type": "application/pdf",
        Authorization: "Bearer " + localStorage.getItem('token'),
      }
    });
    setFileType('application/pdf');
    // console.log("Type: ", fileType);
    // console.log(response.text());
    const fileBlob = await response.blob();
    const fileUrl = URL.createObjectURL(fileBlob);
    // console.log("URL: ", fileUrl);
    setFileUrl(fileUrl);
    const pdfDocument = await loadPdf(fileUrl)
      .then((pdfFile) => {
        // console.log("File: ", pdfFile._pdfInfo.numPages);
        setFile(pdfFile);
        setTotalPages(pdfFile._pdfInfo.numPages);
      })
      .catch((err) => {
        console.error(err);
      });
    // Set the total number of pages
  };

  const loadPdf = (fileUrl) => {
    return new Promise((resolve, reject) => {
      const loadingTask = window.pdfjsLib.getDocument(fileUrl);
      loadingTask.promise
        .then(resolve)
        .catch(reject);
    });
  };

  useEffect(() => {
    fetchFileForPreview();
  }, []);

  const getPagesToDisplay = () => {
    // console.log("Total pages: ", totalPages);
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
          <div className="flex flex-col items-center justify-center">
            <Document file={fileUrl}>
              {getPagesToDisplay().map((pageNumber) => (
                <Page key={pageNumber} pageNumber={pageNumber} />
              ))}
            </Document>
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

  const getStudentInfor = async () => {
    const userId = JSON.parse(localStorage.getItem("currentUser")).user_id;

    const response = await fetch(`http://localhost:3001/user/id/${userId}`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('token'),
      }
    })

    if (response.ok) {
      const result = await response.json();
      console.log(JSON.stringify(result));

      setStudent(result);
    }
    else {
      console.error("Get student information fail");
    }
  }

  useEffect(() => {
    getStudentInfor();
  }, [])

  const pagesValidate = (pages) => {
    // Regular expressions for single page and range
    const pageRegex = /^\d+$/; // Matches a single page (e.g., "11")
    const rangeRegex = /^(\d+)-(\d+)$/; // Matches a range (e.g., "1-10")

    if (!pages || typeof pages !== "string") {
      return -1; // Invalid input
    }

    let totalPages = 0;

    // Split the input by commas and trim whitespace
    const parts = pages.split(",").map(part => part.trim());

    for (const part of parts) {
      if (pageRegex.test(part)) {
        // Valid single page, ensure it's positive
        const page = parseInt(part, 10);
        if (page <= 0) return -1; // Invalid page number
        totalPages += 1;
      } else {
        const rangeMatch = rangeRegex.exec(part);
        if (rangeMatch) {
          const start = parseInt(rangeMatch[1], 10);
          const end = parseInt(rangeMatch[2], 10);

          if (start > end || start <= 0 || end <= 0) {
            // Invalid range: start > end or non-positive values
            return -1;
          }

          // Add the number of pages in the range
          totalPages += (end - start + 1);
        } else {
          // If it doesn't match either a page or range, it's invalid
          return -1;
        }
      }
    }

    // Return the total number of pages
    return totalPages;
  };



  const handleSubmit = async () => {
    const printFile = localStorage.getItem('printFile');
    const userId = JSON.parse(localStorage.getItem("currentUser")).user_id;
    const printerId = localStorage.getItem('printer'); // Replace with actual printer ID

    localStorage.setItem('noOfCopies', noOfCopies);

    if (!pages) setPages(getPagesToDisplay().join(',')); // Page numbers

    // if (pagesValidate(pages) == -1) console.error("Invalid pages");

    const temp_pages = (pages) ? pagesValidate(pages) : pagesValidate(getPagesToDisplay().join(','));
    const spending_pages = (doubleSided == true ?
      Math.ceil((temp_pages * 1.0) / 2) * noOfCopies
      :
      temp_pages * noOfCopies
    );

    const printJobData = {
      student_id: userId,
      printer_id: printerId,
      file_name: printFile,
      no_of_copies: noOfCopies, // Adjust as needed
      double_sided: doubleSided ? "true" : "false", // Adjust as needed
      direction: orientation.toLowerCase(), // Portrait or Landscape
      page_type: pageType, // A2, A3, A4, A5, Letter
      pages: (pages == "") ? getPagesToDisplay().join(',') : pages
    };

    localStorage.setItem('pageType', pageType);

    localStorage.setItem('totalPages', spending_pages);

    console.log("Pages: ", localStorage.getItem('totalPages'));

    console.log("Data: ", printJobData);

    // Send POST request
    const printingJob = await fetch("http://localhost:3001/printer/prints", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('token'),
      },
      body: JSON.stringify(printJobData),
    });


    if (!printingJob) console.error("Cannot take the printing job response");
    else {
      const result = await printingJob.json();
      localStorage.setItem('printingJobId', result.printing_job_id);
    }

    localStorage.setItem('isPrinting', "true");

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      const value = localStorage.getItem(key);
      console.log(`Key: ${key}, Value: ${value}`);
    }

    let flag = false;

    if (!student) console.error("Get student fail");
    console.log("Student: ", student);
    switch (pageType) {
      case "A2":
        flag = student.students.remaining_A2_pages > localStorage.getItem('totalPages');
        break;
      case "A3":
        flag = student.students.remaining_A3_pages > localStorage.getItem('totalPages');
        break;
      case "A4":
        flag = student.students.remaining_A4_pages > localStorage.getItem('totalPages');
        break;
      case "A5":
        flag = student.students.remaining_A5_pages > localStorage.getItem('totalPages');
        break;
      case "Letter":
        flag = student.students.remaining_Letter_pages > localStorage.getItem('totalPages');
        break;
    }

    console.log("Is enough pages: ", flag);
    localStorage.setItem('isEnoughPages', flag);

    console.log(localStorage.getItem('isEnoughPages'));


    navigate("/buy-printing-pages");
  };

  return (
    <div className="flex flex-col bg-gray-100 h-screen overflow">
      <Header className="relative z-50" />
      <main className="flex h-full bg-gray-300 z-10">
        <aside className="w-1/5 bg-gray-800 p-6 shadow-lg text-white overflow-y-auto">
          {/* Cỡ giấy */}
          <div className="mb-4">
            <label className="block font-medium mb-2 text-lg">Cỡ giấy</label>
            <select className="w-full mt-1 p-2 bg-white text-black border" onChange={(e) => setPageType(e.target.value)}>
              <option>A4</option>
              <option>A2</option>
              <option>A3</option>
              <option>A5</option>
              <option>Letter</option>
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
                onChange={(event) => setPages(event.target.value)}
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
              onChange={(event) => setNoOfCopies(Number(event.target.value))}
            />
          </div>

          {/* Lật 2 mặt */}
          <div className="mb-4 flex items-center">
            <input
              type="checkbox"
              className="w-5 h-5"
              id="doubleSided"
              onChange={(event) => setDoubleSided(event.target.checked)}
            />
            <label htmlFor="doubleSided" className="ml-2 text-lg">
              In 2 mặt
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
            <BackButton onClick={() => window.history.back()} />
            <NextButton onClick={handleSubmit} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default DefiningPrintingProps;