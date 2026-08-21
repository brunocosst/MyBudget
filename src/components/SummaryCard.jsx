function SummaryCard({ total }) {
  return (
    <section className="summary-card">
      <span>Gasto no mês</span>
      <h2>
        {total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </h2>
    </section>
  )
}

export default SummaryCard