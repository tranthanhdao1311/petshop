import React, { useEffect, useState } from "react";
import styles from "./ProductItemTest.module.scss";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import images from "../../asset/image/img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setToggleShowModal,
  setToggleShowModalViewItem,
} from "../../store/app/slice";
import TitleOption from "../TitleOption/TitleOption";
import Heading from "../Heading/Heading";
import Radio from "../Radio/Radio";
import { useController, useForm } from "react-hook-form";

interface GlobalStyleProps {
  className?: string;
}
const cx = classNames.bind(styles);

const ProductItemTest: React.FC<GlobalStyleProps> = ({ className }) => {
  const statuskichthuoc = {
    small: 250,
    normal: 500,
    big: 1000,
  };

  const { control, handleSubmit, register, setValue, getValues, watch } =
    useForm({
      mode: "onChange",
      defaultValues: {
        kichthuoc: statuskichthuoc.small,
      },
    });

  const option = watch("kichthuoc");
  console.log(option === statuskichthuoc.small);
  const { field } = useController({
    control,
    name: "kichthuoc",
  });
  return (
    <form className={cx("option")}>
      <div className="my-3">
        <TitleOption>Kích thước:</TitleOption>
        <label>
          <input
            checked={Number(option) === statuskichthuoc.small}
            className="mx-3"
            type="radio"
            {...field}
            value={statuskichthuoc.small}
          ></input>
          <span className={cx(Number(option) === statuskichthuoc.small && "fs-4")}>
            {statuskichthuoc.small}g
          </span>
        </label>

        <label>
          <input
            checked={Number(option) === statuskichthuoc.normal}
            type="radio"
            {...field}
            value={statuskichthuoc.normal}
          ></input>
          <span className={cx(Number(option) === statuskichthuoc.normal && "fs-4")}>
            {statuskichthuoc.normal}g
          </span>
        </label>

      
      </div>
    </form>
  );
};

export default ProductItemTest;
