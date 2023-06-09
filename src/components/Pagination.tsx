import React from 'react'
import '../styles/Pagination.css'
import { Info } from '../models/interfaces/character.interface'

interface PaginationProps {
  allDataCounter: Info | undefined
  pageIndex: number
  setPageIndex?: (data: any) => void
}

const Pagination = ({ allDataCounter, setPageIndex, pageIndex }: PaginationProps) => {
  const pages = Array.from({ length: allDataCounter!.pages }, (_, index) => index + 1)
  return (
    <div className="pagination-container">
      <button
        disabled={!(allDataCounter!.prev?.length > 0)}
        onClick={setPageIndex ? () => setPageIndex(pageIndex - 1) : () => {}}>
        Prev
      </button>
      <div className="page-list">
        {pages.map((itemNumber, index) => (
          <div
            className={pageIndex === itemNumber ? 'page-item-selected': "page-item"}
            id={`${itemNumber}-${index}`}
            onClick={setPageIndex ? () => setPageIndex(itemNumber): ()=>{}}>
            {itemNumber}
          </div>
        ))}
      </div>
      <button
        disabled={!(allDataCounter!.next?.length > 0)}
        onClick={setPageIndex ? () => setPageIndex(pageIndex + 1) : () => {}}>
        Next
      </button>
    </div>
  )
}

export default Pagination
