import React from "react";

const NextButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center aspect-square w-[50px] rounded-full bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out"
      aria-label="Đi tới"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/d8f2529ddd2daabba2ac67f3d0595581d4fbd24688960dd5334b346ccbde9a80?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
        alt="Đi tới"
        className="hover:bg-blue-700 transition duration-300 ease-in-out"
      />
    </button>
  );
};

export default NextButton;
