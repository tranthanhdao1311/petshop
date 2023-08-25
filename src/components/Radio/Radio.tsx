import React, { ReactNode } from "react";
import styles from "./Radio.module.scss";
import classNames from "classnames/bind";
import { useController } from "react-hook-form";

const cx = classNames.bind(styles);
interface GlobalStyleProps {
  children: string | number;
  className?: string;
  name: string;
  onClick?: () => void;
  onChange?: (event?:any) => void;
  checked?: any;
  value?: any;
  control:any;
}
const Radio: React.FC<GlobalStyleProps> = ({
  children,
  className,
  name,
  checked,
  value,
  control,
  onClick,
  ...rest
}) => {
  const { field } = useController({
    control,
    name,
  });
  return (
    <label className={cx("radio", className)}>
      <input
        checked={checked}   
        className={cx("hidden-input")}
        type="radio"
        onClick={onClick}
        {...field}
        value={value}
        {...rest}
      ></input>
      <span className={cx("content-radio", checked && "checked")}>
        {children}
      </span>
    </label>
  );
};

export default Radio;
