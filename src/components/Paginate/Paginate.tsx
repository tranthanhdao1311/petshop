import React, { useEffect, useState } from "react";
import styles from "./Paginate.module.scss";
import classNames from "classnames/bind";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
interface GlobalStyleProps {
  data: any;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  itemsPerPage: number
}
const cx = classNames.bind(styles);
const Paginate: React.FC<GlobalStyleProps> = ({ data, setCurrentPage, itemsPerPage }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);


  useEffect(() => {
    if (!data || data.length < 0) return;
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [data, itemOffset, itemsPerPage]);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    setItemOffset(newOffset);
    setCurrentPage(event.selected + 1);
  };
  return (
    <ReactPaginate
      className={cx("paging")}
      breakLabel="..."
      nextLabel={<FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon>}
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      activeClassName={cx("selected")}
      pageCount={pageCount}
      previousLabel={<FontAwesomeIcon icon={faChevronLeft}></FontAwesomeIcon>}
      renderOnZeroPageCount={null}
    />
  );
};

export default Paginate;
