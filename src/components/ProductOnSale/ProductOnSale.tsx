import React, { useEffect, useState } from "react";
import styles from "./ProductOnSale.module.scss";
import classNames from "classnames/bind";
import Heading from "../Heading/Heading";
import NameCategory from "../NameCategory/NameCategory";
import ProductItem from "../ProductItem/ProductItem";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightLong,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { apiProduct } from "../../api";

const cx = classNames.bind(styles);

const ProductOnSale = ():any => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(apiProduct)
      .then(function (response) {
        // handle success
        setProducts(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);
  const responsive = {
    0: {
      items: 1,
      nav: false,
    },
    500: {
      items: 2,
      nav: false,
    },
    758: {
      item: 3,
      nav: false,
    },
    991: {
      items: 4,
      nav: false,
    },
    1200: {
      items: 5,
      nav: false,
    },
  };
  return (
    <div className={cx("product-on-sale", "container")}>
      <Heading>Sản phẩm đang bán</Heading>
      <div className="text-center">
        <NameCategory active>Thức ăn cho Mèo</NameCategory>
        <NameCategory>Thức ăn cho Chó</NameCategory>
        <NameCategory>Thức ăn cho Hamster</NameCategory>
        <NameCategory>Thức ăn cho Chim</NameCategory>
      </div>

      <div className={cx("", "mt-4 ")}>
        <OwlCarousel className="owl-theme" items={5} responsive={responsive}>
          {products.length > 0 &&
            products.map((item:any) => (
              <div className="">
                <ProductItem
                  key={item.id}
                  data={item}
                  className={cx("custom-product-item")}
                ></ProductItem>
              </div>
            ))}
        </OwlCarousel>
      </div>
      <div className={cx("box-seemore")}>
        <p>
          <span className={cx("see-more")}>Xem thêm sản phẩm</span>{" "}
          <FontAwesomeIcon
            className={cx("icon-seemore")}
            icon={faArrowRightLong}
          ></FontAwesomeIcon>{" "}
        </p>
      </div>
    </div>
  );
};

export default ProductOnSale;
