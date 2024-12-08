import React from "react";
import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "chart.js/auto";
import UserTransactionTable from "../components/UserTransactionTable";

const ProfileTransactions = () => {
    const navigate = useNavigate(); // Hook điều hướng

    const userData = {
        id: "2211573",
        studentId: "2211573",
        name: "Nguyễn Phúc Gia Khiêm",
        email: "khiem.nguyenphucgia@hcmut.edu.vn",
        userType: "Sinh viên",
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
    <div className="flex flex-col bg-gray-100 h-screen overflow">
        {/* Header */}
        <Header />

        <main className="flex h-full bg-gray-300">
            {/* Sidebar */}
            <Sidebar menuItems={menuItems} onItemClick={handleSidebarClick} />

            {/* Main content */}
            <div className="w-4/5 p-8 overflow-auto">
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                    <div className="flex justify-between items-center border-b pb-4 mb-4">
                        <h1 className="text-xl font-semibold">Hệ thống in</h1>
                        <h2 className="text-lg text-gray-600">LỊCH SỬ GIAO DỊCH</h2>
                    </div>

                    <div className="mb-6">
                        <p><strong>ID:</strong> {userData.id}</p>
                        {/* <p><strong>Mã số sinh viên:</strong> {userData.studentId}</p>
                        <p><strong>Họ và tên:</strong> {userData.name}</p>
                        <p><strong>Email:</strong> {userData.email}</p>
                        <p><strong>Kiểu người dùng:</strong> {userData.userType}</p> */}
                    </div>

                    <div>
                        <UserTransactionTable />
                        {/* <h3 className="text-lg font-semibold mb-4">Thống kê số lần in:</h3> */}
                        {/* Responsive chart container */}
                        {/* <div className="flex justify-center items-center mt-12 h-72">
                            <div className="w-full max-w-2xl">
                                <Bar data={chartData} options={chartOptions} />
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </main>
    </div>
  );
};

export default ProfileTransactions;