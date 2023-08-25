import React, { useEffect, useState } from "react";
import styles from "./InputQuantity.module.scss";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { useController } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setAddToCart } from "../../store/app/slice";
const cx = classNames.bind(styles);
interface GlobalStyleProps {
  className?: string;
  value?: any;
  control: any;
  name: string;
  valueCart?: any
}



const InputQuantity: React.FC<GlobalStyleProps> = ({ control, name, valueCart }) => {
  const addToCart = useSelector((state: any) => state.app.addToCart)
  const dispatch = useDispatch()
  const { field } = useController({
    control,
    name,
    defaultValue: valueCart?.quantity,
  });

  const [value, setValue] = useState<number>(field.value);

  useEffect(() => {
    if (valueCart?.quantity !== undefined)
      setValue(valueCart?.quantity)



  }, [valueCart?.quantity]);

  const Increase = () => {
    if (value >= 15) {
      return;
    } else {
      setValue(value + 1);
      const updateQuantity = addToCart.map((item: any) => item.id === Number(name) && item.color === valueCart.color && item.kichthuoc === valueCart.kichthuoc ? ({ ...item, quantity: valueCart.quantity && valueCart.quantity + 1 }) : item)
      dispatch(setAddToCart(updateQuantity))
      localStorage.setItem('cart', JSON.stringify(updateQuantity))
    }
  };

  const Decrease = () => {
    if (value > 1) {
      setValue(value - 1);
      const updateQuantity = addToCart.map((item: any) => item.id === Number(name) && item.color === valueCart.color ? ({ ...item, quantity: valueCart.quantity && valueCart.quantity - 1 }) : item)
      dispatch(setAddToCart(updateQuantity))
      localStorage.setItem('cart', JSON.stringify(updateQuantity))

    } else return;
  };

  useEffect(() => {
    field.onChange(value);
  }, [value, field]);

  return (
    <label className={cx("quantity")}>
      <input
        className={cx("input")}
        type="text"
        {...field}
        value={value}
      />
      <div className={cx("box-edit-quantity")}>
        <FontAwesomeIcon
          onClick={() => Increase()}
          className={cx("icon")}
          icon={faCaretUp}
        ></FontAwesomeIcon>
        <FontAwesomeIcon
          onClick={() => Decrease()}
          className={cx("icon")}
          icon={faCaretDown}
        ></FontAwesomeIcon>
      </div>
    </label>
  );
};

export default InputQuantity;
