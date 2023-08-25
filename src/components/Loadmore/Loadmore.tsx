import React, { ReactNode, useState } from "react";
import styles from "./Loadmore.module.scss";
import classNames from "classnames/bind";
import Button from "../Button/Button";
const cx = classNames.bind(styles);

interface GlobalStyleProps {
  className?: string;
  children: ReactNode;
  setItems: React.Dispatch<React.SetStateAction<number>>;
  items: number;
}

const Loadmore: React.FC<GlobalStyleProps> = ({ items, setItems }) => {
    
  const handleLoadmore = () => {
    setItems(items + 4);
  };

  return (
    <div className={cx("loadmore")}>
      <span onClick={handleLoadmore}>Xem thêm</span>
    </div>
  );
};

export default Loadmore;
