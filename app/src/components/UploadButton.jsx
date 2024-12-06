import * as React from "react";

const UploadButton = () => {
  const handleUpload = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <button 
      onClick={handleUpload}
      className="flex gap-1 sm:gap-2 px-6 sm:px-6 py-3 sm:py-3 text-base sm:text-lg font-bold text-white bg-emerald-600 rounded-xl sm:rounded-xl shadow-sm hover:bg-blue-500 max-md:px-3"
      aria-label="Tải tài liệu lên"
    >
      <div className="my-auto">Tải lên</div>
      <img 
        loading="lazy" 
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/4acfe8118af2572a8b0be4cd0670d5074b6391fe0ff7f9bdd744ac0eb6453dbe?placeholderIfAbsent=true&apiKey=5d88e23e39534e2998da369f1c9984ec" 
        className="object-contain shrink-0 aspect-square w-[25px]" 
        alt="" 
      />
      <input 
        type="file" 
        id="fileInput" 
        className="hidden" 
        accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx"
        aria-label="Chọn tài liệu để tải lên"
      />
    </button>
  );
};

export default UploadButton;