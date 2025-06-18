// import useCustomRoute from "../hooks/useCustomRoute";

import { DollarSign } from "lucide-react";
import { ArrowUp } from "lucide-react";
import { ArrowDown } from "lucide-react";
import CardQuickSee from "../atoms/CardQuickSee";
import TransactionItem from "../atoms/TransactionItem";
import { useTransaction } from "../context/TransactionContext";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRoute } from "../context/RouteContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { transactions, income, outflow, balance } = useTransaction();
  const { isAuthenticated } = useContext(AuthContext);
  const { setRuta } = useRoute();

  // Si no está autenticado, redirigir a login
  if (!isAuthenticated) {
    setRuta("/login");
    toast.error("Por favor, inicia sesión para acceder al dashboard.");
    return;
  }



  // const transactions = [
  //   {
  //     description: "Pago de internet",
  //     categoryName: "Servicios",
  //     amount: 525,
  //     type: "egreso",
  //     date: "03/06/2025",
  //   },
  //   {
  //     description: "Salario Mensual",
  //     categoryName: "Ingresos",
  //     amount: 15200,
  //     type: "ingreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Compra del supermercado",
  //     categoryName: "Alimentación",
  //     amount: 3000,
  //     type: "egreso",
  //     date: "02/06/2025",
  //   },
  //   {
  //     description: "Pago de alquiler",
  //     categoryName: "Vivienda",
  //     amount: 800,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de servicios públicos",
  //     categoryName: "Servicios",
  //     amount: 200,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de suscripción mensual",
  //     categoryName: "Entretenimiento",
  //     amount: 50,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de transporte",
  //     categoryName: "Transporte",
  //     amount: 100,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de seguro médico",
  //     categoryName: "Salud",
  //     amount: 150,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de educación",
  //     categoryName: "Educación",
  //     amount: 200,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de entretenimiento",
  //     categoryName: "Entretenimiento",
  //     amount: 100,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de suscripción mensual",
  //     categoryName: "Entretenimiento",
  //     amount: 50,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de transporte",
  //     categoryName: "Transporte",
  //     amount: 100,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de seguro médico",
  //     categoryName: "Salud",
  //     amount: 150,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  //   {
  //     description: "Pago de educación",
  //     categoryName: "Educación",
  //     amount: 200,
  //     type: "egreso",
  //     date: "01/06/2025",
  //   },
  // ];
  return (
    <>
      <main className="p-8">
        {/* Contenido del dashboard */}
        <section className="flex justify-between items-center mb-4 bg-slate-100 p-4 rounded-lg shadow max-sm:flex-col max-sm:gap-3 ">
          {/* Vista rapida */}
          <CardQuickSee
            color="emerald-300"
            amount={income}
            description="Gasto de ingreso"
          >
            <ArrowUp />
          </CardQuickSee>

          <CardQuickSee
            color="red-300"
            amount={outflow}
            description="Gasto de egreso"
          >
            <ArrowDown />
          </CardQuickSee>

          <CardQuickSee
            color="blue-300"
            amount={balance}
            description="Balance total"
          >
            <DollarSign />
          </CardQuickSee>
        </section>

        <section className="mb-4 bg-slate-100 p-4 rounded-lg shadow">
          {/* Ultimos 6 gastos */}
          <div className="flex justify-between items-center mb-4 md:flex-wrap">
            <h3 className="text-2xl text-slate-800 mb-2">
              Ultimos 6 movimientos
            </h3>
            {/* <p className="text-slate-600 text-2xl font-bold">
              Total:
              <span className="font-bold text-s m-2">$1,200.00</span>
            </p> */}
          </div>
          <ul className="flex flex-col gap-2 space-y-4 overflow-y-auto h-130 max-h-130 max-sm:h-110 max-sm:max-h-110">
            {
              transactions.length > 0 ? (
                transactions.slice(0, 6).map((transaction) => (
                  <TransactionItem
                    key={transaction._id}
                    transaction={transaction}
                  />
                ))
              ) : (
                <p className="text-slate-500 text-center">
                  No hay transacciones recientes.
                </p>
              )
            }
          </ul>
          <p className="text-emerald-300 text-red-300 text-blue-300 hidden"></p>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
