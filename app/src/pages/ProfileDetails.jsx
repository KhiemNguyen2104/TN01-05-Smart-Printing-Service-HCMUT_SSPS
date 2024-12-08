import React from "react";
import { useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "chart.js/auto";

const ProfileDetails = () => {
    const navigate = useNavigate(); // Hook điều hướng

    const userData = {
        id: "2211573",
        studentId: "2211573",
        name: "Nguyễn Phúc Gia Khiêm",
        email: "khiem.nguyenphucgia@hcmut.edu.vn",
        userType: "Sinh viên",
        printStats: {
        labels: ["T8", "T9", "T10", "T11"],
        data: [10, 14, 10, 13],
        },
    };

    const chartData = {
        labels: userData.printStats.labels,
        datasets: [
        {
            label: "Số lần in",
            data: userData.printStats.data,
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
        x: {
          grid: {
            display: false
          }
        },
        y: {
          grid: {
            display: false
          },
          ticks: {
            beginAtZero: true,
            precision: 0,
          }
        }
      },
      barThickness: 30,
      categoryPercentage: 0.9, // Controls spacing between categories
      barPercentage: 0.9, // Controls width of bars within category
    };

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
     {/* Header */}   
    <Header />

  <main className="flex h-full bg-gray-300 z-10">
    {/* Sidebar */}
    <Sidebar menuItems={menuItems} onItemClick={handleSidebarClick} />

    {/* Main content - takes up remaining 4/5 width */}
    <div className="w-4/5 p-8 overflow-auto">
    <h1 className="my-2 text-5xl sm:text-3xl text-black font-semibold">
              Hệ thống in{" "}
              <span className="text-xs sm:text-sm text-neutral-400">
                HỒ SƠ CÁ NHÂN
              </span>
            </h1>
      <div className="max-w-8xl mx-auto bg-white shadow-md rounded-md p-6">
        <div className="flex justify-between items-center border-b pb-4 mb-4">
          <h1 className="text-xl font-semibold"><span className="font-bold">ID:</span> {userData.id}</h1>
          {/* <h2 className="text-lg text-gray-600">HỒ SƠ CÁ NHÂN</h2> */}
        </div>

        <div className="mb-6">
          {/* <p><strong>ID:</strong> {userData.id}</p> */}
          <p><strong>Mã số sinh viên:</strong> {userData.studentId}</p>
          <p><strong>Họ và tên:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Kiểu người dùng:</strong> {userData.userType}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Thống kê số lần in:</h3>
          <div className="w-1/2 ml-0"> {/* Container for Bar chart */}
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  </main>
</div>
  );
};

export default ProfileDetails;
