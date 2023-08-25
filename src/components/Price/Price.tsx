import React, { ReactNode } from 'react';
import styles from "./Price.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GlobalStyleProps {
    children: ReactNode,
    className?: string
}

const Price: React.FC<GlobalStyleProps> = ({ children, className }) => {
    return (
        <span className={cx('price', className)}>
            {children}
        </span>
    );
};

export default Price;