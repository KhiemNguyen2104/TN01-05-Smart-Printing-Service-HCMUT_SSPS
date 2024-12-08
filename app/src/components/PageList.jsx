import * as React from "react";
import FileListItem from "./FileListItem";

const PageList = ({ files }) => {
  return (
    <div
      className="w-full h-[280px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-sm px-4 py-2"
      style={{
        scrollbarWidth: "thin", // Thanh cuộn mỏng
        scrollbarColor: "#c1c1c1 transparent", // Màu của thanh cuộn
      }}
    >
      {files.map((file, index) => (
        <FileListItem
          key={`${file.fileName}-${index}`}
          icon={file.icon}
          fileName={file.fileName}
          date={file.date}
        />
      ))}
    </div>
  );
};

export default PageList;
