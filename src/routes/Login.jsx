import { useState } from "react";
import ImagenLogin from "../img/login.svg";
import { useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { useRoute } from "../context/RouteContext";
import toast from "react-hot-toast";
const URL_API = "http://localhost:3001";

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { isAuthenticated, login } = useContext(AuthContext);
  const { setRuta } = useRoute();

  
  useEffect(() => {
    if (isAuthenticated) {
      setRuta("/");
    }
  }, [isAuthenticated, setRuta]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegister && password !== confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }
    const endpoint = isRegister ? "/user/register" : "/user/login";

    const res = await fetch(`${URL_API}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.ok && data.token) {
      login(data.token);
      setRuta("/");
    } else {
      toast.error(data.message || "Error al iniciar sesión o registrarse");
      console.error("Error:", data);
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }
  };


  return (
    <div className="w-screen h-full flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="w-9/12 h-8/10 bg-white/60 shadow-lg rounded-lg flex"
      >
        <img src={ImagenLogin} alt="" className="w-3/6 h-full" />
        <div className="flex justify-start flex-col w-4/6 px-3 items-start">
          <p className="w-full text-end text-slate-600 mt-2 top-0">
            {isRegister ? "¿Ya " : "¿No "} tienes una cuenta?
            <a
              onClick={() => setIsRegister(!isRegister)}
              className="ms-1 text-emerald-500 cursor-pointer hover:underline"
            >
              {isRegister ? "Inicia sesion" : "Registrate"}
            </a>
          </p>

          <h1
            className={`text-slate-600 text-xl w-full ${
              isRegister ? "mt-24" : "mt-20"
            }`}
          >
            {isRegister ? "Aun no" : "Ya"} tienes una cuenta
          </h1>
          <h2 className="text-slate-800 font-bold text-xl w-full mt-2">
            {isRegister ? "Registrate aqui" : "Inicia sesion aqui"}
          </h2>

          <div className="w-full flex flex-col my-2 items-start gap-2">
            <label htmlFor="email" className="text-slate-700 text-md">
              Correo electronico
            </label>
            <input
              type="email"
              id="email"
              onChange={e => setEmail(e.target.value)}
              placeholder="Ingresa tu correo electronico"
              required
              className="w-9/12 p-2 rounded shadow border border-slate-300 focus:outline-none focus:border-slate-500"
            />
          </div>

          <div className="w-full my-2 mb-4 items-start flex flex-col gap-2">
            <label htmlFor="password" className="text-slate-700 text-md">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              onChange={e => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              required
              className="w-9/12 p-2 rounded shadow border border-slate-300 focus:outline-none focus:border-slate-500"
            />
          </div>

          {isRegister && (
            <div className="w-full my-2 mb-4 items-start flex flex-col gap-2">
              <label htmlFor="password" className="text-slate-700 text-md">
                Confirma tu contraseña
              </label>
              <input
                type="password"
                id="password"
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
                required
                className="w-9/12 p-2 rounded shadow border border-slate-300 focus:outline-none focus:border-slate-500"
              />
            </div>
          )}

          <button className="bg-emerald-500 text-white p-2 rounded-md hover:bg-emerald-600 transition-colors cursor-pointer w-5/12">
            {isRegister ? "Registrarse" : "Iniciar Sesion"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
