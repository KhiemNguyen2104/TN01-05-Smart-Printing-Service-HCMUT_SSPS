import React from "react";

const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex justify-center items-center aspect-square w-[50px] rounded-full bg-blue-500 hover:bg-blue-700 transition duration-300 ease-in-out"
      aria-label="Quay lại"
    >
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/418456a93a8bc63c140775bc87ff11bdf9b45661cd50d7071cbfb965253e8fe4?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec"
        alt="Quay lại"
      />
    </button>
  );
};

export default BackButton;
