import * as React from "react";

const FileListItem = ({ icon, fileName, date }) => {
  return (
    <div 
      className="flex flex-wrap gap-3 sm:gap-5 justify-between px-3 sm:px-6 py-1.5 sm:py-2 mt-2 sm:mt-2 w-full text-black border-solid bg-zinc-300 bg-opacity-0 border-b-[1px] sm:border-b-[1.5px] border-neutral-400 tracking-[2px] sm:tracking-[1.96px]"
      role="listitem"
    >
      <div className="flex gap-5">
        <img 
          loading="lazy" 
          src={icon} 
          className="object-contain shrink-0 aspect-[0.83] w-[20px]" 
          alt={`${fileName} icon`} 
        />
        <div className="my-auto basis-auto text-base sm:text-base">{fileName}</div>
      </div>
      <div className="my-auto text-right text-xs sm:text-sm text-base">{date}</div>
    </div>
  );
};

export default FileListItem;