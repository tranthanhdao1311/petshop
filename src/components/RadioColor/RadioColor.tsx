import React, { ReactNode } from "react";
import styles from "./RadioColor.module.scss";
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
  style: any
}
const RadioColor: React.FC<GlobalStyleProps> = ({
  children,
  className,
  name,
  checked,
  value,
  control,
  onClick,
  style,
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
        {...field}
        value={value}
        {...rest}
      ></input>
      <div className={cx("content-radio", checked && "checked")}  style={style}>
      </div>
    </label>
  );
};

export default RadioColor;
