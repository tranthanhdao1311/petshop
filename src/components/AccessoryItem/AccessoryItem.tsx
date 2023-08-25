import React from "react";
import styles from "./AccessoryItem.module.scss";
import classNames from "classnames/bind";
import images from "../../asset/image/img";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlassPlus,
  faShoppingCart,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
const cx = classNames.bind(styles);
const AccessoryItem = () => {
  return (
    <div className={cx("accessory-item")}>
      <div className="row">
        <div className="col-4">
          <img src={images.item1} className="w-100" alt="" />
        </div>
        <div className="col-8">
          <Link to={"/"}>Bình trữ thức ăn tự động 1,6L</Link>
          <div className={cx("price-box")}>
            <span className={cx("sale-price")}>50,000đ</span>
            <span className={cx("compare-price")}>100,000đ</span>
          </div>

          <div className="mt-2">
            <Button
              type="button"
              className={cx("custom-btn")}
              icon={faMagnifyingGlassPlus}
            ></Button>
            <Button type="button" icon={faShoppingCart}>
              Mua ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessoryItem;
