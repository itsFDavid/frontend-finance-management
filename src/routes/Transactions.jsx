"use client"

import { useState } from "react"
import TransactionItem from "../atoms/TransactionItem"
import { useCategory } from "../context/CategoryContext"
import { useTransaction } from "../context/TransactionContext"
import { toast } from "react-hot-toast"
import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"

const Transactions = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { transactions, createTransaction } = useTransaction()
  const { categories } = useCategory()
  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("") // "ingreso", "egreso", o ""
  const [filterCategory, setFilterCategory] = useState("") // categoryId o ""

  const handleAddTransaction = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) {
      toast.error("Debes iniciar sesión para agregar transacciones")
      return
    }

    const type = e.target.type.value
    const categoryId = e.target.category.value

    if (!categoryId) {
      toast.error("Por favor selecciona una categoría")
      return
    }

    const transactionData = {
      description,
      amount: Number.parseFloat(amount),
      type,
      categoryId,
    }

    try {
      await createTransaction(transactionData)
      setDescription("")
      setAmount("")
      e.target.reset()
    } catch (error) {
      console.error("Error al agregar transacción:", error)
      toast.error("Error al agregar transacción: " + (error.message || "Error desconocido"))
    }
  }


  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      // Filtro por descripción
      const matchesDescription =
        !searchTerm.trim() || transaction.description.toLowerCase().includes(searchTerm.toLowerCase())

      // Filtro por tipo
      const matchesType = !filterType || transaction.type === filterType

      // Filtro por categoría
      const matchesCategory = !filterCategory || (transaction.categoryId || transaction.category) === filterCategory

      // Debe cumplir todos los criterios
      return matchesDescription && matchesType && matchesCategory
    })
  }

  const filteredTransactions = getFilteredTransactions()

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleTypeFilterChange = (e) => {
    setFilterType(e.target.value)
  }

  const handleCategoryFilterChange = (e) => {
    setFilterCategory(e.target.value)
  }

  const clearAllFilters = () => {
    setSearchTerm("")
    setFilterType("")
    setFilterCategory("")
  }

  const hasActiveFilters = searchTerm || filterType || filterCategory

  return (
    <main className="flex flex-col items-center justify-center bg-slate-100 ">
      <form onSubmit={handleAddTransaction} className="w-fit m-3 p-3 flex flex-col items-end">
        <h1 className="text-center text-3xl text-slate-500 mb-4 w-full">Movimientos</h1>

        <div className="flex gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-900 font-bold mb-2">
                Descripcion del movimiento
              </label>
              <textarea
                name="description"
                id=""
                rows={4}
                placeholder="Compra de supermercado, pago de servicios, etc."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                className="border border-slate-100 border-b-slate-500 focus:outline-none focus:border-b-slate-900 w-[300px] mb-2 py-1.5 px-2"
              ></textarea>
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-900 font-bold mb-2">
                Monto a registrar
              </label>
              <input
                type="number"
                name="amount"
                id=""
                placeholder="1000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min={1}
                className="border border-slate-100 border-b-slate-500 focus:outline-none focus:border-b-slate-900 w-[300px] mb-2 py-1.5 px-2"
              />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-900 font-bold mb-2">
                Tipo de movimiento
              </label>
              <select
                name="type"
                id=""
                required
                className="border border-slate-100 border-b-slate-500 focus:outline-none focus:border-b-slate-900 w-[300px] mb-2 py-1.5 px-2"
              >
                <option value="ingreso">Ingreso</option>
                <option value="egreso">Egreso</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="" className="text-slate-900 font-bold mb-2">
                Categoria
              </label>
              <select
                name="category"
                id=""
                required
                className="border border-slate-100 border-b-slate-500 focus:outline-none focus:border-b-slate-900 w-[300px] mb-2 py-1.5 px-2"
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-slate-600 text-white px-3 py-1 rounded my-2 cursor-pointer w-fit hover:bg-pink-900"
        >
          Agregar
        </button>
        <p className="w-full text-center text-sm text-slate-400">Ingresa un movimiento nuevo</p>
      </form>

      <section className="w-full max-w-4xl rounded-lg p-4 flex flex-col items-start mb-8">
        <div className="w-full bg-white/50 p-4 rounded-lg shadow-sm mb-4">
          <h3 className="text-lg font-semibold text-slate-700 mb-3">Filtros</h3>

          <div className="flex flex-wrap gap-4 items-end">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">Buscar por descripción</label>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                className="border border-slate-300 focus:outline-none focus:border-slate-500 p-2 rounded w-64"
                placeholder="Buscar por descripción"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">Tipo de movimiento</label>
              <select
                value={filterType}
                onChange={handleTypeFilterChange}
                className="border border-slate-300 focus:outline-none focus:border-slate-500 p-2 rounded w-48"
              >
                <option value="">Todos los tipos</option>
                <option value="ingreso">Ingresos</option>
                <option value="egreso">Egresos</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label className="text-sm font-medium text-slate-600 mb-1">Categoría</label>
              <select
                value={filterCategory}
                onChange={handleCategoryFilterChange}
                className="border border-slate-300 focus:outline-none focus:border-slate-500 p-2 rounded w-48"
              >
                <option value="">Todas las categorías</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="bg-slate-500 hover:bg-slate-600 text-white px-4 py-2 rounded text-sm"
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {hasActiveFilters && (
            <div className="flex flex-wrap gap-2 mt-3">
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  Descripción: "{searchTerm}"
                </span>
              )}
              {filterType && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  Tipo: {filterType === "ingreso" ? "Ingresos" : "Egresos"}
                </span>
              )}
              {filterCategory && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  Categoría: {categories.find((cat) => cat._id === filterCategory)?.name}
                </span>
              )}
            </div>
          )}
        </div>

        <div className="w-full flex justify-between items-center mb-4">
          <div className="text-sm text-slate-600">
            {filteredTransactions.length} de {transactions.length} transacciones
            {hasActiveFilters && " (filtradas)"}
          </div>
        </div>

        <div className="w-full flex justify-between items-center mb-4">
          <ul className="w-full overflow-y-auto h-130 max-h-130 max-sm:h-110 max-sm:max-h-110">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((transaction, index) => (
                <TransactionItem key={transaction._id || index} transaction={transaction} />
              ))
            ) : (
              <li className="text-center text-slate-500 py-8">
                {hasActiveFilters
                  ? "No se encontraron transacciones que coincidan con los filtros aplicados"
                  : "No hay transacciones"}
              </li>
            )}
          </ul>
        </div>
      </section>
    </main>
  )
}

export default Transactions
