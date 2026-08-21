import { useEffect, useState } from 'react'

import './App.css'

import SummaryCard from './components/SummaryCard'
import CategoryList from './components/CategoryList'
import TransactionList from './components/TransactionList'
import ExpenseForm from './components/ExpenseForm'

function App() {
  const [showForm, setShowForm] = useState(false)

  const [transactions, setTransactions] = useState(() => {
  const savedTransactions = localStorage.getItem('mybudget-transactions')

  if (savedTransactions) {
    return JSON.parse(savedTransactions)
  }

  return [
    {
      id: 1,
      description: "McDonald's",
      category: 'Alimentação',
      value: 52,
    },
    {
      id: 2,
      description: 'Academia',
      category: 'Saúde',
      value: 140,
    },
    {
      id: 3,
      description: 'Internet',
      category: 'Casa',
      value: 100,
    },
  ]
})

useEffect(() => {
  localStorage.setItem(
    'mybudget-transactions',
    JSON.stringify(transactions)
  )
}, [transactions])

  const categoryNames = [
    'Alimentação',
    'Transporte',
    'Lazer',
    'Assinaturas',
    'Saúde',
    'Casa',
    'Outros',
  ]

  const categories = categoryNames
  .map((categoryName) => {
    const total = transactions
      .filter(
        (transaction) =>
          transaction.category === categoryName
      )
      .reduce(
        (accumulator, transaction) =>
          accumulator + transaction.value,
        0
      )

    return {
      name: categoryName,
      value: total,
    }
  })
  .filter((category) => category.value > 0)

  const total = transactions.reduce(
    (accumulator, transaction) =>
      accumulator + transaction.value,
    0
  )

  const [editingExpense, setEditingExpense] = useState(null)

  function handleEditExpense(updatedExpense) {
  setTransactions((currentTransactions) =>
    currentTransactions.map((transaction) =>
      transaction.id === updatedExpense.id
        ? updatedExpense
        : transaction
    )
  )

  setEditingExpense(null)
}

  function handleAddExpense(newExpense) {
    setTransactions((currentTransactions) => [
      newExpense,
      ...currentTransactions,
    ])
  }

  function handleDeleteExpense(id) {
  setTransactions((currentTransactions) =>
    currentTransactions.filter(
      (transaction) => transaction.id !== id
    )
  )
}

const [selectedCategory, setSelectedCategory] = useState('Todas')

const filteredTransactions =
  selectedCategory === 'Todas'
    ? transactions
    : transactions.filter(
        (transaction) =>
          transaction.category === selectedCategory
      )

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>MyBudget</h1>
          <p>Controle simples dos seus gastos</p>
        </div>

        <button
          className="new-expense"
          onClick={() => setShowForm(true)}
        >
          + Nova despesa
        </button>
      </header>

      <main>
        <SummaryCard total={total} />

        <CategoryList categories={categories} />

        <div className="transaction-filter">
          <label htmlFor="category-filter">
            Filtrar por categoria
          </label>

          <select
            id="category-filter"
            value={selectedCategory}
            onChange={(event) =>
              setSelectedCategory(event.target.value)
            }
          >
            <option>Todas</option>
            <option>Alimentação</option>
            <option>Transporte</option>
            <option>Lazer</option>
            <option>Assinaturas</option>
            <option>Saúde</option>
            <option>Casa</option>
            <option>Outros</option>
          </select>
        </div>

        <TransactionList
          transactions={filteredTransactions}
          onDeleteExpense={handleDeleteExpense}
          onEditExpense={setEditingExpense}
        />
      </main>

      {showForm && (
          <ExpenseForm
            onAddExpense={handleAddExpense}
            onClose={() => setShowForm(false)}
          />
        )}

        {editingExpense && (
          <ExpenseForm
            expense={editingExpense}
            onEditExpense={handleEditExpense}
            onClose={() => setEditingExpense(null)}
          />
       )}
    </div>
  )
}

export default App