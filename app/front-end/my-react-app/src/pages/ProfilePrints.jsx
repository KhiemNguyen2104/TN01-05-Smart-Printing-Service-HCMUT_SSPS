import React from "react";
import { useNavigate } from "react-router-dom";
import HeaderProfile from "../components/HeaderProfile";
import Sidebar from "../components/Sidebar";

const ProfilePrints = () => {
  const navigate = useNavigate(); // Hook điều hướng

  const items = [
    { id: "A2", quantity: 20 },
    { id: "A3", quantity: 20 },
    { id: "A4", quantity: 20 },
    { id: "A5", quantity: 20 },
    { id: "Letter", quantity: 20 },
  ];

  const handleSidebarClick = (menuItem) => {
    switch (menuItem) {
      case "Thông tin cá nhân":
        navigate("/profile/user-info");
        break;
      case "Số trang in":
        navigate("/profile/print-pages");
        break;
      case "Giao dịch":
        navigate("/profile/transactions");
        break;
      case "Giỏ hàng":
        navigate("/profile/cart");
        break;
      default:
        break;
    }
  };

  const menuItems = ["Thông tin cá nhân", "Số trang in", "Giao dịch", "Giỏ hàng"];

  return (
    <div className="flex flex-col bg-gray-100 h-screen">
      {/* Header */}
      <HeaderProfile />

      <main className="flex h-full bg-gray-300">
        {/* Sidebar */}
        <Sidebar menuItems={menuItems} onItemClick={handleSidebarClick} />

        {/* Main content */}
        <div className="w-4/5 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
            {/* Header Section */}
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h1 className="text-xl font-semibold">Hệ thống in</h1>
              <h2 className="text-lg text-gray-600">SỐ TRANG IN</h2>
            </div>

            {/* ID */}
            <div className="mb-6">
              <p><strong>ID:</strong> 2211573</p>
            </div>

            {/* Items List - Nội dung */}
            <div className="bg-gray-100 p-4 rounded-lg mb-8 max-h-[400px] overflow-y-auto">
              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={item.id}
                    className={`flex justify-between items-center py-3 ${
                      index !== items.length - 1 ? "border-b border-gray-200" : ""
                    } hover:bg-gray-50 transition-colors duration-200 px-2 rounded`}
                  >
                    <span className="text-gray-800 font-medium text-lg">{item.id}</span>
                    <span className="text-gray-600 text-lg">
                      Số lượng: <strong>{item.quantity}</strong>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => alert("Bạn đã nhấn 'Mua thêm'")}
                className="px-6 py-2 bg-green-500 text-white font-medium text-base rounded-lg 
                  hover:bg-green-600 hover:shadow-md 
                  active:transform active:scale-95
                  transition-all duration-200"
              >
                Mua thêm
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePrints;