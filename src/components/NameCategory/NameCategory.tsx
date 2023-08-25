import React, { ReactNode } from 'react';
import styles from "./NameCategory.module.scss";
import classNames from "classnames/bind";
interface GlobalStyleProps {
    children: ReactNode;
    active?: boolean
  }
const cx = classNames.bind(styles)
const NameCategory:React.FC<GlobalStyleProps> = ({children, active = false}) => {
    return (
        <div className={cx('name-cate', active ? 'active' : '')}>
            {children}
        </div>
    );
};

export default NameCategory;