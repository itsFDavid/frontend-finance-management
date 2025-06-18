import useLocalStorage  from "../hooks/useLocalStorage";
import { createContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children}) => {

  const [token, setToken] = useLocalStorage("token", null);

  const login = (newToken) => {
    setToken(newToken);
  }

  const logout = () => {
    setToken(null);
  }

  const isAuthenticated = !!token; 
  // Verdadero si hay un token, falso si no

  const data = {
    token,
    login,
    logout,
    isAuthenticated
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider };