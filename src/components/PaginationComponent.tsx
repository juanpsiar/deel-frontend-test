import React from 'react'
import '../styles/Pagination.css'

interface PaginationProps {
  allDataCounter: number
  setRowsByPage?: (data: any) => void
  setPageIndex?: (data: any) => void
  rowsByPage?: number
  pageIndex?: number
  arrayOptionsRows?: number[]
}

const PaginationComponent = ({ allDataCounter }: PaginationProps) => {
  const pages = Array.from({ length: allDataCounter }, (_, index) => index + 1)

  console.log({ pages })
  return (
    <div className="pagination-container">
      <button>Prev</button>
      <div className="page-list">
        {pages.map((itemNumber, index) => (
          <div className="page-item" id={`${itemNumber}-${index}`}>
            {itemNumber}
          </div>
        ))}
      </div>
      <button>Next</button>
    </div>
  )
}

export default PaginationComponent
