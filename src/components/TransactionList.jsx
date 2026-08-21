function TransactionList({
  transactions,
  onDeleteExpense,
  onEditExpense,
}) {
  return (
    <section className="transactions">
      <h2>Últimos lançamentos</h2>

      {transactions.length === 0 ? (
        <p className="empty-state">
          Nenhum lançamento encontrado.
        </p>
      ) : (
        <div className="transaction-list">
          {transactions.map((transaction) => (
            <div
              className="transaction-item"
              key={transaction.id}
            >
              <div>
                <strong>{transaction.description}</strong>
                <span>{transaction.category}</span>
              </div>

              <div className="transaction-actions">
                <strong>
                  {transaction.value.toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </strong>

                <button
                  className="edit-button"
                  onClick={() =>
                    onEditExpense(transaction)
                  }
                >
                  Editar
                </button>

                <button
                  className="delete-button"
                  onClick={() =>
                    onDeleteExpense(transaction.id)
                  }
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default TransactionList