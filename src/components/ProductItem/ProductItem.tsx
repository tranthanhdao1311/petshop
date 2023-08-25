import React, { useEffect, useState } from "react";
import styles from "./ProductItem.module.scss";
import classNames from "classnames/bind";
import { BrowserRouter as Router, Link } from 'react-router-dom';

import images from "../../asset/image/img";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faClose,
  faGear,
  faMagnifyingGlassPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../Button/Button";
import ReactModal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddToCart,
  setToggleShowModal,
  setToggleShowModalCart,
  setToggleShowModalViewItem,
} from "../../store/app/slice";
import TitleOption from "../TitleOption/TitleOption";
import Heading from "../Heading/Heading";
import Radio from "../Radio/Radio";
import { useForm } from "react-hook-form";
import InputQuantity from "../InputQuantity/InputQuantity";
import ButtonLarge from "../ButtonLarge/ButtonLarge";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import RadioColor from "../RadioColor/RadioColor";
import slugify from "slugify";

interface GlobalStyleProps {
  className?: string;
  data: {
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
  };
}

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
}
const cx = classNames.bind(styles);

type FormData = {
  kichthuoc: any;
  // age: string | number;
  quantity: number;
  color: string
};



const ProductItem: React.FC<GlobalStyleProps> = ({ className, data }) => {
  const showModalViewItem = useSelector(
    (state: any) => state.app.toggleShowModalViewItem
  );

  const addToCart = useSelector(
    (state: any) => state.app.addToCart
  );

  useEffect(() => {
    ReactModal.setAppElement("#root"); // Thay '#root' bằng selector của phần tử chứa ứng dụng của bạn
  }, []);

  const dispatch = useDispatch();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);





  const { control, handleSubmit, register, setValue, watch } =
    useForm<FormData>({
      mode: "onChange",
      defaultValues: {
        kichthuoc: data?.size && data.size[0].capacity,
        quantity: 1,
        color: data?.color && data.color[0]
      },
    });

  // Hàm để mở modal và đặt sản phẩm đã chọn
  const [imgCenter, setImgCenter] = useState<string | undefined>(
    data?.image[0]
  );

  const handleShowModalDetail = (data: Product) => {
    dispatch(setToggleShowModalViewItem(true));
    setSelectedProduct(data);
  };

  const handleCloseModal = () => {
    dispatch(setToggleShowModalViewItem(false));
    setSelectedProduct(null);
  };


  useEffect(() => {
    if (addToCart.length === 0) {
      return
    }
    localStorage.setItem('cart', JSON.stringify(addToCart))
  }, [addToCart])

  useEffect(() => {
    const cartJson = localStorage.getItem('cart')
    if (cartJson !== null) {
      const cart = JSON.parse(cartJson)
      dispatch(setAddToCart(cart))
    }
  }, [dispatch])


  const watchStatusKichthuoc = watch("kichthuoc");
  const watchColor = watch("color");
  const handleSubmitForm = (values: any) => {
    const existingProduct = addToCart.find((item: any) => item.id === data.id && item.color === values.color && item.kichthuoc === values.kichthuoc);

    if (existingProduct) {
      dispatch(setAddToCart(addToCart.map((item: any) => item.id === data.id && item.color === existingProduct.color && item.kichthuoc === existingProduct.kichthuoc ?
        { ...item, quantity: item.quantity + values.quantity } : item)))
    } else {
      dispatch(setAddToCart([...addToCart, { ...values, id: data.id, name: selectedProduct?.name, image: imgCenter, price: (priceSize || selectedProduct?.priceSale) }]))
    }

    // dispatch(setToggleShowModalViewItem(false))
    handleCloseModal()

    dispatch(setToggleShowModalCart(true))

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };


  const [priceSize, setPriceSize] = useState<any>(data?.size && data.size[0].priceSale)
  const [costSize, setCostSize] = useState<any>(data?.size && data.size[0].cost)

  const handleClickSize = (index: number) => {

    if (selectedProduct?.size[index]?.priceSale !== undefined) {
      setPriceSize(selectedProduct.size[index].priceSale);
      setCostSize(selectedProduct.size[index].cost);
    }
  }
  // const [slugifyLink, setSlugifyLink] = useState('')

  // // slug name
  // useEffect(() => {
  //   const slug = slugify(data.name, { lower: true })
  //   setSlugifyLink(slug)
  // }, [data.name])



  const f = new Intl.NumberFormat("vi-VN", {
    style: 'currency',
    currency: 'VND',
  })

  const handleBuyNow = (data: any) => {
    const existingProduct = addToCart.find((item: any) => item.id === data.id && item.color === data.color && item.kichthuoc === data.kichthuoc);

    if (existingProduct) {
      dispatch(setAddToCart(addToCart.map((item: any) => item.id === data.id && item.color === existingProduct.color && item.kichthuoc === existingProduct.kichthuoc ?
        { ...item, quantity: item.quantity + 1 } : item)))
    } else {
      dispatch(setAddToCart([...addToCart, { id: data.id, image: data.image[0], name: data.name, price: data.priceSale, quantity: 1 }]))
    }

    // dispatch(setToggleShowModalViewItem(false))
    handleCloseModal()

    dispatch(setToggleShowModalCart(true))

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    console.log(data)
  }



  return (
    <div className={cx("product-item", className)} >
      <div className={cx("box-img", "mb-5")}>
        <Link to={{ pathname: `/${slugify(data.name, { lower: true })}` }} state={data.id} className="">
          <img
            className={cx("img-custom")}
            src={data?.image && data?.image[0]}
            alt=""
          ></img>
        </Link>

        <div className={cx("product-action")}>
          <Button
            type="button"
            onClick={() => handleShowModalDetail(data)}
            className={cx("btn-view")}
            icon={faMagnifyingGlassPlus}
          >
            Xem nhanh
          </Button>

          <ReactModal
            key={selectedProduct?.id}
            isOpen={showModalViewItem && selectedProduct !== null}
            onRequestClose={handleCloseModal}
            overlayClassName={cx("custom-overlay")}
            className={cx("custom-modal")}
          >
            <>
              {selectedProduct && (
                <>
                  <div className="row" key={selectedProduct?.id}>
                    <div
                      className={cx(
                        "col-xs-12 col-sm-4 col-md-4 col-lg-5 col-xl-6"
                      )}
                    >
                      <div className={cx("box-img-modal")}>
                        <Link to={"/"}>
                          <img src={imgCenter} alt="" />
                        </Link>
                      </div>
                      <div className="">
                        <OwlCarousel className="owl-theme" items={4}>
                          {selectedProduct &&
                            selectedProduct.image.length > 0 &&
                            selectedProduct.image.map((itemImg: any) => (
                              <div
                                className={cx("box-img-nav-slider")}
                                key={selectedProduct.id}
                              >
                                <img
                                  onClick={() => setImgCenter(itemImg)}
                                  src={itemImg}
                                  alt={itemImg}
                                />
                              </div>
                            ))}
                        </OwlCarousel>
                      </div>
                    </div>
                    <div
                      className={cx(
                        "col-xs-12 col-sm-6 col-md-8 col-lg-7 col-xl-6"
                      )}
                    >
                      <p className={cx("title-item-modal")}>
                        {selectedProduct?.name}
                      </p>
                      <div className={cx("box-price-modal")}>
                        <span className={cx("sale-price")}>
                          {f.format(selectedProduct?.size ? priceSize : selectedProduct?.priceSale)}

                        </span>
                        <span className={cx("compare-price")}>
                          {f.format(selectedProduct?.size ? costSize : selectedProduct?.cost)}

                        </span>
                      </div>
                      <div className={cx("box-desc")}>
                        <p className={cx("desc")}>{selectedProduct?.desc}</p>
                      </div>
                      <form
                        className={cx("option")}
                        onSubmit={handleSubmit(handleSubmitForm)}
                      >
                        {selectedProduct.size && (
                          <div className="my-3">
                            <TitleOption>Kích thước:</TitleOption>
                            {selectedProduct.size.length > 0 &&
                              selectedProduct.size.map((item: any, index: number) => (
                                <Radio
                                  key={index}
                                  onClick={() => handleClickSize(index)}
                                  checked={
                                    Number(watchStatusKichthuoc) === item.capacity
                                  }
                                  value={Number(item.capacity)}
                                  control={control}
                                  name="kichthuoc"
                                >
                                  {item.capacity < 1000 ? item.capacity + "g" : item.capacity + "kg"}
                                </Radio>
                              ))}
                          </div>
                        )}
                        {selectedProduct.color && (
                          <div className="my-3 d-flex align-items-center" >
                            <TitleOption>Màu sắc:</TitleOption>
                            {selectedProduct.color.length > 0 &&
                              selectedProduct.color.map((item) => (
                                <RadioColor
                                  key={item}

                                  checked={
                                    watchColor === item
                                  }
                                  control={control}
                                  value={item}
                                  name="color"
                                  style={{ backgroundColor: item }}
                                >
                                  {item}
                                </RadioColor>
                              ))}
                          </div>
                        )}

                        {/* <div className="my-3">
                          <TitleOption>Tuổi:</TitleOption>
                          <Radio
                            checked={watchAge === age.small}
                            value={age.small}
                            control={control}
                            name="age"
                          >
                            Nhỏ
                          </Radio>
                          <Radio
                            checked={watchAge === age.young}
                            value={age.young}
                            control={control}
                            name="age"
                          >
                            Trẻ
                          </Radio>
                          <Radio
                            checked={watchAge === age.old}
                            value={age.old}
                            control={control}
                            name="age"
                          >
                            Già
                          </Radio>
                        </div> */}
                        <div className="my-3 ">
                          <TitleOption>Số lượng:</TitleOption>
                          <InputQuantity
                            name="quantity"
                            control={control}
                          ></InputQuantity>
                        </div>
                        <ButtonLarge type="submit">
                          Thêm vào giỏ hàng
                        </ButtonLarge>
                      </form>
                    </div>
                  </div>
                  <div className={cx("close")} onClick={handleCloseModal}>
                    <FontAwesomeIcon
                      className={cx("icon-close")}
                      icon={faClose}
                    ></FontAwesomeIcon>
                  </div>
                </>
              )}
            </>
          </ReactModal>

          {
            !data.color && !data.size ?
              <Button
                type="button"
                className={cx("btn-buynow")}
                icon={faCartShopping}
                onClick={() => handleBuyNow(data)}
              >
                Mua ngay
              </Button>

              :
              <Button
                type="button"
                className={cx("btn-buynow")}
                icon={faGear}
              >
                Tùy chọn
              </Button>
          }

        </div>
      </div>
      <div className="text-center">
        {/* slugify(data.name, { lower: true }) */}
        <Link to={{ pathname: `/${slugify(data.name, { lower: true })}` }} state={data.id} className={cx("name-product")}>
          {data.name}
        </Link>
        <div className={cx("box-price")}>
          <span className={cx("price-sale")}>{data.size ? f.format(data?.size[0].priceSale) : (data.priceSale !== undefined && f.format(data.priceSale))}</span>
          <span className={cx("price-current")}>{data.size ? f.format(data?.size[0].cost) : (data.cost !== undefined && f.format(data.cost))}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
