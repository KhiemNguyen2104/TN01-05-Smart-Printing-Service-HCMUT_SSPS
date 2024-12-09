import * as React from "react";
import UserTransactionItem from "./UserTransactionItem";
import UserTransactionSearchBar from "./UserTransactionSearchBar";

function UserTransactionTable() {
  const [transactions, setTransactions] = React.useState([
    { id: "TR00001", status: "Thành công", date: "13/10/2024" },
    { id: "TR00002", status: "Đang xử lý", date: "14/10/2024" },
    { id: "TR00003", status: "Thất bại", date: "15/10/2024" },
    { id: "TR00004", status: "Thành công", date: "16/10/2024" },
    { id: "TR00005", status: "Đang xử lý", date: "17/10/2024" },
    { id: "TR00006", status: "Thành công", date: "18/10/2024" },
  ]);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState(null);

  // Xử lý tìm kiếm
  const filteredTransactions = transactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleDelete = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
    setShowModal(false); // Đóng modal sau khi xóa
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
      {/* Search Bar */}
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <UserTransactionSearchBar onSearch={handleSearch} />
      </div>

      {/* Transaction List */}
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
            {filteredTransactions.length > 0 ? (
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
                  Không tìm thấy giao dịch
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Xác nhận */}
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