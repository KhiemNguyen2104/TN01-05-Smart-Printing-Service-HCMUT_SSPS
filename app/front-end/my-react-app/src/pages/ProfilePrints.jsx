import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderProfile from "../components/HeaderProfile";
import Sidebar from "../components/Sidebar";

const ProfilePrints = () => {
  const navigate = useNavigate();
  const [pagesData, setPagesData] = useState(null); // State để lưu dữ liệu từ API

  // Gọi API và cập nhật dữ liệu
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3001/user/student/remaining_pages?floor=0&ceil=0&type=A4&orderBy=student_id&acs=false",
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
        setPagesData(data[0]); // Đảm bảo dữ liệu đúng định dạng
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu:", error);
      }
    };
  
    fetchData();
  }, []);
  

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
            {pagesData ? (
              <>
                <div className="mb-6">
                  <p>
                    <strong>ID:</strong> {pagesData.student_id}
                  </p>
                </div>

                {/* Items List */}
                <div className="bg-gray-100 p-4 rounded-lg mb-8 max-h-[400px] overflow-y-auto">
                  <div className="space-y-4">
                    {[
                      { id: "A2", quantity: pagesData.remaining_A2_pages },
                      { id: "A3", quantity: pagesData.remaining_A3_pages },
                      { id: "A4", quantity: pagesData.remaining_A4_pages },
                      { id: "A5", quantity: pagesData.remaining_A5_pages },
                      { id: "Letter", quantity: pagesData.remaining_Letter_pages },
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
              </>
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
