// import './App.css'
// import Dashboard from "./routes/Dashboard";
// import Login from "./routes/Login";
// import Categories from "./routes/Categories";
// import Transactions from "./routes/Transactions";
// import NotFound from "./routes/NotFound";

import { ChartNoAxesCombined } from "lucide-react";
// import useCustomRoute from "./hooks/useCustomRoute";
import NavLi from "./atoms/NavLi";
import { ArrowLeftRight } from "lucide-react";
import { Blocks } from "lucide-react";
import { LogIn } from "lucide-react";
import { useRoute } from "./context/RouteContext";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useEffect } from "react";

function App() {
  // const { setRuta, asignarComponente } = useCustomRoute();
  const { setRuta, asignarComponente, navVisibility, setNavVisibility } = useRoute();
  const { logout, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
  if (!isAuthenticated) {
    setRuta("/login");
    setNavVisibility(false);
  }
}, [isAuthenticated, setNavVisibility, setRuta]);


  return (
    <>
      {/* Separar en componente, hacer hamburguesa en md */}
      {navVisibility && (
        <nav className="bg-slate-800 p-4 w-2/12 shadow h-screen fixed left-0 top-0 max-md:w-full max-md:h-15 max-md:flex-row max-md:justify-between max-md:items-center">
          <ul className="flex flex-col max-md:flex-row max-md:space-x-4 justify-between">
            <div className="flex flex-col max-md:flex-row max-md:items-center max-md:gap-4 md:h-[calc(100vh-80px)]">
              <NavLi setHook={() => setRuta("/")}>
                <ChartNoAxesCombined />
                Dashboard
              </NavLi>
              <NavLi setHook={() => setRuta("/categories")}>
                <Blocks />
                Categories
              </NavLi>
              <NavLi setHook={() => setRuta("/transactions")}>
                <ArrowLeftRight />
                Transactions
              </NavLi>
            </div>
            <NavLi
              setHook={() => {
                logout();
              }}
            >
              <LogIn />
              Logout
            </NavLi>
          </ul>
        </nav>
      )}
      <div
        className={`fixed ${
          navVisibility ? "left-1/6 top-0 w-5/6" : "left-0 top-0 w-full"
        } h-screen overflow-y-auto max-md:w-full max-md:left-0 max-md:top-20 max-md:h-[calc(100vh-80px)]`}
      >
        {asignarComponente()}
      </div>
    </>
  );
}

export default App;
