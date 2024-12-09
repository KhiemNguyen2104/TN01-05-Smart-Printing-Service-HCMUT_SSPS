import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const navigate = useNavigate(); // Hook điều hướng

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

        {/* Nội dung chính */}
        <div className="flex-grow p-6">
          <h1 className="text-2xl">Trang nội dung chính</h1>
        </div>
      </main>
    </div>
  );
};

export default Profile;