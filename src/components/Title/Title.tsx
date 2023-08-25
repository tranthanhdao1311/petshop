import React, { ReactNode } from 'react';
import styles from "./Title.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
interface GlobalStyleProps {
    children: ReactNode;
    className?: string
}
const Title:React.FC<GlobalStyleProps> = ({children, className}) => {
    return (
        <div className={cx('title', className)}>
            <span>{children}</span>
        </div>
    );
};

export default Title;