import * as React from "react";
import Header from "../components/Header";
import SearchBar from "../components/FileSearchBar";
import FileList from "../components/FileList";
import BackButton from "../components/BackButton";
import HeaderAdmin from "../components/HeaderAdmin";
import { useNavigate } from "react-router-dom";

const PrintingHistory = () => {
  const navigate = useNavigate();
  const [files, setFiles] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const initialFilesRef = React.useRef([]);

  const getFileIcon = (fileName) => {
    const fileExtension = fileName.split(".").pop().toLowerCase();

    const icons = {
      pdf: "https://cdn.builder.io/api/v1/image/assets/TEMP/e0900c012f911ca7632783c1a6a7ad126071fd3750ae83fc23de92462bd7ff19?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
      doc: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fb0381a2fd6f769c25cb28a99bf37d688469f2b497bf2e9da882607d7f93018?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
      docx: "https://cdn.builder.io/api/v1/image/assets/TEMP/8fb0381a2fd6f769c25cb28a99bf37d688469f2b497bf2e9da882607d7f93018?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
      xls: "https://cdn.builder.io/api/v1/image/assets/TEMP/2ff86228d1695b9271bbb74d5bf6b94227a91cd9e9d194ddcd76c2588a5827f6?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
      xlsx: "https://cdn.builder.io/api/v1/image/assets/TEMP/2ff86228d1695b9271bbb74d5bf6b94227a91cd9e9d194ddcd76c2588a5827f6?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
      ppt: "https://cdn.builder.io/api/v1/image/assets/TEMP/7397a754eae4f3da3b416e5d7b3b69ef5a9d07b142e5bdd831a8869650d91ffb?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
      pptx: "https://cdn.builder.io/api/v1/image/assets/TEMP/7397a754eae4f3da3b416e5d7b3b69ef5a9d07b142e5bdd831a8869650d91ffb?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
      default: "https://cdn.builder.io/api/v1/image/assets/TEMP/e0900c012f911ca7632783c1a6a7ad126071fd3750ae83fc23de92462bd7ff19?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec",
    };

    return icons[fileExtension] || icons.default;
  };

  React.useEffect(() => {
    const fetchFiles = async () => {
      setLoading(true);
      const current_user = JSON.parse(localStorage.getItem("currentUser"));
      if (!current_user) {
        console.error("No current user found in localStorage");
        setLoading(false);
        return;
      }

      const url = `http://localhost:3001/printer/prints/history/${current_user.user_id}?start_time=2000/01/01&end_time=2024/12/31`;

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const result = await response.json();
        
          const initialFiles = result.map((ele) => {
            const date = new Date(ele.end_time);
        
            // Format the date to 'DD/MM/YYYY'
            const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${
              (date.getMonth() + 1).toString().padStart(2, '0')
            }/${date.getFullYear()}`;
        
            return {
              id: ele.file.file_id, // Sử dụng file_id từ "file"
              fileName: ele.file.file_name, // Sử dụng file_name từ "file"
              icon: getFileIcon(ele.file.file_name), // Tạo icon dựa trên file_name
              date: formattedDate, // Chỉ hiển thị ngày
            };
          });
        
          initialFilesRef.current = initialFiles;
          setFiles(initialFiles);
        } else {
          console.error("Failed to fetch files:", response.statusText);
        }
        
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredFiles = initialFilesRef.current.filter((file) =>
      file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFiles(filteredFiles);
  };

  const handleSort = (criteria) => {
    const sortedFiles = [...initialFilesRef.current].sort((a, b) => {
      if (criteria === "name") {
        return a.fileName.localeCompare(b.fileName);
      }
      else if (criteria === "date") {
        const dateA = new Date(a.date.split("/").reverse().join("-"));
        const dateB = new Date(b.date.split("/").reverse().join("-"));
        return dateA - dateB;
      }
      else if (criteria === "size") {
        return a.file_size - b.file_size; // Assuming you have a `size` property in your file objects
      }
      else if (criteria === "type") {
        const typeA = a.fileName.split(".").pop();
        const typeB = b.fileName.split(".").pop();
        return typeA.localeCompare(typeB); // Example "abc.doc" and "xyz.ppt" we will compare "doc" and "ppt"
      }
      else {
        return 0; // Default case if no valid criteria is provided
      }
    });

    setFiles(sortedFiles);
  };

  return (
    <div className="flex flex-col pb-12 bg-white overflow-hidden">
      {/* Header */}
      <HeaderAdmin />

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
