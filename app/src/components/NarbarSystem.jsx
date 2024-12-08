import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto px-4 py-3">
        {/* Danh sách các lựa chọn */}
        <ul className="flex justify-between">
          <li className="flex-1 border-r border-gray-200 text-center">
            <a href="/default" className="text-lg text-black font-bold hover:text-gray-900 py-2 px-4 block">
              Số trang mặc định
            </a>
          </li>
          <li className="flex-1 border-r border-gray-200 text-center">
            <a href="/manage" className="text-lg text-black font-bold hover:text-gray-900 py-2 px-4 block">
              Máy in
            </a>
          </li>
          <li className="flex-1 text-center">
            <a href="/principle" className="text-lg text-black font-bold hover:text-gray-900 py-2 px-4 block">
              Loại tệp in
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
