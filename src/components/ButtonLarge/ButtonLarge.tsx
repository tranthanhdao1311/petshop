import React, { MouseEventHandler, ReactNode } from "react";
import styles from "./ButtonLarge.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);
interface GlobalStyleProps {
  className?: string;
  children: ReactNode;
  type: 'submit' | 'button';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  to?: string,
  name?: string
}
const ButtonLarge: React.FC<GlobalStyleProps> = ({ type, children, className, to, onClick, name }) => {
  return (
    <>
      {to && <Link to={`${to}`}>
        <button type={type} name={name} className={cx("button", className)} >
          {children}
        </button>
      </Link>}
      {!to && <button onClick={onClick} name={name}  type={type} className={cx("button", className)} >
        {children}
      </button>}
    </>

  );
};

export default ButtonLarge;
