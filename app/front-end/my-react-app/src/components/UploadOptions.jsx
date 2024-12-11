import * as React from "react";

const uploadOptions = [
  { id: 'device', label: 'Từ thiết bị' },
  { id: 'drive', label: 'Từ Google Drive' }
];

export function UploadOptions() {
  return (
    <nav className="flex flex-col mt-12 text-2xl tracking-wider text-black max-md:mt-10" role="navigation" aria-label="Upload options">
      {uploadOptions.map((option) => (
        <button
          key={option.id}
          className="px-4 py-6 bg-white border-b-2 border-solid border-b-neutral-400 max-md:pr-5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={option.label}
          tabIndex={0}
        >
          {option.label}
        </button>
      ))}
    </nav>
  );
}