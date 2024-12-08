import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
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
    // Logic điều hướng dựa trên mục được chọn
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
  <div className="flex flex-col bg-gray-100 h-screen overflow-hidden">
    <Header />

    <main className="flex h-full bg-gray-300 z-10">
      {/* Sidebar */}
      <Sidebar menuItems={menuItems} onItemClick={handleSidebarClick} />

      {/* Main content */}
      <div className="w-4/5 p-8 flex justify-center">
  <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow duration-300">
    {/* ID */}
    <h2 className="text-xl font-semibold mb-6 pb-3 border-b border-gray-200">
      ID: 2211573
    </h2>

    {/* Items */}
    <div className="space-y-4 mb-8">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`flex justify-between items-center py-3 ${
            index !== items.length - 1 ? 'border-b border-gray-200' : ''
          } hover:bg-gray-50 transition-colors duration-200 px-2 rounded`}
        >
          <span className="text-gray-800 font-medium text-lg">{item.id}</span>
          <span className="text-gray-600 text-lg">
            Số lượng: <strong>{item.quantity}</strong>
          </span>
        </div>
      ))}
    </div>

    {/* Button */}
    <div className="flex justify-center">
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
