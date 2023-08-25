import React, { useEffect, useState } from "react";
import DefaultLayout from "../../components/Layout/DefaultLayout/DefaultLayout";
import styles from "./ProductPage.module.scss";
import classNames from "classnames/bind";
import Title from "../../components/Title/Title";
import { Link } from "react-router-dom";
import {
  faChevronDown,
  faFilter,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/Button/Button";
import Checkbox from "../../components/Checkbox/Checkbox";
import { set, useForm } from "react-hook-form";
import ReactSlider from "react-slider";
import ButtonLarge from "../../components/ButtonLarge/ButtonLarge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ProductItem from "../../components/ProductItem/ProductItem";
import ReactPaginate from "react-paginate";
import images from "../../asset/image/img";
import { data } from "../../data";
import Paginate from "../../components/Paginate/Paginate";
import Loadmore from "../../components/Loadmore/Loadmore";
import Heading from "../../components/Heading/Heading";
import { apiProduct } from "../../api";
import axios from "axios";
import LayoutProduct from "../../components/Layout/LayoutProduct/LayoutProduct";

const brand: string[] = [
  "Doca",
  "FIBs",
  "Minino",
  "Nutrience",
  "Pedigree",
  "Royal Canin",
  "Smartheart",
  "Tropiclean",
  "Whiskat",
  "Zenith",

]

const cx = classNames.bind(styles);
interface Product {
  id: number;
  name: string;
  image: string[];
  category: string;
  priceSale?: number;
  cost?: number;
  quantity: number;
  brand: string;
  desc?: string;
  size?: any;
  color?: string[];
  created_at: number
}

interface SelectedBrandsType {
  [key: string]: boolean;
}

const ProductPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productsSortDefault, setProductsSortDefault] = useState<Product[]>([]);
  const [productsDefault, setProductsDefault] = useState<Product[]>([]);
  const [brands, setBrands] = useState(brand)

  const [labelSort, setLabelSort] = useState('Sắp xếp theo')



  const storedProducts = localStorage.getItem('sort-product');
  useEffect(() => {
    if (storedProducts === 'az') {
      axios
        .get(apiProduct)
        .then(function (response) {
          setProductsSortDefault(response.data)
          setProductsDefault(response.data)
          const sortData = [...response.data].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
          })
          setProducts(sortData)
          setLabelSort('A-Z')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    else if (storedProducts === 'default') {
      axios.get(apiProduct)
        .then(function (response) {
          setProducts(response.data)
          setProductsDefault(response.data)
          setProductsSortDefault(response.data)
          setLabelSort('Mặc định')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    else if (storedProducts === 'za') {
      axios.get(apiProduct)
        .then(function (response) {
          setProductsDefault(response.data)
          setProductsSortDefault(response.data)
          const sortData = [...response.data].sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
          })
          setProducts(sortData)
          setLabelSort('Z-A')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    else if (storedProducts === 'price-up') {
      axios.get(apiProduct)
        .then(function (response) {
          // setProducts(response.data)
          setProductsDefault(response.data)
          setProductsSortDefault(response.data)
          const sortData = [...response.data].sort((a, b) => {
            const aPrice = a.priceSale || (a.size && a.size[0]?.priceSale);
            const bPrice = b.priceSale || (b.size && b.size[0]?.priceSale);

            return aPrice - bPrice;
          })
          setProducts(sortData)
          setLabelSort('Giá tăng dần')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    else if (storedProducts === 'price-down') {
      axios.get(apiProduct)
        .then(function (response) {
          // setProducts(response.data)
          setProductsDefault(response.data)
          setProductsSortDefault(response.data)
          const sortData = [...response.data].sort((a, b) => {
            const aPrice = a.priceSale || (a.size && a.size[0]?.priceSale);
            const bPrice = b.priceSale || (b.size && b.size[0]?.priceSale);

            return bPrice - aPrice;
          })
          setProducts(sortData)
          setLabelSort('Giá giảm dần')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    else if (storedProducts === 'latest') {
      axios.get(apiProduct)
        .then(function (response) {
          // setProducts(response.data)
          setProductsDefault(response.data)
          setProductsSortDefault(response.data)
          const sortData = [...response.data].sort((a, b) => {
            if (a.created_at < b.created_at) return 1;
            if (a.created_at > b.created_at) return -1;
            return 0;
          })
          setProducts(sortData)
          setLabelSort('Sản phẩm mới nhất')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }
    else if (storedProducts === 'oldest') {
      axios.get(apiProduct)
        .then(function (response) {
          // setProducts(response.data)
          setProductsDefault(response.data)
          setProductsSortDefault(response.data)
          const sortData = [...response.data].sort((a, b) => {
            if (a.created_at > b.created_at) return 1;
            if (a.created_at < b.created_at) return -1;
            return 0;
          })
          setProducts(sortData)
          setLabelSort('Sản phẩm cũ nhất')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }

    else {
      axios
        .get(apiProduct)
        .then(function (response) {
          // handle success
          setProducts(response.data);
          setProductsSortDefault(response.data)
          setLabelSort('Sắp xếp theo')

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
    }

  }, [storedProducts]);

  const { control, watch, setValue } = useForm({
    mode: "onChange",
    defaultValues: {
      item: false,
      item1: false,
    },
  });

  // useEffect(() => {
  //   const sortJson = localStorage.getItem('sort')
  //   const sortLabelJson = localStorage.getItem('label-sort')
  //   if (sortJson && sortLabelJson) {
  //     const sort = JSON.parse(sortJson)
  //     const sortLabel = JSON.parse(sortLabelJson)
  //     setProducts(sort)
  //     setProductsSortDefault(sort)
  //     setLabelSort(sortLabel)
  //   }
  // }, [])

  // Paginate
  const [currentItem, setCurrentItem] = useState(12);

  // Sort products


  const handleSortDefault = () => {
    setProducts(productsDefault)
    localStorage.setItem('sort-product', 'default')

  }

  const handleSortAZ = () => {
    const sortData = [...products].sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    })
    localStorage.setItem('sort-product', 'az')
    setProducts(sortData)
  }

  const handleSortZA = () => {
    const sortData = [...products].sort((a, b) => {
      if (a.name < b.name) return 1;
      if (a.name > b.name) return -1;
      return 0;
    })

    localStorage.setItem('sort-product', 'za')

    setProducts(sortData)
  }

  const handleSortPriceUp = () => {
    const sortData = [...products].sort((a, b) => {
      const aPrice = a.priceSale || (a.size && a.size[0]?.priceSale);
      const bPrice = b.priceSale || (b.size && b.size[0]?.priceSale);

      return aPrice - bPrice;
    })
    setProducts(sortData)
    localStorage.setItem('sort-product', 'price-up')

  }

  const handleSortPriceDown = () => {
    const sortData = [...products].sort((a, b) => {
      const aPrice = a.priceSale || (a.size && a.size[0]?.priceSale);
      const bPrice = b.priceSale || (b.size && b.size[0]?.priceSale);

      return bPrice - aPrice;
    })
    setProducts(sortData)
    localStorage.setItem('sort-product', 'price-down')

  }

  const handleSortLatestProduct = () => {
    const sortData = [...products].sort((a, b) => {
      if (a.created_at < b.created_at) return 1;
      if (a.created_at > b.created_at) return -1;
      return 0;
    })
    setProducts(sortData)
    localStorage.setItem('sort-product', 'latest')

  }


  const handleSortOldestProduct = () => {
    const sortData = [...products].sort((a, b) => {
      if (a.created_at > b.created_at) return 1;
      if (a.created_at < b.created_at) return -1;
      return 0;
    })
    setProducts(sortData)
    localStorage.setItem('sort-product', 'oldest')


  }







  const f = new Intl.NumberFormat("vi-VN", {
    style: 'currency',
    currency: 'VND',
  })


  const handleOnChangeBrand = (product: any) => {
    setProducts(product)
  }
  const handleOnChangePrice = (product: any) => {
    setProducts(product)
  }
  return (

    <LayoutProduct
      data={products}
      productsSortDefault={productsSortDefault}
      sortAZ={handleSortAZ}
      sortZA={handleSortZA}
      sortDefault={handleSortDefault}
      sortPriceUp={handleSortPriceUp}
      sortPriceDown={handleSortPriceDown}
      sortLatest={handleSortLatestProduct}
      sortOldest={handleSortOldestProduct}
      onChangeBrand={handleOnChangeBrand}
      onChangePrice={handleOnChangePrice}
      title='Tất cả sản phẩm'
      labelSort={labelSort}
    >
      <>
        {products.length > 0 &&
          products.slice(0, currentItem).map((item: any) => (
            <div
              key={item.id}
              style={{ marginBottom: "35px" }}
              className="col-6 col-sm-6 col-md-4 col-lg-4 col-xl-3 "
            >
              <ProductItem
                data={item}
                className={cx("custom-product-item")}
              ></ProductItem>
            </div>
          ))}

        {products.length === 0 && <p>Sản phẩm của hãng hiện chúng tôi đã hết. Quý khách vui lòng chọn hãng khác nhe!</p>}
        {currentItem < products.length && (
          <Loadmore items={currentItem} setItems={setCurrentItem}>
            Xem thêm...
          </Loadmore>
        )}
      </>

      {/* <div className={cx("box-icon-filter")}>
        <FontAwesomeIcon
          className={cx("icon-filter")}
          icon={faFilter}
        ></FontAwesomeIcon>
      </div> */}
    </LayoutProduct >

  );
};

export default ProductPage;
