import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
import HeaderProfile from "../components/HeaderProfile";
import Sidebar from "../components/Sidebar";
import "chart.js/auto";
import UserCartTable from "../components/UserCartTable";

const ProfileCart = () => {
    const navigate = useNavigate(); // Hook điều hướng
    const [isModalOpen, setIsModalOpen] = useState(false); // State để quản lý modal

    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch("http://localhost:3001/user/current-user", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                });
                const data = await response.json();
                setUserData(data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

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

    const handlePaymentClick = () => {
        setIsModalOpen(true); // Hiển thị modal khi nhấn "Thanh toán tất cả"
    };

    const handleConfirmPayment = () => {
        // Logic xử lý thanh toán ở đây
        console.log("Thanh toán thành công!");
        setIsModalOpen(false); // Đóng modal sau khi thanh toán
    };

    const handleCancelPayment = () => {
        setIsModalOpen(false); // Đóng modal khi hủy thanh toán
    };

    const menuItems = ["Thông tin cá nhân", "Số trang in", "Giao dịch", "Giỏ hàng"];

    return (
        <div className="flex flex-col bg-gray-100 h-screen overflow">
            {/* Header */}
            <HeaderProfile />

            <main className="flex h-full bg-gray-300">
                {/* Sidebar */}
                <Sidebar menuItems={menuItems} onItemClick={handleSidebarClick} />

                {/* Main content */}
                <div className="w-4/5 p-8 overflow-auto">
                    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-md p-6">
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <h1 className="text-xl font-semibold">Hệ thống in</h1>
                            <h2 className="text-lg text-gray-600">THÔNG TIN GIỎ HÀNG</h2>
                        </div>

                        {userData ? (
                            <div className="mb-6">
                            <p><strong>ID:</strong> {userData.user_id}</p>
                            {/* <p><strong>Mã số sinh viên:</strong> {userData.studentId}</p>
                            <p><strong>Họ và tên:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Kiểu người dùng:</strong> {userData.userType}</p> */}
                            </div>
                        ) : (
                            <p>Đang tải thông tin người dùng...</p> // Hiển thị thông báo khi userData chưa sẵn sàng
                        )}

                        <div>
                            <UserCartTable />
                        </div>

                        {/* Button Thanh toán tất cả */}
                        <div className="mt-6 text-right">
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handlePaymentClick}
                            >
                                Thanh toán tất cả
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Modal xác nhận thanh toán */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                        <h3 className="text-lg font-semibold mb-4">Xác nhận thanh toán</h3>
                        <p>Bạn có chắc chắn muốn thanh toán toàn bộ giỏ hàng không?</p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                                onClick={handleCancelPayment}
                            >
                                Hủy
                            </button>
                            <button
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={handleConfirmPayment}
                            >
                                Xác nhận
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfileCart;