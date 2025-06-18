import { useEffect } from "react";
import { useState } from "react";

function useLocalStorage(key, valorInicial) {
  const [valor, setValor] = useState(() => {
    const valorAlmacenado = localStorage.getItem(key);
    return valorAlmacenado ? JSON.parse(valorAlmacenado) : valorInicial;
  });

  useEffect(()=>{
    localStorage.setItem(key, JSON.stringify(valor));
  }, [key, valor]);

  return [valor, setValor];
}

export default useLocalStorage;