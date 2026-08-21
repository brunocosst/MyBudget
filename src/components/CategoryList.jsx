function CategoryList({ categories }) {
  return (
    <section className="categories">
      <h2>Gastos por categoria</h2>

      <div className="category-list">
        {categories.map((category) => (
          <div className="category-item" key={category.name}>
            <span>{category.name}</span>

            <strong>
              {category.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategoryList