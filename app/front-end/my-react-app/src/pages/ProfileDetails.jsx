import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import HeaderProfile from "../components/HeaderProfile";
import Sidebar from "../components/Sidebar";
import "chart.js/auto";

const ProfileDetails = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [printStats, setPrintStats] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu người dùng từ localStorage
    const savedUserData = JSON.parse(localStorage.getItem("currentUser"));
    if (savedUserData) {
      setUserData(savedUserData);
      fetchPrintStats(savedUserData.user_id);
    }
  }, []);

  const fetchPrintStats = async (userId) => {
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // [1, 2, ..., 12]
    const year = 2024;
    const promises = months.map(async (month) => {
      const start_time = `${year}/${month.toString().padStart(2, "0")}/01`;
      const end_time = `${year}/${month.toString().padStart(2, "0")}/31`;
      const url = `http://localhost:3001/printer/prints/history/${userId}?start_time=${start_time}&end_time=${end_time}`;
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API request failed");
        const data = await response.json();
        return data.length; // Số lần in = độ dài của mảng trả về
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
        return 0; // Nếu lỗi, mặc định là 0
      }
    });

    // Chờ tất cả các tháng xử lý xong
    const printCounts = await Promise.all(promises);
    setPrintStats(printCounts);
    setIsLoading(false);
  };

  const defaultChartData = {
    labels: ["T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12"],
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  };

  const chartData = {
    labels: defaultChartData.labels,
    datasets: [
      {
        label: "Số lần in",
        data: printStats || defaultChartData.data,
        backgroundColor: "#4A90E2",
        borderRadius: 4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
          precision: 0,
        },
      },
    },
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
      <HeaderProfile />

      <main className="flex h-full bg-gray-300">
        <Sidebar menuItems={menuItems} onItemClick={handleSidebarClick} />

        <div className="w-4/5 p-8 overflow-auto">
          <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <h1 className="text-xl font-semibold">Hệ thống in</h1>
              <h2 className="text-lg text-gray-600">HỒ SƠ CÁ NHÂN</h2>
            </div>

            {/* Thông tin người dùng */}
            {userData ? (
              <div className="mb-6">
                <p><strong>ID:</strong> {userData.user_id}</p>
                <p><strong>Mã số sinh viên:</strong> {userData.user_id}</p>
                <p><strong>Họ và tên:</strong> {userData.user_name}</p>
                <p><strong>Email:</strong> {userData.user_email}</p>
                <p><strong>Kiểu người dùng:</strong> {userData?.id?.startsWith("00") ? "SPSO" : "Sinh viên"}</p>
              </div>
            ) : (
              <p>Đang tải dữ liệu...</p>
            )}

            {/* Biểu đồ thống kê */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Thống kê số lần in:</h3>
              {isLoading ? (
                <p>Đang tải biểu đồ...</p>
              ) : (
                <div className="flex justify-center items-center mt-12 mb-6 h-72">
                  <div className="w-full max-w-2xl">
                    <Bar data={chartData} options={chartOptions} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileDetails;
