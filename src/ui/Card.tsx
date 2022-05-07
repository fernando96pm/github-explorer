import React, { FC } from "react";

const Card: FC<{ children: React.ReactNode}> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-black w-[95%] md:w-[60%] border-slate-600 rounded-2xl shadow-slate-400 shadow-sm mx-auto mt-4 md:mt-6 p-4 mb-4 md:mb-10 max-w-[450px]">
      {children}
    </div>
  );
};
export default Card;
