// src/pages/Home.jsx
import React, { useState, useEffect } from "react";
import CustomSlider from "../components/Slider";
import images from "../data/images";

const Home = () => {
  // State để lưu giá tiền giấy in
  const [quantity, setQuantity] = useState(0); // Số lượng tờ người dùng nhập
  const [finalPrice, setFinalPrice] = useState(0); // Giá cuối cùng sau giảm giá

  // Giá tiền theo loại giấy
  const prices = {
    A4: 500, // Giá mỗi tờ A4 (VND)
    A3: 1000, // Giá mỗi tờ A3 (VND)
    A2: 2000, // Giá mỗi tờ A2 (VND)
  };

  // Tính toán giá sau khi áp dụng giảm giá
  const calculateDiscount = (pricePerSheet, quantity) => {
    let discount = 0;
    if (quantity >= 200) {
      discount = 0.15; // Giảm 15% nếu số lượng >= 200
    } else if (quantity >= 150) {
      discount = 0.1; // Giảm 10% nếu số lượng >= 150
    } else if (quantity >= 100) {
      discount = 0.05; // Giảm 5% nếu số lượng >= 100
    }

    const totalPrice = pricePerSheet * quantity;
    const discountPrice = totalPrice * (1 - discount);
    return discountPrice;
  };

  // Xử lý thay đổi số lượng tờ
  const handleQuantityChange = (e) => {
    const qty = e.target.value;
    setQuantity(qty);

    // Tính giá cho mỗi loại giấy
    const priceA4 = calculateDiscount(prices.A4, qty);
    const priceA3 = calculateDiscount(prices.A3, qty);
    const priceA2 = calculateDiscount(prices.A2, qty);

    setFinalPrice({ A4: priceA4, A3: priceA3, A2: priceA2 });
  };

  // Giả lập gọi API để lấy giá tiền giấy in (có thể thay bằng API thực tế)

  return (
    <div>
      {/* Phần hiển thị ảnh */}
      <CustomSlider>
        {images.map((image, index) => {
          return <img key={index} src={image.imgURL} alt={image.imgAlt} />;
        })}
      </CustomSlider>

      {/* Hiển thị bảng giá */}
      <div className="bg-white p-4 mx-4 my-6 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-semibold mb-2">
          Bảng giá giấy in
        </h2>
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Loại Giấy</th>
              <th className="px-4 py-2 border">Giá (VND/tờ)</th>
              <th className="px-4 py-2 border">Giảm giá</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-2 border">A4</td>
              <td className="px-4 py-2 border">{prices.A4} VND</td>
              <td className="px-4 py-2 border">
                {quantity >= 200
                  ? "Giảm 15%"
                  : quantity >= 150
                  ? "Giảm 10%"
                  : quantity >= 100
                  ? "Giảm 5%"
                  : "Không giảm"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">A3</td>
              <td className="px-4 py-2 border">{prices.A3} VND</td>
              <td className="px-4 py-2 border">
                {quantity >= 200
                  ? "Giảm 15%"
                  : quantity >= 150
                  ? "Giảm 10%"
                  : quantity >= 100
                  ? "Giảm 5%"
                  : "Không giảm"}
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2 border">A2</td>
              <td className="px-4 py-2 border">{prices.A2} VND</td>
              <td className="px-4 py-2 border">
                {quantity >= 200
                  ? "Giảm 15%"
                  : quantity >= 150
                  ? "Giảm 10%"
                  : quantity >= 100
                  ? "Giảm 5%"
                  : "Không giảm"}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Nhập số lượng tờ và hiển thị giá sau giảm */}
        <div className="flex items-center justify-between mt-4">
          <div className="w-1/2 pr-2">
            <label htmlFor="quantity" className="block text-lg sm:text-xl mb-2">
              Nhập số lượng tờ:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              className="p-2 w-full border border-gray-300 rounded-md"
              min="0"
            />
          </div>

          {/* Hiển thị giá sau giảm, nằm ngang với ô nhập số tờ */}
          <div className="w-1/2 pl-2">
            {quantity > 0 && (
              <div className="text-lg sm:text-xl font-semibold">
                <p>
                  <strong>A4:</strong> {finalPrice.A4?.toFixed(0)} VND
                </p>
                <p>
                  <strong>A3:</strong> {finalPrice.A3?.toFixed(0)} VND
                </p>
                <p>
                  <strong>A2:</strong> {finalPrice.A2?.toFixed(0)} VND
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
