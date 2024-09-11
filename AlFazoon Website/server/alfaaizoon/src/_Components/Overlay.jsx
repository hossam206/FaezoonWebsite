import React from "react";

export default function Overlay({ title }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[#0003] backdrop-blur-2xl z-40">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="text-2xl text-textColor font-medium flex flex-row items-center">
          <div className="w-14 h-14 overflow-hidden ">
            <img
              src="/images/loader.svg"
              loading="lazy"
              className="w-full h-full"
            />
          </div>
          {title}...
        </div>
      </div>
    </div>
  );
}
