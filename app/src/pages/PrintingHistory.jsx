import * as React from "react";
import Header from "../components/Header";
import SearchBar from "../components/FileSearchBar";
// import UploadButton from "../components/UploadButton";
import FileList from "../components/FileList";
import BackButton from "../components/BackButton";
// import NextButton from "../components/NextButton";
// import { useNavigate } from "react-router-dom";

const PrintingHistory = () => {
  const initialFiles = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e0900c012f911ca7632783c1a6a7ad126071fd3750ae83fc23de92462bd7ff19?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.pdf", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2ff86228d1695b9271bbb74d5bf6b94227a91cd9e9d194ddcd76c2588a5827f6?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.xls", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7397a754eae4f3da3b416e5d7b3b69ef5a9d07b142e5bdd831a8869650d91ffb?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.ppt", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fb0381a2fd6f769c25cb28a99bf37d688469f2b497bf2e9da882607d7f93018?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.doc", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/4ff42d88ed98f52b5586a648a539f517220f857a318a3da9f98d017758f1746a?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.txt", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/13b981cdfe6c89e6405e7b0a06b3e515b264444bfb5427f89e517f0d8c23d9f0?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.csv", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/2c88b5b7f53860672f7bdf71721f2bc819b5b997c9f0be4a993e6b01e307db4b?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.jpg", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6ff6a72ec4a8104503f35602f3fd24f23f124cb5f3889892f473c56f4d38f470?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.png", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/a459478a4b57ac1c7874c3c20b7507fc2f55a0e0464d000cb74d96c35a032bbb?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.svg", date: "13/10/2024" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/6b83c9b7e4c3a30e9e0194b285eaf15c03b88a1e2dbd7f6d16d9f7a396d2216c?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec", fileName: "File name.md", date: "13/10/2024" },
  ];

  const [files, setFiles] = React.useState(initialFiles);

  const handleSearch = (searchTerm) => {
    const filteredFiles = initialFiles.filter((file) =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiles(filteredFiles);
  };

  const handleSort = () => {
    const sortedFiles = [...files].sort((a, b) =>
      a.fileName.localeCompare(b.fileName)
    );
    setFiles(sortedFiles);
  };

  return (
    <div className="flex flex-col pb-12 bg-white overflow-hidden">
      {/* Header */}
      <Header />

      <main className="flex flex-col px-14 mt-9 w-full max-md:px-5 max-md:max-w-full">
        {/* Title and Upload Button */}
        <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
          <h1 className="my-2 text-3xl sm:text-3xl text-black font-semibold">
            Hệ thống in{" "}
            <span className="text-xs sm:text-sm text-neutral-400">
              LỊCH SỬ IN ẤN
            </span>
          </h1>
        </div>

        {/* Search Bar and File List */}
        <div className="flex flex-col items-center pt-5 pb-9 mt-8 w-full bg-white rounded-2xl shadow-md shadow-[rgba(0,0,0,0.1)] border border-solid border-neutral-300">
          {/* Search Bar */}
          <SearchBar onSearch={handleSearch} onSort={handleSort} />

          {/* Divider */}
          <div className="shrink-0 self-stretch mt-5 h-px bg-neutral-400" />

          {/* File List */}
          <div className="file-list mt-5 w-full px-5">
            <FileList files={files} />
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-16 max-md:mt-10">
          <BackButton onClick={() => window.history.back()} />
          {/* <NextButton onClick={() => alert("Chuyển tới trang kế tiếp")} /> */}
        </div>
      </main>
    </div>
  );
};

export default PrintingHistory;