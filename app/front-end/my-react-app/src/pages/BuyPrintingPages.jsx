import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const BuyPrintingPages = () => {
  const [paperType, setPaperType] = useState("A4");
  const [pricePerPage, setPricePerPage] = useState(300);
  const [currentPages, setCurrentPages] = useState(0);
  const [requiredPages] = useState(40);
  const [buyQuantity, setBuyQuantity] = useState(0);
  const [userData, setUserData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setUserData(currentUser);
      fetchStudentData(currentUser.user_id);
    }
  }, []);

  const fetchStudentData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/user/id/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStudentData(data.students);
        setCurrentPages(data.students.remaining_A4_pages);
      } else {
        console.error("Lỗi khi fetch API:", response.statusText);
      }
    } catch (error) {
      console.error("Lỗi khi fetch dữ liệu:", error);
    }
  };

  const handleSidebarClick = (type) => {
    setPaperType(type);
    setPricePerPage(
      type === "A4" ? 300 : type === "A3" ? 500 : type === "A5" ? 200 : type === "A2" ? 600 : 400
    );
    if (studentData) {
      const pages =
        type === "A4"
          ? studentData.remaining_A4_pages
          : type === "A3"
          ? studentData.remaining_A3_pages
          : type === "A5"
          ? studentData.remaining_A5_pages
          : type === "A2"
          ? studentData.remaining_A2_pages
          : studentData.remaining_Letter_pages;
      setCurrentPages(pages || 0);
    }
    setBuyQuantity(0);
  };

  const handleBuyQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setBuyQuantity(value);
  };

  const handleCreateTransaction = async () => {
    try {
      const data = {
        student_id: userData?.user_id,
        page_type: paperType,
        no_of_pages: buyQuantity,
      };

      const response = await fetch("http://localhost:3001/transaction/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        localStorage.setItem("temp_transaction", JSON.stringify(result));
        alert("Đơn đã được thêm vào giỏ hàng!");
        setCurrentPages((prev) => prev + buyQuantity);
        setBuyQuantity(0);
      } else {
        console.error("Lỗi khi tạo giao dịch:", response.status, response.statusText);
        alert("Không thể tạo giao dịch. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi tạo giao dịch:", error);
      alert("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsConfirmationOpen(false);
    }
  };

  const handleCommitTransaction = async () => {
    const tempTransaction = localStorage.getItem("temp_transaction");
  
    if (!tempTransaction) {
      alert("Không có giao dịch nào để thực hiện!");
      return;
    }
  
    try {
      // Parse tempTransaction và thêm state vào
      const transactionData = JSON.parse(tempTransaction);
      transactionData.state = "Successful";
  
      const response = await fetch(`http://localhost:3001/transaction/commit`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(transactionData), // Chuyển thành JSON string
      });
  
      if (response.ok) {
        alert("Giao dịch đã được cập nhật thành công!");
        localStorage.removeItem("temp_transaction"); // Xóa sau khi commit
      } else {
        console.error("Lỗi khi cập nhật giao dịch:", response.status, response.statusText);
        alert("Không thể cập nhật giao dịch. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật giao dịch:", error);
    }
  };
  

  const totalAmount = buyQuantity * pricePerPage;
  const vatAmount = totalAmount * 0.1;
  const missingPages = requiredPages - currentPages;

  return (
    <div className="flex flex-col bg-gray-100 h-screen overflow-hidden">
      <Header />
      <main className="flex h-full bg-gray-300 z-10">
        <Sidebar
          menuItems={["A2", "A3", "A4", "A5", "Letter"]}
          onItemClick={handleSidebarClick}
        />
        <section className="w-4/5 bg-white flex flex-col p-8">
          <div className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow-md rounded-t-lg">
            <span className="text-lg font-semibold">Loại giấy: {paperType}</span>
            <span className="text-lg font-semibold">Đơn giá: {pricePerPage} VND/trang</span>
          </div>
          <div className="bg-gray-50 p-6 rounded-b-lg shadow-2xl">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-lg font-medium mb-1">
                  Số lượng hiện có / Số lượng yêu cầu:
                </label>
                <p className="text-xl font-semibold text-gray-700">
                  {currentPages}/{requiredPages}
                </p>
              </div>
              <div>
                <label className="block text-lg font-medium text-red-500 mb-1">Còn thiếu:</label>
                <p className="text-xl font-semibold text-red-600">{missingPages} trang</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-lg font-medium mb-1">Số lượng (trang):</label>
                <input
                  type="number"
                  value={buyQuantity}
                  onChange={handleBuyQuantityChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-1">VAT (10%):</label>
                <p className="text-xl font-semibold text-gray-700">{vatAmount} VND</p>
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-lg font-medium mb-1">Thành tiền (VND):</label>
              <p className="text-xl font-semibold text-gray-700">{totalAmount} VND</p>
            </div>
            <div className="flex justify-end gap-4">
              <button
                className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                onClick={() => setIsConfirmationOpen(true)}
              >
                Thêm
              </button>
            </div>
          </div>
          <div className=" p-4 flex justify-end">
        <button
          className="bg-green-500 text-white px-6 py-2 rounded hover:bg-blue-600"
          onClick={handleCommitTransaction}
        >
          Giao dịch
        </button>
      </div>
          {isConfirmationOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-lg font-medium mb-4">
                  Bạn có chắc chắn muốn thực hiện giao dịch?
                </p>
                <div className="flex justify-end gap-4">
                  <button
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    onClick={() => setIsConfirmationOpen(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={handleCreateTransaction}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      
    </div>
  );
};

export default BuyPrintingPages;
