import React from "react";

const NavLi = ({setHook, children}) => {

  return (
    <li className="text-slate-400 hover:scale-105">
      <button
        onClick={setHook}
        className="flex items-center gap-2 hover:text-emerald-300 hover:cursor-pointer p-2 w-full text-left"
      >
        {children}
      </button>
    </li>
  );
};

export default NavLi;
