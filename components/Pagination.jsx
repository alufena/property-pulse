const Pagination = ({ page, pageSize, totalItems, onPageChange }) => {
  // props vindo de "\components\Properties.jsx"
  const totalPages = Math.ceil(totalItems / pageSize);
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      // evita de ir a uma página inexistente
      onPageChange(newPage); // "newPage" está sendo passado como um prop mais acima, que será chamado no componente "Properties" e que chamará handlePageChange, assim, faz setPage(newPage) e mudar a página corretamente
    }
  };
  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      <button
        className="mr-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === 1} // desabilita na página um (UX)
        onClick={() => handlePageChange(page - 1)}
      >
        Anterior
      </button>
      <span className="mx-2">
        Página {page} de {totalPages}
      </span>
      <button
        className="ml-2 px-2 py-1 border border-gray-300 rounded"
        disabled={page === totalPages} // desabilita na última página
        onClick={() => handlePageChange(page + 1)}
      >
        Próximo
      </button>
    </section>
  );
};

export default Pagination;
