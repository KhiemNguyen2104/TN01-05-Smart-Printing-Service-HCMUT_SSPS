import React from "react";
import PrinterCard from "./ManagePrinterCard";

const PrinterList = ({ printers, onToggle }) => (
  <div className="flex justify-center mt-6 w-full">
    <div className="grid grid-cols-4 gap-20 max-w-full max-md:grid-cols-1 max-md:gap-20">
      {printers.map((printer) => (
        <PrinterCard
          key={printer.printer_id}
          name={printer.printer_name}
          image={printer.image}
          state={printer.is_enable}
          onToggle={() => onToggle(printer.printer_id)}
        />
      ))}
    </div>
  </div>
);

export default PrinterList;