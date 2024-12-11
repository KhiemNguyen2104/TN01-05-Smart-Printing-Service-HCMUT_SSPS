import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderProfile from "../components/HeaderProfile";
import Sidebar from "../components/Sidebar";

const ProfilePrints = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // State lưu thông tin người dùng
  const [studentData, setStudentData] = useState(null); // State lưu dữ liệu từ API

  // Lấy thông tin người dùng từ localStorage
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserData(currentUser);
      fetchStudentData(currentUser.user_id); // Gọi API với user_id
    }
  }, []);

  // Hàm gọi API lấy thông tin số trang in
  const fetchStudentData = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/user/id/${userId}`, // Gọi API với user_id
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      if (!response.ok) {
        console.error("Lỗi khi fetch API:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      console.log("Dữ liệu nhận được:", data); // Debug dữ liệu trả về
      setStudentData(data.students); // Lưu dữ liệu `students` vào state
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

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

            {/* Thông tin người dùng */}
            {userData ? (
              <div className="mb-6">
                <p>
                  <strong>ID:</strong> {userData.user_id}
                </p>
              </div>
            ) : (
              <p>Đang tải thông tin người dùng...</p>
            )}

            {/* Số trang in */}
            {studentData ? (
              <div className="bg-gray-100 p-4 rounded-lg mb-8 max-h-[400px] overflow-y-auto">
                <div className="space-y-4">
                  {[
                    { id: "A2", quantity: studentData.remaining_A2_pages },
                    { id: "A3", quantity: studentData.remaining_A3_pages },
                    { id: "A4", quantity: studentData.remaining_A4_pages },
                    { id: "A5", quantity: studentData.remaining_A5_pages },
                    { id: "Letter", quantity: studentData.remaining_Letter_pages },
                  ].map((item, index) => (
                    <div
                      key={item.id}
                      className={`flex justify-between items-center py-3 ${
                        index !== 4 ? "border-b border-gray-200" : ""
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
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}

            {/* Button */}
            <div className="flex justify-end">
              <button
                onClick={() => navigate("/buy-printing-pages")}
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
