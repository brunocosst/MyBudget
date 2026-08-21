import { useState } from 'react'

function ExpenseForm({
  onAddExpense,
  onEditExpense,
  onClose,
  expense,
}) {
  const [description, setDescription] = useState(
    expense?.description || ''
  )

  const [value, setValue] = useState(
    expense?.value || ''
  )

  const [category, setCategory] = useState(
    expense?.category || 'Alimentação'
  )

  function handleSubmit(event) {
    event.preventDefault()

    if (!description || !value) {
      return
    }

    if (expense) {
      const updatedExpense = {
        ...expense,
        description,
        value: Number(value),
        category,
      }

      onEditExpense(updatedExpense)
    } else {
      const newExpense = {
        id: Date.now(),
        description,
        value: Number(value),
        category,
      }

      onAddExpense(newExpense)
    }

    onClose()
  }

  return (
    <div className="form-overlay">
      <form className="expense-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h2>
            {expense ? 'Editar despesa' : 'Nova despesa'}
          </h2>

          <button
            type="button"
            className="close-button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <label>
          Descrição

          <input
            type="text"
            placeholder="Ex: Mercado"
            value={description}
            onChange={(event) =>
              setDescription(event.target.value)
            }
          />
        </label>

        <label>
          Valor

          <input
            type="number"
            placeholder="Ex: 150"
            min="0"
            step="0.01"
            value={value}
            onChange={(event) =>
              setValue(event.target.value)
            }
          />
        </label>

        <label>
          Categoria

          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value)
            }
          >
            <option>Alimentação</option>
            <option>Transporte</option>
            <option>Lazer</option>
            <option>Assinaturas</option>
            <option>Saúde</option>
            <option>Casa</option>
            <option>Outros</option>
          </select>
        </label>

        <button
          type="submit"
          className="save-button"
        >
          {expense ? 'Salvar alterações' : 'Salvar despesa'}
        </button>
      </form>
    </div>
  )
}

export default ExpenseForm