import React, { useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import BackButton from "../components/BackButton";

const BuyPrintingPages = () => {
  const [paperType, setPaperType] = useState("A4"); // Loại giấy đang chọn
  const [pricePerPage, setPricePerPage] = useState(300); // Giá mỗi trang
  const [currentPages, setCurrentPages] = useState(12); // Số trang hiện có
  const [requiredPages] = useState(40); // Số trang yêu cầu
  const [buyQuantity, setBuyQuantity] = useState(0); // Số lượng mua thêm

  const handleSidebarClick = (type) => {
    // Khi nhấn vào một mục trong sidebar, cập nhật loại giấy và giá
    setPaperType(type);
    setPricePerPage(type === "A4" ? 300 : type === "A3" ? 500 : 200); // Giá tùy loại giấy
    setBuyQuantity(0); // Reset số lượng mua thêm
  };

  const handleBuyQuantityChange = (e) => {
    const value = Math.max(0, parseInt(e.target.value) || 0);
    setBuyQuantity(value);
  };

  const totalAmount = buyQuantity * pricePerPage;
  const vatAmount = totalAmount * 0.1;
  const missingPages = requiredPages - currentPages;

  return (
    <div className="flex flex-col bg-gray-100 h-screen overflow-hidden">
      <Header />

      <main className="flex h-full bg-gray-300 z-10">
        {/* Sidebar */}
        <Sidebar 
          menuItems={["A4", "A3", "A5", "Letter"]}
          onItemClick={handleSidebarClick}
        />

        {/* Nội dung chính */}
        <section className="w-4/5 bg-white flex flex-col p-8">
          {/* Thanh trên cùng */}
          <div className="flex justify-between items-center bg-gray-100 px-6 py-3 shadow-md rounded-t-lg">
            <span className="text-lg font-semibold">Loại giấy: {paperType}</span>
            <span className="text-lg font-semibold">Đơn giá: {pricePerPage} VND/trang</span>
          </div>

          {/* Nội dung chính */}
          <div className="bg-gray-50 p-6 rounded-b-lg shadow-md">
            {/* Dòng đầu tiên */}
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

            {/* Dòng thứ hai */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-lg font-medium mb-1">Số lượng (trang):</label>
                <input
                  type="number"
                  min={0}
                  value={buyQuantity}
                  onChange={handleBuyQuantityChange}
                  className="w-full p-2 border rounded"
                  placeholder="Nhập số trang"
                />
              </div>
              <div>
                <label className="block text-lg font-medium mb-1">VAT (10%):</label>
                <p className="text-xl font-semibold text-gray-700">{vatAmount} VND</p>
              </div>
            </div>

            {/* Dòng thứ ba */}
            <div className="mb-6">
              <label className="block text-lg font-medium mb-1">Thành tiền (VND):</label>
              <p className="text-xl font-semibold text-gray-700">{totalAmount} VND</p>
            </div>

            {/* Nút hành động */}
            <div className="flex justify-end gap-4">
              <button className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                Hủy
              </button>
              <button className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600">
                Thêm
              </button>
            </div>
          </div>

          <div className="shadow-lg p-4 bg-white flex justify-between">
            <BackButton onClick={() => window.history.back()}/>
                {/* <NextButton /> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default BuyPrintingPages;