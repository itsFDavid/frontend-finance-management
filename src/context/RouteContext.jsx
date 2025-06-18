import { createContext, useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import Dashboard from "../routes/Dashboard";
import Login from "../routes/Login";
import Categories from "../routes/Categories";
import Transactions from "../routes/Transactions";
import NotFound from "../routes/NotFound";
import { useEffect } from "react";

const RouteContext = createContext();
const rutasProtegidas = ["/", "/categories", "/transactions"];

export const RouteProvider = ({ children }) => {
  const [ruta, setRuta] = useState("/");
  const [navVisibility, setNavVisibility] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    if (!isAuthenticated) {
      setNavVisibility(false);
    } else if (ruta === "/login") {
      setNavVisibility(false);
    } else {
      setNavVisibility(true);
    }
  }, [ruta, isAuthenticated]);

  const asignarComponente = () => {
    if (rutasProtegidas.includes(ruta) && !isAuthenticated) {
      return <Login />;
    }

    switch (ruta) {
      case "/":
        return <Dashboard />;
      case "/login":
        return <Login />;
      case "/categories":
        return <Categories />;
      case "/transactions":
        return <Transactions />;
      default:
        return <NotFound />;
    }
  };

  return (
    <RouteContext.Provider
      value={{
        ruta,
        setRuta,
        asignarComponente,
        navVisibility,
        setNavVisibility,
      }}
    >
      {children}
    </RouteContext.Provider>
  );
};

export const useRoute = () => useContext(RouteContext);
