import { useState } from "react";
import Dashboard from "../routes/Dashboard";
import Login from "../routes/Login";
import Categories from "../routes/Categories";
import Transactions from "../routes/Transactions";
import NotFound from "../routes/NotFound";



const useCustomRoute = () => {
  const [ ruta, setRuta ] = useState("/");
  
  const asignarComponente = () => {
    if(ruta == "/") {
      return <Dashboard />;
    }else if  (ruta == "/login") {
      return <Login />;
    }else if (ruta == "/categories") {
      return <Categories />;
    } else if (ruta == "/transactions") {
      return <Transactions />;
    }
    else {  
      return <NotFound />;
    }
  }

  return { setRuta, asignarComponente}
};

export default useCustomRoute;
// TO-DO: regresar un componente y el setRuta para poder cambiar la ruta desde el componente