import React from "react";

function UserTransactionItem({ id, status, date, onDelete }) {
  const statusClasses = {
    "Thành công": "text-green-600",
    "Đang xử lý": "text-yellow-600",
    "Thất bại": "text-red-600",
  };

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4">{id}</td>
      <td className={`p-4 ${statusClasses[status] || "text-gray-600"}`}>
        {status}
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
