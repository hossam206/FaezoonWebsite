import React, { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa6";

function PopUpMassage({ children }) {
  const [Pop_up_Massage, showPop_up_Massage] = useState(false);
  useEffect(() => {
    showPop_up_Massage(true);
    setTimeout(() => {
      showPop_up_Massage(false);
    }, 2000);
  }, [children]);
  return (
    <div
      className={`fixed top-36  w-auto h-auto px-4 py-2 rounded-l-md bg-green-600 text-white  capitalize transition-transform duration-300  z-20 ${
        Pop_up_Massage ? "translate-x-0  right-0" : "translate-x-full -right-2 "
      }`}
    >
      {children && (
        <div className="flex flex-row items-center gap-2">
          <FaCheck className="font-semibold" />
          <p className="font-medium text-[15px]">{children}</p>
        </div>
      )}
    </div>
  );
}

export default PopUpMassage;
