import React, { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  IconDefinition,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
const cx = classNames.bind(styles);
interface GlobalStyleProps {
  children?: ReactNode;
  className?: string;
  icon?: IconProp;
  onClick?: MouseEventHandler
  type: 'submit' | 'button'
}
const Button: React.FC<GlobalStyleProps> = ({ children, className, icon, onClick, type = 'button' }) => {
  return (
    <button className={cx("btn", className)} type={type} onClick={onClick}>
      {icon && (
        <FontAwesomeIcon
          className={cx("icon-btn")}
          icon={icon}
        ></FontAwesomeIcon>
      )}

      <span className={cx("title-btn")}>{children}</span>
    </button>
  );
};

export default Button;
