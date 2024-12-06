import React from "react";
import Header from "../components/Header";
// import PrinterCard from "../components/PrinterCard";

const ChoosingPrinters = () => {
  // const printers = [
  //   { name: "Printer Canon B4", details: "Chọn" },
  //   { name: "Máy in Canon tòa A2", details: "Chọn" },
  //   { name: "Máy in Canon tòa C4", details: "Chọn" },
  // ];

  return (
    <div className="flex flex-col pb-12 bg-white overflow-hidden">
      {/* Header */}
      <Header />
      <main className="flex flex-col px-14 mt-9 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex flex-wrap gap-5 justify-between max-md:max-w-full">
          <h1 className="my-2 text-3xl sm:text-3xl text-black font-semibold">
            Hệ thống in{" "}
            <span className="text-xs sm:text-sm text-neutral-400">
              CHỌN MÁY IN
            </span>
          </h1>
          {/* <UploadButton /> */}
        </div>
      </main>
    </div>
  );
};

export default ChoosingPrinters;
