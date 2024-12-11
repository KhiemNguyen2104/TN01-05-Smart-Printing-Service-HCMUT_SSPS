import React from "react";

const PrinterCard = ({ name, image, state, onToggle }) => (
  <div className="flex flex-col items-center border border-gray-300 rounded-lg bg-white shadow-lg overflow-hidden w-full max-md:w-full transition-all duration-300 hover:scale-105">
    <div className="bg-white-900 p-4 w-full aspect-square flex items-center justify-center border-b border-gray-300">
      <img loading="lazy" src={image} alt={`${name} preview`} className="object-contain max-h-full max-w-full" />
    </div>
    <div className="p-4 bg-neutral-700 text-white flex flex-col items-center w-full">
      <h2 className="text-lg font-medium">{name}</h2>
      <div className="flex gap-4 mt-4 w-full justify-between">
        <button className="text-sm text-sky-400 hover:underline" aria-label={`View details for ${name}`}>
          Chi tiết ›
        </button>
        <button
          onClick={onToggle}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
            state ? "bg-[#00A65A] hover:bg-green-600" : "bg-[#DD4B39] hover:bg-red-600"
          } hover:scale-105 hover:shadow-md`}
        >
          {state ? "Bật" : "Tắt"}
        </button>
      </div>
    </div>
  </div>
);

export default PrinterCard;