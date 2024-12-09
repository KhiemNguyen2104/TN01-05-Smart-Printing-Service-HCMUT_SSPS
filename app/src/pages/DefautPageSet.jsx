import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/NarbarSystem";
import BackButton from "../components/BackButton";
import HeaderAdmin from "../components/HeaderAdmin";

function PaperTypeRow({ paperType, quantity, onChange }) {
  return (

    <tr className="border-b border-gray-200">
      <td className="py-3 px-6 text-center">
        <label className="text-lg text-gray-700">{paperType}</label>
      </td>
      <td className="py-3 px-6 text-center">
      <input
        type="number"
        value={quantity}
        onChange={(e) => onChange(e, paperType)}
        className="p-2 border border-gray-300 rounded-lg w-40 text-center"
      />
      </td>
    </tr>
  );
}

function DefaultPageSet() {
  const [date, setDate] = useState(new Date());
  const [pages, setPages] = useState(0);
  const [quantities, setQuantities] = useState({
    A2: 20,
    A3: 20,
    A4: 20,
    A5: 20,
    Letter: 20,
  });

  const handleChange = (event, paperType) => {
    const value = event.target.value;
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [paperType]: value,
    }));
  };

  const handleSubmit = () => {
    alert("Đơn hàng đã được xác nhận!");
    // Bạn có thể xử lý logic gửi đơn hàng tại đây
  };

  return (
    <div className="max-md:px-5 max-md:max-w-full w-full mx-auto">
      <HeaderAdmin />
      <Navbar />

      <div className="flex flex-col items-center px-4 md:px-6 lg:px-8 pt-5 pb-9 mt-8 w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-solid border-neutral-300">
        {/* Ngày cấp và Nút xác nhận */}
        <div className="flex justify-between items-center w-full px-6">
          <div className="w-full md:w-3/5">
            <div className="flex items-center space-x-4">
              {/* Label "Ngày cấp" */}
              <label className="font-medium text-gray-700">
                Ngày cấp (hằng tháng):
              </label>
              
              {/* Date Picker */}
              <DatePicker
                selected={date}
                onChange={(date) => setDate(date)}
                className="p-3 border border-gray-300 rounded-lg w-32" // Điều chỉnh kích thước của ô nhập
                dateFormat="dd/MM"
                showMonthDropdown
                showYearDropdown={false} // Không cho phép chọn năm
                scrollableYearDropdown
              />
            </div>
          </div>

          {/* Nút xác nhận */}
          <button
            onClick={handleSubmit}
            className="mt-4 md:mt-0 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition duration-200"
          >
            Xác nhận
          </button>
        </div>

        {/* Số trang mặc định */}
        <div className="overflow-x-auto w-full mt-6">
          <table className="min-w-full table-auto bg-gray-50 rounded-lg shadow-sm mx-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-6 text-center font-medium text-gray-700">
                  Loại giấy
                </th>
                <th className="py-3 px-6 text-center font-medium text-gray-700">
                  Số trang mặc định
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(quantities).map((paperType) => (

                  <PaperTypeRow
                    paperType={paperType}
                    quantity={quantities[paperType]}
                    onChange={handleChange}
                  />
         
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between px-5 mt-16 mb-4 max-md:mt-10">
          <BackButton onClick={() => window.history.back()} />
      </div>
    </div>
  );
}

export default DefaultPageSet;