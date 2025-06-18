import React from "react";

const CardQuickSee = ({ color, children, amount, description }) => {
  const formattedAmount =
    typeof amount === "number"
      ? amount.toLocaleString("es-MX", { style: "currency", currency: "MXN" })
      : amount;

  return (
    <div className="flex flex-col w-2/8 bg-slate-800 p-1 rounded-md shadow text-white max-sm:w-full max-sm:p-2">
      <h2
        className={`flex gap-2 justify-center text-2xl items-center text-${color}`}
      >
        {children} {formattedAmount}
      </h2>
      <p className="text-center">{description}</p>
    </div>
  );
};

export default CardQuickSee;
