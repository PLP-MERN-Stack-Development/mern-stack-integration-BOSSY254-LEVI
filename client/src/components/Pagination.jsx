// client/src/components/Pagination.jsx
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pageNumbers = []
  
  // Determine which page numbers to show
  let startPage = Math.max(1, currentPage - 2)
  let endPage = Math.min(totalPages, startPage + 4)
  
  if (endPage - startPage < 4) {
    startPage = Math.max(1, endPage - 4)
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <div className="pagination">
      <button 
        className="pagination-btn" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1}
      >
        Previous
      </button>
      
      {startPage > 1 && (
        <>
          <button className="pagination-btn" onClick={() => onPageChange(1)}>1</button>
          {startPage > 2 && <span className="pagination-ellipsis">...</span>}
        </>
      )}
      
      {pageNumbers.map(number => (
        <button 
          key={number} 
          className={`pagination-btn ${currentPage === number ? 'active' : ''}`}
          onClick={() => onPageChange(number)}
        >
          {number}
        </button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
          <button className="pagination-btn" onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}
      
      <button 
        className="pagination-btn" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  )
}