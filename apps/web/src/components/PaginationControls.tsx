type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  itemLabel: string;
  onPageChange: (page: number) => void;
};

function getVisiblePages(currentPage: number, totalPages: number) {
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const halfWindow = Math.floor(maxVisiblePages / 2);
  const start = Math.max(
    1,
    Math.min(currentPage - halfWindow, totalPages - maxVisiblePages + 1),
  );

  return Array.from({ length: maxVisiblePages }, (_, index) => start + index);
}

export default function PaginationControls({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  itemLabel,
  onPageChange,
}: PaginationControlsProps) {
  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  const visiblePages = getVisiblePages(currentPage, totalPages);
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalItems);

  return (
    <nav className="pagination" aria-label={`${itemLabel} pagination`}>
      <p>
        Showing {startItem}-{endItem} of {totalItems} {itemLabel}
      </p>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          &lt;&lt;
        </button>
        <button
          className="pagination-button"
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          &lt;
        </button>

        {visiblePages.map((page) => (
          <button
            className={`pagination-button ${page === currentPage ? "pagination-button-active" : ""}`}
            type="button"
            key={page}
            onClick={() => onPageChange(page)}
            aria-current={page === currentPage ? "page" : undefined}
          >
            {page}
          </button>
        ))}

        <button
          className="pagination-button"
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          &gt;
        </button>
        <button
          className="pagination-button"
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          &gt;&gt;
        </button>
      </div>
    </nav>
  );
}
