import * as React from "react";

const UserTransactionSearchBar = ({ onSearch, onSort }) => {
  const [showDropdown, setShowDropdown] = React.useState(false);

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleSortOption = (option) => {
    setShowDropdown(false); // Ẩn menu sau khi chọn
    // onSort(option); // Truyền giá trị sắp xếp lên thành phần cha
  };

  return (
    <div className="flex w-full items-center justify-between px-4 text-xl max-md:flex-col max-md:gap-4">
      {/* Ô tìm kiếm */}
      <form
        className="flex flex-grow text-neutral-400"
        onSubmit={(e) => e.preventDefault()}
      >
        <label htmlFor="searchInput" className="sr-only">
          Tìm kiếm giao dịch
        </label>
        <input
          type="search"
          id="searchInput"
          placeholder="Tìm kiếm theo mã, trạng thái hoặc ngày"
          onChange={(e) => onSearch(e.target.value)}
          className="w-full px-4 py-2 bg-white rounded-lg border border-gray-300 text-sm sm:text-lg"
        />
      </form>

      {/* Nút sắp xếp */}
      <div className="relative flex-shrink-0 text-black ml-4 max-md:ml-0">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-2 px-6 py-2 bg-white rounded-lg border border-gray-300 shadow-lg text-sm sm:text-lg hover:bg-gray-100"
          aria-label="Sắp xếp giao dịch"
        >
          <span>Sắp xếp theo</span>
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0ca5a5d2e8e7f86ff80631241f2360b6fdf0ff570e1331f8efecbfff1aea9eae?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
            className="w-4 h-4"
            alt=""
          />
        </button>

        {/* Dropdown menu */}
        {showDropdown && (
          <ul className="absolute top-12 right-0 bg-white text-base rounded-lg shadow-md w-48 border border-gray-300 z-10">
            <li
              onClick={() => handleSortOption("ID")}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:rounded-lg"
            >
              ID
            </li>
            <li
              onClick={() => handleSortOption("Ngày")}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:rounded-lg"
            >
              Ngày
            </li>
            <li
              onClick={() => handleSortOption("Thành tiền")}
              className="px-4 py-2 cursor-pointer hover:bg-blue-500 hover:rounded-lg"
            >
              Thành tiền
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserTransactionSearchBar;