import React from "react";

function UserCartItem({ id, type, amount, date, onDelete, onPay }) {

  return (
    <tr className="hover:bg-gray-50">
      <td className="p-4">{id}</td>
      <td className="p-4">{type}</td>
      <td className="p-4">{amount}</td>
      <td className="p-4">{date}</td>
      <td className="p-4">
        <button
          className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
          onClick={() => onPay({ id, paperType: type, quantity: amount, date })}
        >
          Thanh toán
        </button>
        <button
          className="ml-2 px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
          onClick={() => onDelete(id)}
        >
          Xóa
        </button>
      </td>
    </tr>
  );
}

export default UserCartItem;
