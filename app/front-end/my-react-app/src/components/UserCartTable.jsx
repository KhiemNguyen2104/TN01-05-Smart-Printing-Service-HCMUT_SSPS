import * as React from "react";
import UserCartItem from "./UserCartItem";
import UserCartSearchBar from "./UserCartSearchBar";

// Modal Component
function TransactionModal({ transaction, onClose, onConfirm }) {
    if (!transaction) return null;
  
    const unitPrice = 300; // Đơn giá mỗi trang (VND)
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
              <strong>Loại giấy:</strong> {transaction.paperType}
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
              onClick={() => onConfirm(transaction.id)}
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    );
}  

// Delete Confirmation Modal
function DeleteConfirmationModal({ transaction, onClose, onConfirm }) {
    if (!transaction) return null;
  
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 w-96">
          <h2 className="text-lg font-bold mb-4">Xác nhận xóa</h2>
          <p>
            Bạn có chắc chắn muốn xóa giao dịch{" "}
            <strong>{transaction.id}</strong> không? Hành động này không thể hoàn
            tác.
          </p>
          <div className="mt-6 flex justify-end space-x-4">
            <button
              className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600"
              onClick={() => onConfirm(transaction.id)}
            >
              Xóa
            </button>
          </div>
        </div>
      </div>
    );
}
  

function UserCartTable() {
    const [cart, setCart] = React.useState([
      { id: "TR00001", paperType: "A4", quantity: 10, date: "13/10/2024" },
      { id: "TR00002", paperType: "A4", quantity: 5, date: "14/10/2024" },
      { id: "TR00003", paperType: "A5", quantity: 25, date: "28/11/2024" },
      { id: "TR00004", paperType: "A4", quantity: 10, date: "29/11/2024" },
      { id: "TR00005", paperType: "A3", quantity: 3, date: "29/11/2024" },
      { id: "TR00006", paperType: "A4", quantity: 10, date: "30/11/2024" },
    ]);
  
    const [searchTerm, setSearchTerm] = React.useState("");
    const [selectedTransaction, setSelectedTransaction] = React.useState(null);
    const [transactionToDelete, setTransactionToDelete] = React.useState(null); // Lưu giao dịch cần xóa
  
    const filteredTransactions = cart.filter((transaction) =>
      Object.values(transaction).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  
    const handleSearch = (term) => {
      setSearchTerm(term);
    };
  
    const handleDelete = (id) => {
      setCart(cart.filter((transaction) => transaction.id !== id));
      setTransactionToDelete(null); // Đóng modal
    };
  
    const handleDeleteRequest = (transaction) => {
      setTransactionToDelete(transaction); // Hiển thị modal xác nhận
    };
  
    const handleDeleteCancel = () => {
      setTransactionToDelete(null); // Đóng modal xác nhận
    };
  
    const handlePay = (transaction) => {
      setSelectedTransaction(transaction);
    };
  
    const handleModalClose = () => {
      setSelectedTransaction(null);
    };
  
    const handleModalConfirm = (id) => {
      alert(`Đã thanh toán giao dịch: ${id}`);
      setCart(cart.filter((transaction) => transaction.id !== id));
      setSelectedTransaction(null);
    };
  
    return (
      <div className="flex flex-col space-y-6">
        {/* Search Bar */}
        <div className="p-4 bg-gray-100 rounded-lg shadow">
          <UserCartSearchBar onSearch={handleSearch} />
        </div>
  
        {/* Transaction List */}
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
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((transaction) => (
                  <UserCartItem
                    key={transaction.id}
                    id={transaction.id}
                    type={transaction.paperType}
                    amount={transaction.quantity}
                    date={transaction.date}
                    onDelete={() => handleDeleteRequest(transaction)}
                    onPay={() => handlePay(transaction)}
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
  
        {/* Delete Confirmation Modal */}
        <DeleteConfirmationModal
          transaction={transactionToDelete}
          onClose={handleDeleteCancel}
          onConfirm={handleDelete}
        />
      </div>
    );
}
  

export default UserCartTable;