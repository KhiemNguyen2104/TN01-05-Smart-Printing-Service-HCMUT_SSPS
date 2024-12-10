import React, { useEffect, useState } from "react";
import UserTransactionItem from "./UserTransactionItem";
import UserTransactionSearchBar from "./UserTransactionSearchBar";

function UserTransactionTable() {
  const [transactions, setTransactions] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    const fetchTransactions = async () => {
      const current_user = JSON.parse(localStorage.getItem("currentUser"));
      if (!current_user) {
        console.error("No current user found in localStorage");
        return;
      }

      const url = `http://localhost:3001/transaction/history/${current_user.user_id}`;
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
          const formattedData = data.map((transaction, index) => ({
            id: `T${index + 1}`,
            status: transaction.state,
            date: new Date(transaction.time).toLocaleString(),
          }));
          setTransactions(formattedData);
        } else {
          console.error("Failed to fetch transactions:", response.status);
        }
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions
    ? transactions.filter((transaction) =>
        Object.values(transaction).some((value) =>
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
    : [];

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    setShowModal(false);
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedTransaction(null);
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <UserTransactionSearchBar onSearch={handleSearch} />
      </div>
      <div className="bg-white rounded-lg shadow">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 font-medium text-gray-600">Mã giao dịch</th>
              <th className="p-4 font-medium text-gray-600">Trạng thái</th>
              <th className="p-4 font-medium text-gray-600">Ngày giao dịch</th>
              <th className="p-4 font-medium text-gray-600">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions && filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction) => (
                <UserTransactionItem
                  key={transaction.id}
                  id={transaction.id}
                  status={transaction.status}
                  date={transaction.date}
                  onDelete={() => openModal(transaction)}
                />
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-gray-500">
                  Không có giao dịch nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Xác nhận xóa
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa giao dịch{" "}
              <span className="font-bold">{selectedTransaction?.id}</span>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(selectedTransaction.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTransactionTable;