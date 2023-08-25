import React, { ReactNode } from 'react';
import styles from "./TitleOption.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
interface GlobalStyleProps {
    children: ReactNode;
    className?: string
}
const TitleOption:React.FC<GlobalStyleProps> = ({children, className}) => {
    return (
        <div className={cx('title', className)}>
            {children}
        </div>
    );
};

export default TitleOption;