import { ArrowUp } from "lucide-react";
import { ArrowDown } from "lucide-react";
import { useCategory } from "../context/CategoryContext";

const TransactionItem = ({ transaction }) => {
  const { categories } = useCategory();

  const color =
    transaction.type === "ingreso" ? "text-emerald-500" : "text-red-500";


  const getCategoryName = (categoryId) => {
    const cat = categories.find((c) => c._id === categoryId);
    return cat ? cat.name : "Sin categoría";
  };
  
  if (!transaction) return null;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Hoy";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Ayer";
    } else {
      return date.toLocaleDateString("es-MX", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    }
  }


  transaction.amount = transaction.amount.toLocaleString("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return (
    <li className="mb-2 bg-slate-200 p-2 rounded-md shadow flex items-center gap-3">
      {transaction.type == "ingreso" ? (
        <ArrowUp className={color} strokeWidth={3}/>
      ) : (
        <ArrowDown className={color} strokeWidth={3}/>
      )}
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col items-start">
          <h3 className="font-bold text-xl">{transaction.description}</h3>
          <small className="text-sky-600 text-sm">
            {getCategoryName(transaction?.category)}
          </small>
        </div>
        <div className="flex flex-col items-end">
          <p>
            <span className={`font-bold text-xl ${color}`}>
              {transaction.amount}
            </span>
          </p>
          <p className="text-slate-500">{formatDate(transaction.date)}</p>
        </div>
      </div>
    </li>
  );
};

export default TransactionItem;
