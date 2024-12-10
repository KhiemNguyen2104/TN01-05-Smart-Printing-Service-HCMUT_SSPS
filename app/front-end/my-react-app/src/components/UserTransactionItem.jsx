import React from "react";

function UserTransactionItem({ id, status, date, onDelete }) {
  const statusMap = {
    Successful: "Thành công",
    Fail_Pending: "Đang chờ",
    Fail_Cancel: "Đã hủy",
  };

  const statusClasses = {
    "Thành công": "text-green-600",
    "Đang chờ": "text-yellow-600",
    "Đã hủy": "text-red-600",
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4">{id}</td>
      <td className={`p-4 ${statusClasses[statusMap[status]] || "text-gray-600"}`}>
        {statusMap[status] || "Không xác định"}
      </td>
      <td className="p-4">{date}</td>
      <td className="p-4">
        <button
          className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default UserTransactionItem;
