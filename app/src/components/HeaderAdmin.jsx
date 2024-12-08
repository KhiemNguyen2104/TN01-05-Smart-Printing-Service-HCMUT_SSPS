

import React from "react";
import { useNavigate } from "react-router-dom";



const HeaderAdmin = () => {
  const navigate = useNavigate(); // Khai báo useNavigate

  const handleNavigate = (path) => {
    navigate(path); // Dùng navigate để điều hướng
  };

  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  return (
    <header className="bg-blue-900 text-white p-2 sm:p-4 flex items-center justify-between">
      {/* Logo và thông tin trường */}
      <div className="flex items-center gap-2 sm:gap-4">
        <img
          src="hcmut-logo.png"
          alt="HCMUT Logo"
          className="w-12 h-12 sm:w-16 sm:h-16"
        />
        <div>
          <h1 className="text-xs sm:text-sm font-semibold">
            ĐẠI HỌC QUỐC GIA TP. HỒ CHÍ MINH
          </h1>
          <h2 className="text-sm sm:text-base font-bold">
            TRƯỜNG ĐẠI HỌC BÁCH KHOA
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-20 mx-auto">
        <button className="text-2xl sm:text-2xl font-bold text-white hover:opacity-80"
          onClick={() => handleNavigate("/principle")}  >
          
          {/* Tăng kích thước chữ */}
          HỆ THỐNG
        </button>
        <button className="text-2xl sm:text-2xl font-bold text-white hover:opacity-80"
        onClick={() => handleNavigate("/history")}  >
          {/* Tăng kích thước chữ */}
          LỊCH SỬ IN ẤN
        </button>
      </div>

      {/* Khối chứa chữ K và dropdown */}
      <div className="flex items-center gap-2 relative">
        {/* Khung tròn chứa chữ K */}
        <div className="rounded-full bg-white w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-blue-900 font-bold text-lg shadow-md">
          K
        </div>

        {/* Nút dropdown */}
        <button
          onClick={toggleDropdown}
          className="rounded-md shadow-md hover:opacity-80"
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b7cb7e27b96a85bcd021ea93e2fd89a87f88cb02356b6e2a7c7a88c0e4ce931?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
            alt="Dropdown Icon"
            className="w-4 h-4 object-contain"
          />
        </button>

        {/* Menu Dropdown */}
        {showDropdown && (
          <ul className="absolute right-0 top-12 bg-white text-black shadow-lg rounded-md w-40">
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
              Hồ sơ
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
              Cài đặt
            </li>
            <li className="px-4 py-2 cursor-pointer hover:bg-gray-200">
              Đăng xuất
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

export default HeaderAdmin;
