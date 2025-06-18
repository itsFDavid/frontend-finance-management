import { createContext } from "react";
import { AuthContext } from "./AuthContext";
import { useContext } from "react";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useEffect } from "react";
import { useCallback } from "react";
import { useRoute } from "./RouteContext";

const TransactionContext = createContext();
const URL_API = "http://localhost:3001";

const TransactionProvider = ({ children }) => {
  const [transactions, setTransactions] = useState([]);
  const [income, setIncome] = useState(0);
  const [outflow, setOutflow] = useState(0);
  const [balance, setBalance] = useState(0);
  // console.log('Transactions:', transactions);
  const { token } = useContext(AuthContext);
  const { setRuta } = useRoute();

  const calculateTotals = useCallback((transactionsList) => {
    const getIncome = transactionsList
      .filter((t) => t.type === "ingreso")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const getOutflow = transactionsList
      .filter((t) => t.type === "egreso")
      .reduce((acc, t) => acc + Number(t.amount), 0);

    const getBalance = getIncome - getOutflow;

    setIncome(getIncome);
    setOutflow(getOutflow);
    setBalance(getBalance);
  }, []);

  const getAllTransactions = useCallback(async () => {

    if (!token) {
      toast.error("No autorizado. Por favor inicia sesión.");
      setRuta("/login");
      return;
    }

    try {
      const response = await fetch(`${URL_API}/transaction`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log('Response:', response);
      if (!response.ok) {
        if (response.status === 401) {
          toast.error("No autorizado. Por favor, inicia sesión nuevamente.");
          setRuta("/login");
        } else if (response.status === 403) {
          toast.error(
            "Acceso denegado. No tienes permiso para ver las transacciones."
          );
          setRuta("/login");
        } else if (response.status === 404) {
          toast.error("No se encontraron transacciones.");
        } else {
          toast.error("Error al obtener las transacciones");
        }
        return;
      }

      const data = await response.json();
      const sortedData = data.sort(
        (a, b) =>
          new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt)
      );
      setTransactions(sortedData);
      calculateTotals(sortedData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Error al obtener las transacciones");
    }
  }, [token, calculateTotals, setRuta]);

  // const getTransactionByDate = async (date) => {};
  // const getTransactionByCategoryId = async (categoryId) => {};
  // const getTransactionByIncome = async () => {};
  // const getTransactionByOutflow = async () => {};

  const createTransaction = async (transactionData) => {

    if (!token) {
      toast.error("No autorizado. Por favor inicia sesión.");
      setRuta("/login");
      return;
    }

    try {
      const response = await fetch(`${URL_API}/transaction`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("No autorizado. Por favor, inicia sesión nuevamente.");
          setRuta("/login");
          throw Error("No autorizado");
        } 
        if (response.status === 403) {
          toast.error(
            "Acceso denegado. No tienes permiso para ver las transacciones."
          );
          setRuta("/login");
          throw Error("Acceso denegado");
        }
        if (response.status === 400) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Error al crear la transacción");
        }
        throw new Error("Error al crear la transacción");
      }

      const data = await response.json();
      await getAllTransactions();
      // const newTransactions = [...transactions, data];
      // setTransactions(newTransactions);
      // calculateTotals(newTransactions);
      toast.success("Transacción creada exitosamente");
      return data;
    } catch (error) {
      console.error("Error creating transaction:", error);
      toast.error(error.message || "Error al crear la transacción");
    }
  };

  useEffect(() => {
    if (token) {
      getAllTransactions();
    }
  }, [getAllTransactions, token]);

  const data = {
    transactions,
    setTransactions,
    getAllTransactions,
    // getTransactionByDate,
    // getTransactionByCategoryId,
    // getTransactionByIncome,
    // getTransactionByOutflow,
    createTransaction,
    income,
    outflow,
    balance,
  };

  return (
    <TransactionContext.Provider value={data}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);

export { TransactionContext, TransactionProvider };
