import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "../components/NarbarSystem";
import BackButton from "../components/BackButton";

function AcceptRow({ fileType, state, onChange }) {
  const handleToggle = () => {
    onChange(fileType, state === "on" ? "off" : "on"); // Pass fileType and newState to the parent to update the state
  };

  return (
    <tr className="border-b border-gray-200">
      <td className="py-3 px-6 text-center">
        <label className="text-lg text-gray-700">{fileType}</label>
      </td>
      <td className="py-3 px-6 text-center">
        <button
          onClick={handleToggle} // Trigger the toggle in the parent component
          className={`px-10 py-3 text-xl rounded-lg text-white font-semibold transition-all duration-200 ${
            state === "on" ? "bg-green-500 hover:bg-green-600" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {state === "on" ? "Bật" : "Tắt"} {/* Button text */}
        </button>
      </td>
    </tr>
  );
}


const FileListPrinciples = () => {
  const [types, setTypes] = useState({
    PDF: "on",
    DOC: "on",
    PPT: "off",
    XLSX: "on",
  });

  const [value, setValue] = useState(0); // Initial value is 0

  const handleSubmit = () => {
    alert("Đơn hàng đã được xác nhận!");
    // Bạn có thể xử lý logic gửi đơn hàng tại đây
  };

  const handleChangeSize = (e) => {
    const newValue = e.target.value;
    if (!isNaN(newValue)) {
      setValue(newValue);
    }
  };

  const handleToggle = (fileType, newState) => {
    setTypes((prevState) => ({
      ...prevState,
      [fileType]: newState, // Cập nhật trạng thái cho fileType
    }));
  };

  return (
    <div className="max-md:px-5 max-md:max-w-full w-4/5 mx-auto">
      <Navbar />
      <div className="flex flex-col items-center pt-5 pb-9 mt-8 w-full bg-white rounded-2xl shadow-lg border border-solid border-neutral-300">
        {/* Ngày cấp và Nút xác nhận */}
        <div className="flex justify-between items-center w-full px-6">
          <div className="w-full md:w-3/5">
            <div className="flex items-center space-x-4">
              {/* Label "Ngày cấp" */}
              <label className="font-medium text-gray-700">
                Kích thước tệp tối đa (MB):
              </label>
              <input
                type="number"
                id="numberInput"
                value={value}
                onChange={handleChangeSize}
                className="w-20 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="0"
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
                  Loại tệp
                </th>
                <th className="py-3 px-6 text-center font-medium text-gray-700">
                  trạng thái
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(types).map((fileType) => (
                <AcceptRow
                  fileType={fileType} // Truyền đúng fileType
                  state={types[fileType]} // Truyền trạng thái tương ứng với fileType
                  onChange={handleToggle} // Truyền hàm để thay đổi trạng thái
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex justify-between mt-16 max-md:mt-10">
          <BackButton onClick={() => window.history.back()} />
        </div>
    </div>
  );
};

export default FileListPrinciples;
