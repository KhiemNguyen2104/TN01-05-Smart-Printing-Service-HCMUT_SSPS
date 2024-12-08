// Sidebar.jsx
import React, { useState } from "react";

const Sidebar = ({ menuItems, onItemClick }) => {
  const [activeItem, setActiveItem] = useState(menuItems[0]);

  const handleItemClick = (item) => {
    setActiveItem(item);
    if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <aside className="w-1/5 bg-gray-800 p-6 shadow-lg text-white overflow-y-auto">
      <ul className="space-y-0">
        {menuItems.map((item, index, array) => (
          <li
            key={item}
            className={`text-lg font-medium cursor-pointer p-2 rounded ${
              activeItem === item
                ? "bg-gray-700 text-white"
                : "hover:bg-gray-600 hover:text-white"
            }`}
            onClick={() => handleItemClick(item)}
            style={{
              borderBottom: index !== array.length - 1 ? "1px solid #4A5568" : "none",
            }}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;