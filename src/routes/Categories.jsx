import { useState } from "react";
import { useCategory } from "../context/CategoryContext";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Categories = () => {
  const [categoryName, setCategoryName] = useState("");
  const { categories, createCategory, setCategories } = useCategory()
  const { isAuthenticated } = useContext(AuthContext);

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.error("Por favor, inicia sesión para crear una categoría.");
      return;
    }

    try {
      const newCategory = await createCategory({ name: categoryName });
      if (newCategory) {
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setCategoryName("");
      }
    } catch (error) {
      toast.error("Error al crear la categoría" + error.message);
    }
  }

  
  return (
    <main className="flex flex-col items-center justify-center bg-slate-100 h-screen">
      <form 
        onSubmit={handleSubmit}
        className="w-fit m-2 p-3 flex flex-col items-end">
        <h1 className="text-center text-3xl text-slate-500 mb-4 w-full">Categorias</h1>
        <div className="flex flex-col">
          <label htmlFor="" className="text-slate-900 font-bold mb-2">Nombre de la categoria</label>
          <input
            type="text"
            name="name"
            id=""
            placeholder="Gastos de casa"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            required
            className="border border-slate-100 border-b-slate-500 focus:outline-none focus:border-b-slate-900 w-[300px] mb-2 py-1.5 px-2"
          />
        </div>

        <button className="bg-slate-600 text-white px-3 py-1 rounded my-2 cursor-pointer w-fit hover:bg-pink-900">Agregar</button>
        <p className="w-full text-center text-sm text-slate-400">Ingresa una categoria nueva</p>
      </form>

      <ul className="shadow w-8/10 p-2 overflow-y-auto h-130 max-h-130 max-sm:h-110 max-sm:max-h-110">
        {/* <li className="w-full px-2 border-b border-b-slate-500 text-slate-700">NombreCategoriaEjemplo</li> */}
        {
          categories.length > 0 ? (
            categories.map((category) => (
              <li key={category._id} className="w-full px-2 border-b border-b-slate-500 text-slate-700">
                {category.name}
              </li>
            ))
          ) : (
            <p className="text-slate-500 text-center">No hay categorias disponibles</p>
          )
        }
        {/* Agregar un boton para eliminar la categoria */}
      </ul>
    </main>
  );
};

export default Categories;
