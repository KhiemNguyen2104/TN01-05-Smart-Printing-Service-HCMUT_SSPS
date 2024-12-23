import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { Bar } from "react-chartjs-2";
import HeaderProfile from "../components/HeaderProfile";
import Sidebar from "../components/Sidebar";
import "chart.js/auto";
import UserCartTable from "../components/UserCartTable";

const ProfileCart = () => {
    const navigate = useNavigate(); // Hook điều hướng

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
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileCart;