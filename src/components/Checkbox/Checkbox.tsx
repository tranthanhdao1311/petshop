import React from "react";
import styles from "./Checkbox.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
interface GlobalStyleProps {
  children: string | number;
  className?: string;
  // name: string;
  onClick?: () => void;
  onChange?: (event?: any) => void;
  checked?: any;
  value?: any;
}
const Checkbox: React.FC<GlobalStyleProps> = ({
  children,
  className,
  // name,
  checked,
  value,
  onClick,
  onChange,
  ...rest
}) => {
  return (
    <label
      onClick={onClick}
      className={cx("checkbox", className)}>
      <input
        checked={checked}
        className={cx("hidden-input")}
        type="checkbox"
        onChange={onChange}

      ></input>
      <label
        onChange={onChange}

        className={cx("custom-input", checked && "checked")}
      ></label>

      <span> {children}</span>
    </label>
  );
};

export default Checkbox;
