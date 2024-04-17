/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'

interface usePaginationProps <S>{
    data:  Array<S> | ((callback: (data: S[]) => void) => Promise<Array<S>> | Promise<void>)
    recordsPerPage: number
}

interface PaginationProps {
  defaultText?: string
  pagStyles?: {
    container?: string
    nav?: string
    buttonLeft?: string
    buttonRight?: string
    countPages?: string
    list?: string
    currentPage?: string
    allPages?: string
    svg?: string
  },
}


function usePagination<T,>({ data, recordsPerPage }: usePaginationProps<T>): [(PaginationProps: PaginationProps) => React.JSX.Element, Array<T>]  {
  
    const [current, setCurrent] = useState(1);

    const lastIndex = current * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    let records: Array<T> = [];
    let npage: number, numbers: number[], allPages: number;

    if (typeof data === 'function') {
      (async () => {
        await data(callback => {
          records = callback.slice(firstIndex, lastIndex);
          npage = Math.ceil(callback.length / recordsPerPage);
          numbers = [...Array(npage + 1).keys()].slice(1);
          allPages = numbers.length;
    
        })
      })()
    } else {
      
      //todo: Fix this with he hook to allow data from api
      records = data.slice(firstIndex, lastIndex);
      npage = Math.ceil(data.length / recordsPerPage);
      numbers = [...Array(npage + 1).keys()].slice(1);
      allPages = numbers.length;
    }
  
    function prevPage() {
      if (current !== 1) {
        setCurrent(current - 1);
      }
    }

  
    function nextPage() {
      if (current !== npage) {
        setCurrent(current + 1);
      }
    }


    const Component = ({defaultText, pagStyles }: PaginationProps) => {
      return records.length >= 1 ? (
        <div className={pagStyles ? pagStyles.container: ""}>
      <nav aria-label="Pagination" className={pagStyles ? pagStyles.nav: ""}>
        <ul className={pagStyles ? pagStyles.list: ""}>
          {current !== 1 && (
            <li>
              <a
                onClick={prevPage}
                className={pagStyles ? pagStyles.buttonLeft: ""}
              >
                <svg
                  className={pagStyles?.svg}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          )}
          <li>
            <span className={pagStyles ? pagStyles.countPages : ""}>
              Page <b className={pagStyles ? pagStyles.currentPage: "" }>{current}</b> of{" "}
              <b className={pagStyles ? pagStyles.allPages: ""}>{allPages}</b>
            </span>
          </li>
          {current !== allPages && records.length > 1 && (
            <li>
              <a
                onClick={nextPage}
                className={pagStyles ? pagStyles.buttonRight: ""}
              >
                <svg
                  className={pagStyles?.svg}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </li>
          )}
        </ul>
      </nav>
    </div>
      ) : (<><div className="flex text-center">{defaultText ? defaultText : 'No records'}</div></>)
    }


    return [Component, records];
}
  
export default usePagination;