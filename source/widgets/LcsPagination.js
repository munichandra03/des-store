/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { DOTS, usePagination } from "@/hooks/use-pagination";
import { Icons, LcsPaginationStyles } from "@/consts/style.consts";
// import { APP } from "@/consts/app.const";

const LcsPagination = ({
  uiconfig,
  onPageChange,
  totalCount,
  siblingCount = 1,
  currentPage,
  pageSize,
}) => {
  const {
    root,
    ul,
    previous,
    next,
    dots,
    current,
    disabled,
    srOnly,
    currentColor,
    iconColor,
  } = LcsPaginationStyles;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];

  return (
    <nav className={root()}>
      <ul className={ul()}>
        <li>
          <button
            className={`${previous()} ${currentPage === 1 ? disabled() : ""}`}
            disabled={currentPage === 1}
            onClick={onPrevious}
          >
            <span className={srOnly()}>Previous</span>
            <Icons.Previous
              varient={currentPage === 1 ? iconColor : currentColor}
            />
          </button>
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === DOTS) {
            return (
              <li key={index}>
                <button className={dots()}>&#8230;</button>
              </li>
            );
          }
          return (
            <li key={index}>
              <button
                className={current()}
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            </li>
          );
        })}

        <li>
          <button
            className={next()}
            onClick={onNext}
            disabled={currentPage === lastPage}
          >
            <span className={srOnly()}>Next</span>
            <Icons.Next
              varient={currentPage === lastPage ? iconColor : currentColor}
            />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default LcsPagination;

/*
**
Usage: LcsPagination
import LcsPagination from "../new_components/LcsPagination";

let PageSize = 50;


  //Manage LcsPagination State
  const [currentPage, setCurrentPage] = useState(1);

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage]);

  <LcsPagination
    uiconfig={LcsPaginationData.uiconfig}
    currentPage={LcsPaginationData.content.currentPage}
    totalCount={LcsPaginationData.content.totalCount}
    pageSize={LcsPaginationData.content.PageSize}
    onPageChange={LcsPaginationData.actions[0].action}
  />
**
**/
