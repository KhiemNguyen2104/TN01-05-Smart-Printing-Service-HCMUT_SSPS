import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto">
        {/* Danh sách các lựa chọn */}
        <ul className="flex justify-between items-center text-center divide-x divide-gray-300">
          <li className="flex-1">
            <a
              href="/default"
              className="block text-lg font-bold text-black py-4 hover:text-gray-900"
            >
              Số trang in mặc định
            </a>
          </li>
          <li className="flex-1">
            <a
              href="/manage"
              className="block text-lg font-bold text-black py-4 hover:text-gray-900"
            >
              Máy in
            </a>
          </li>
          <li className="flex-1">
            <a
              href="/principle"
              className="block text-lg font-bold text-black py-4 hover:text-gray-900"
            >
              Loại tệp in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;