import React, { useEffect, useState } from "react";
import UserCartItem from "./UserCartItem";
import UserCartSearchBar from "./UserCartSearchBar";


// Modal Component
function TransactionModal({ transaction, onClose, onConfirm }) {
  if (!transaction) return null;

  const unitPrice = transaction.price; // Đơn giá mỗi trang (từ API)
  const vatRate = 0.1; // VAT 10%

  // Tính toán thành tiền
  const subtotal = unitPrice * transaction.quantity; // Thành tiền chưa có VAT
  const vatAmount = subtotal * vatRate; // Tính VAT
  const totalAmount = subtotal + vatAmount; // Thành tiền sau VAT

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Chi tiết giao dịch</h2>
        <div className="space-y-2">
          <p>
            <strong>Mã giao dịch:</strong> {transaction.id}
          </p>
          <p>
            <strong>Loại giấy:</strong> {transaction.page_type}
          </p>
          <p>
            <strong>Số lượng:</strong> {transaction.quantity}
          </p>
          <p>
            <strong>Ngày giao dịch:</strong> {transaction.date}
          </p>
          <p>
            <strong>Đơn giá:</strong> {unitPrice} VND/trang
          </p>
          <p>
            <strong>VAT (10%):</strong> {vatAmount.toFixed(0)} VND
          </p>
          <p>
            <strong>Thành tiền:</strong> {totalAmount.toFixed(0)} VND
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => onConfirm(transaction)}
          >
            Thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}

function CancleTransactionModal({ transaction, onClose, onConfirmCancle }) {
  if (!transaction) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Hủy giao dịch</h2>
        <div className="space-y-2">
          <p>
            Bạn có chắc chắn muốn hủy giao dịch <strong>{transaction.id}</strong> ?
          </p>
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Không
          </button>
          <button
            className="px-4 py-2 text-sm text-white bg-green-500 rounded hover:bg-green-600"
            onClick={() => onConfirmCancle(transaction)}
          >
            Hủy giao dịch
          </button>
        </div>
      </div>
    </div>
  );
}

function NotificationModal({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-bold mb-4">Thông báo</h2>
        <p>{message}</p>
        <div className="mt-6 flex justify-end">
          <button
            className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={onClose}
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}

function UserCartTable() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [cancleTransaction, setCancleTransaction] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [cancelMessage, setCancelMessage] = useState("");
  const [allSuccessMessage, setAllSuccessMessage] = useState("");

  // Fetch data from API
  useEffect(() => {
    const fetchCart = async () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      if (!currentUser) {
        console.error("No current user found in localStorage");
        return;
      }

      const url = `http://localhost:3001/transaction/history/${currentUser.user_id}`;
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });

        if (response.ok) {
          const data = await response.json();
          const filteredData = data
            .filter((transaction) => transaction.state === "Fail_Pending")
            .map((transaction, index) => ({
              id: `TR${index + 1}`,
              page_type: transaction.page_type,
              quantity: transaction.no_of_pages,
              time: new Date(transaction.time).toISOString(),
              date: new Date(transaction.time).toLocaleString(),
              price: transaction.price,
            }));
          setCart(filteredData);
        } else {
          console.error("Failed to fetch cart:", response.status);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const filteredCart = cart.filter((transaction) =>
    Object.values(transaction).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handlePay = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const handleCancle = (transaction) => {
    setCancleTransaction(transaction);
  };

  const handleModalClose = () => {
    setSelectedTransaction(null);
  };

  const handleCancleModalClose = () => {
    setCancleTransaction(null);
  };

  const handleModalConfirm = async (transaction) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Cannot find current user's info");
      return;
    }

    const bodyData = {
      student_id: currentUser.user_id,
      no_of_pages: transaction.quantity,
      page_type: transaction.page_type,
      state: "Successful",
      time: transaction.time,
    };

    try {
      const response = await fetch("http://localhost:3001/transaction/commit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        setCart(cart.filter((transactions) => transactions.id !== transaction.id));
        setSuccessMessage(`Giao dịch ${transaction.id} đã được thanh toán thành công!`);
        setSelectedTransaction(null);
      } else {
        console.error("Lỗi khi thanh toán:", response.status);
        alert("Thanh toán thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi kết nối khi thanh toán:", error);
      alert("Không thể kết nối đến máy chủ.");
    }
  };

  const handleCancleModalConfirm = async (transaction) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Cannot find current user's info");
      return;
    }

    const bodyData = {
      student_id: currentUser.user_id,
      no_of_pages: transaction.quantity,
      page_type: transaction.page_type,
      state: "Fail_Cancel",
      time: transaction.time,
    };

    try {
      const response = await fetch("http://localhost:3001/transaction/commit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(bodyData),
      });

      if (response.ok) {
        setCart(cart.filter((transactions) => transactions.id !== transaction.id));
        setCancelMessage(`Giao dịch ${transaction.id} đã được hủy thành công!`);
        setCancleTransaction(null);
      } else {
        console.error("Lỗi khi hủy giao dịch:", response.status);
        alert("Hủy giao dịch thất bại, vui lòng thử lại.");
      }
    } catch (error) {
      console.error("Lỗi kết nối khi hủy giao dịch:", error);
      alert("Không thể kết nối đến máy chủ.");
    }
  };

  const handlePayAll = async () => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
      alert("Cannot find current user's info");
      return;
    }

    const allTransactions = cart;
    let allProcessed = true;
    // Loop through each transaction and commit
    for (const transaction of allTransactions) {
      const bodyData = {
        student_id: currentUser.user_id,
        no_of_pages: transaction.quantity,
        page_type: transaction.page_type,
        state: "Successful",
        time: transaction.time,
      };

      try {
        const response = await fetch("http://localhost:3001/transaction/commit", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
          body: JSON.stringify(bodyData),
        });

        if (response.ok) {
          // setCart(cart.filter((transactions) => transactions.id !== transaction.id));
          console.log("Đã hủy giao dịch: ");
        } else {
          allProcessed = false;
          console.error("Lỗi khi thanh toán:", response.status);
          alert("Thanh toán thất bại cho giao dịch: " + transaction.id);
          break;
        }
      } catch (error) {
        console.error("Lỗi kết nối khi thanh toán:", error);
        alert("Không thể kết nối đến máy chủ.");
        break;
      }
    }

    // If all transactions are processed successfully, show success message
    if (allProcessed) {
      setCart([]);
      setAllSuccessMessage("Tất cả giao dịch đã được thanh toán thành công!");
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <UserCartSearchBar onSearch={handleSearch} />
      </div>

      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 font-medium text-gray-600">Mã giao dịch</th>
              <th className="p-4 font-medium text-gray-600">Loại giấy</th>
              <th className="p-4 font-medium text-gray-600">Số lượng</th>
              <th className="p-4 font-medium text-gray-600">Ngày giao dịch</th>
              <th className="p-4 font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredCart.length > 0 ? (
              filteredCart.map((transaction) => (
                <UserCartItem
                  key={transaction.id}
                  id={transaction.id}
                  type={transaction.page_type}
                  amount={transaction.quantity}
                  date={transaction.date}
                  onPay={() => handlePay(transaction)}
                  onCancle={() => handleCancle(transaction)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-gray-500">
                  Không tìm thấy thông tin trong giỏ hàng
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Payment Modal */}
      <TransactionModal
        transaction={selectedTransaction}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
      />

      {/* Cancle Payment Modal */}
      <CancleTransactionModal
        transaction={cancleTransaction}
        onClose={handleCancleModalClose}
        onConfirmCancle={handleCancleModalConfirm}
      />

      <NotificationModal
        message={successMessage}
        onClose={() => setSuccessMessage("")}
      />
      <NotificationModal
        message={cancelMessage}
        onClose={() => setCancelMessage("")}
      />
      <NotificationModal
        message={allSuccessMessage}
        onClose={() => setAllSuccessMessage("")}
      />

      {/* Button to pay all transactions */}
      <div className="flex justify-end mt-4">
        <button
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          onClick={handlePayAll}
        >
          Thanh toán tất cả
        </button>
      </div>
    </div>
  );
}

export default UserCartTable;