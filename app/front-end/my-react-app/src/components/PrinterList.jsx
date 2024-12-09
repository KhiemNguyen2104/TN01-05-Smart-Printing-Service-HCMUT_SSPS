import * as React from "react";
import PrinterCard from "./PrinterCard";

const PrinterList = ({ printers, onPrinterClick }) => {
  return (
    <div className="flex justify-center mt-6 w-full">
      {/* Container for PrinterCards */}
      <div className="grid grid-cols-4 gap-20 max-w-full max-md:grid-cols-1 max-md:gap-20">
        {printers.map((printer) => (
          <PrinterCard
            key={printer.id}
            name={printer.name}
            image={printer.image}
            onCLick={onPrinterClick}
          />
        ))}
      </div>
    </div>
  );
};

export default PrinterList;
