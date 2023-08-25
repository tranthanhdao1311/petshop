import React, { ReactNode } from 'react';
import styles from "./LabelInput.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GlobalStyleProps {
    children: ReactNode,
    htmlFor: string,
    className?: string
}

const LabelInput: React.FC<GlobalStyleProps> = ({ children, htmlFor, className }) => {
    return (
        <label htmlFor={htmlFor} className={cx('label', className)}>
            {children}
        </label>
    );
};

export default LabelInput;