import React, { useState } from "react";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const NotificationModal = ({ message, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <p className="text-lg font-medium mb-4">{message}</p>
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  </div>
);


const UploadButton = () => {
  const navigate = useNavigate();

  const [notificationModal, setNotificationModal] = useState({ isVisible: false, message: "" });
  const [showOptions, setShowOptions] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [url, setUrl] = useState("");
  const [studentId] = useState(() => JSON.parse(localStorage.getItem("currentUser"))?.user_id);

  const handleUpload = () => {
    setShowOptions(!showOptions);
  };

  const handleOptionClick = (option) => {
    if (option === "device") {
      document.getElementById("fileInput").click();
    } else if (option === "drive") {
      setShowUrlInput(true);
    }
    setShowOptions(false); // Close the menu after selection
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("student_id", studentId);
    formData.append("file", file);

    console.log(file);

    try {
      const response = await fetch("http://localhost:3001/file/upload", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setNotificationModal({
          isVisible: true,
          message: "Tải file thành công!",
        });
        console.log("Upload result:", result);
      } else {
        console.error("Failed to upload file:", response.statusText);
        setNotificationModal({
          isVisible: true,
          message: "Tải file không thành công. Vui lòng thử lại!",
        });
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  const handleUrlSubmit = () => {
    alert(`Google Drive URL: ${url}`);
    setShowUrlInput(false);
    setUrl(""); // Reset URL input
  };

  const handleCloseModal = () => {
    setNotificationModal({ isVisible: false, message: "" });
    window.location.reload();
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
        onChange={handleFileChange}
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
      {notificationModal.isVisible && (
        <NotificationModal
          message={notificationModal.message}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default UploadButton;