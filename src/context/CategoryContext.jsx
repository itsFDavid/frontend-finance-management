import { useCallback } from 'react'
import React, { createContext } from 'react'
import { AuthContext } from './AuthContext'
import { useContext } from 'react'
import toast from 'react-hot-toast'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRoute } from "./RouteContext";

const CategoryContext = createContext()

const URL_API = 'http://localhost:3001'

const CategoryProvider = ({ children }) => {
  const { token } = useContext(AuthContext)
  const { setRuta } = useRoute();
  const [ categories, setCategories ] = useState([])


  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${URL_API}/category`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          toast.error("No autorizado. Por favor, inicia sesión nuevamente.");
          setRuta("/login");
        } else if (response.status === 403) {
          toast.error(
            "Acceso denegado. No tienes permiso para ver las categorias."
          );
          setRuta("/login");
        } else if (response.status === 404) {
          toast.error("No se encontraron categorias.");
        } else {
          toast.error("Error al obtener las categorias");
        }
        return
      }

      const data = await response.json()
      // console.log('Categorías obtenidas:', data)
      setCategories(data)
    } catch (error) {
      toast.error(error.message)
      console.error('Error fetching categories:', error)
    }
  }, [token, setCategories, setRuta])

  const createCategory = async (categoryData) => {
    try {
      console.log('Creating category with data:', categoryData)
      const response = await fetch(`${URL_API}/category`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(categoryData),
      })

      if (!response.ok) {
        if (response.status === 400) {
          const errorData = await response.json()
          toast.error(errorData.message || 'Error al crear la categoría')
        }
        toast.error('Error al crear la categoría')
        return null
      }

      const data = await response.json()
      return data
    } catch (error) {
      toast.error(error.message || 'Error al crear la categoría')
      console.error('Error creating category:', error)
    }
  }

  useEffect(() => {
    if (token) {
      fetchCategories()
    }
  }
  , [token, fetchCategories])


  const data = {
    fetchCategories,
    createCategory,
    categories,
    setCategories,
  }

  return (
    <CategoryContext.Provider value={data}>
      {children}
    </CategoryContext.Provider>
  )
}

export const useCategory = () => useContext(CategoryContext)
export { CategoryProvider, CategoryContext }
