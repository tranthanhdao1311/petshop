import React, { useEffect, useState } from "react";
import styles from "./ProductOutstanding.module.scss";
import classNames from "classnames/bind";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import images from "../../asset/image/img";
import ProductItem from "../ProductItem/ProductItem";
import { data } from "../../data";
import { apiProduct } from "../../api";
import axios from "axios";
const cx = classNames.bind(styles);

const ProductOutstanding = () => {
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

    },
    500: {
      items: 1,
      nav: false,
    },
    768: {
      items: 3,
      nav: false,
    },
    991: {
      items: 4,
      nav: true,
      loop: false,
      dots: false
    },
  };
  return (
    <div className="container mt-4">
      <div className={cx("title_module_main")}>
        <h2>
          <span>Sản phẩm nổi bật</span>
        </h2>
      </div>

      <div className="custom-slider-product">
        <div className={cx("box-bestsale")}>
          <OwlCarousel className="owl-theme" items={4} responsive={responsive}>
            {
              products.length > 0 && products.map((item:any) => 
                <ProductItem key={item.id} data={item}></ProductItem>

              )
            }
            
          </OwlCarousel>
        </div>
      </div>
    </div>
  );
};

export default ProductOutstanding;
