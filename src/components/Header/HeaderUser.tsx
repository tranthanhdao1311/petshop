import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCartShopping,
  faChevronDown,
  faChevronRight,
  faClose,
  faSearch,
  faSortDown,
  faTrash,
  faUpDown,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import HeadLessTippy from "@tippyjs/react/headless";
import "tippy.js/dist/tippy.css";
import { useDispatch, useSelector } from "react-redux";
import {
  setAddToCart,
  setRemoveItemCart,
  setToggleDropdownCate,
  setToggleShowModal,
  setToggleShowSideBarMobile,
} from "../../store/app/slice";
import ReactModal from "react-modal";
import images from "../../asset/image/img";
import tippy, { animateFill } from "tippy.js";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";
import styles from "./HeaderUser.module.scss";
import classNames from "classnames/bind";
import { Link, useNavigate } from "react-router-dom";
import slugify from "slugify";
import InputQuantity from "../InputQuantity/InputQuantity";
import { useForm } from "react-hook-form";
import Button from "../Button/Button";
import axios from "axios";
import { apiProduct } from "../../api";
const cx = classNames.bind(styles);

const HeaderUser: React.FC = () => {
  // const [show, setShow] = useState<boolean>(false)
  const showModalSearch = useSelector(
    (state: any) => state.app.toggleShowModal
  );

  const addToCart = useSelector(
    (state: any) => state.app.addToCart
  );

  const showDropdownCate = useSelector(
    (state: any) => state.app.toggleDropdownCate
  );

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleShowModalSearch = () => {
    dispatch(setToggleShowModal(!showModalSearch));
  };

  const handleCloseModal = () => {
    dispatch(setToggleShowModal(false));
    dispatch(setToggleDropdownCate(false));
  };

  useEffect(() => {
    ReactModal.setAppElement("#root"); // Thay '#root' bằng selector của phần tử chứa ứng dụng của bạn
  }, []);

  const [products, setProducts] = useState([])
  const data = products.filter((item: any) => addToCart.some((cartItem: any) => cartItem.id === item.id))

  useEffect(() => {
    axios
      .get(apiProduct)
      .then(function (response) {
        // handle success

        setProducts(data);
        // setProductsSortDefault(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, [])



  const { control, handleSubmit, register, setValue, watch, getValues } =
    useForm({
      mode: "onChange"
    });



  const handleDropdownCategories = () => {
    dispatch(setToggleDropdownCate(!showDropdownCate));
  };

  const [showMenuAccount, setShowMenuAccount] = useState<boolean>();
  const handleShowNavMenu = () => {
    setShowMenuAccount(!showMenuAccount);
  };

  const toggleShowSideBarMobile = useSelector(
    (state: any) => state.app.toggleShowSideBarMobile
  );


  const toggleShowModalCart = useSelector(
    (state: any) => state.app.toggleShowModalCart
  );

  const handleShowSideBarMobile = () => {
    dispatch(setToggleShowSideBarMobile(true));
  };

  const [count, setCount] = useState()
  useEffect(() => {
    const totalQuantity = addToCart.reduce((total: any, item: any) => total + item.quantity, 0)
    setCount(totalQuantity)
  }, [addToCart])

  const f = new Intl.NumberFormat("vi-VN", {
    style: 'currency',
    currency: 'VND',
  })

  // slug name
  // const slugifyLink = slugify(data.name, { lower: true })
  const handleRemoveItem = (indexItemDelete: number) => {
    dispatch(setRemoveItemCart(indexItemDelete))
    const filterItem = addToCart.filter((item: {}, index: number) => index !== indexItemDelete)
    localStorage.setItem('cart', JSON.stringify(filterItem))
  }

  function capitalizeFirstLetter(str?: string) {
    if (str && str.length === 0) {
      return str; // Trả về nguyên gốc nếu chuỗi rỗng
    }
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  }


  const handleClickCart = (values: any) => {
    // dispatch(setAddToCart(addToCart.map((item: any) => ({ ...item, quantity: values[item.id] || 0 }))))
    navigate("/gio-hang")
  }

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
  }, [])

  return (
    <>
      <div className={cx("wrapper")}>
        <div className="container position-relative">
          <div className={cx("header-mobile", "w-100")}
          >
            <div className={cx('custom-header-top', "row")}
            >
              <div className={cx("col-lg-10", "custom-header-mobile")}>
                <FontAwesomeIcon
                  className={cx("icon-bar-mobile")}
                  icon={faBars}
                  onClick={() => handleShowSideBarMobile()}
                ></FontAwesomeIcon>
                <img className={cx("logo-mobile")} src={images.logo} alt="" />
                <div className={cx("cart-mobile", "position-relative")}>
                  <FontAwesomeIcon
                    role="button"
                    className={cx("fs-4", "icon3")}
                    icon={faCartShopping}
                  ></FontAwesomeIcon>
                  <div
                    className={cx(
                      "custom-counter-cart-mobile",
                      "text-white bg-danger "
                    )}
                  >
                    0
                  </div>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="row ">
                  <div className="col-lg-4 text-center ">
                    <FontAwesomeIcon
                      onClick={() => handleShowModalSearch()}
                      role="button"
                      className={cx("icon1", "fs-4")}
                      icon={faSearch}
                    ></FontAwesomeIcon>
                    <ReactModal
                      isOpen={showModalSearch}
                      onRequestClose={handleCloseModal}
                      overlayClassName={cx("custom-overlay")}
                      className={cx("custom-modal")}
                    >
                      <div className="row">
                        <HeadLessTippy
                          appendTo={() => document.body}
                          // delay={[0, 400]}
                          // offset={[14, 10]}
                          visible={showDropdownCate}
                          //   onClickOutside={handleOnClickOutside}
                          placement="bottom-end"
                          interactive
                          render={(attrs) => (
                            <div tabIndex={-1} {...attrs}>
                              <div
                                className={cx(
                                  "custom-list-cate",
                                  "row bg-white"
                                )}
                              >
                                <p
                                  role="button"
                                  className={cx("custom-item-cate", "mb-0")}
                                >
                                  Thức ăn cho hamster
                                </p>
                                <p
                                  role="button"
                                  className={cx("custom-item-cate", "mb-0 ")}
                                >
                                  Thức ăn cho chó
                                </p>
                                <p
                                  role="button"
                                  className={cx("custom-item-cate", "mb-0 ")}
                                >
                                  Thức ăn cho mèo
                                </p>
                                <p
                                  role="button"
                                  className={cx("custom-item-cate", "mb-0 ")}
                                >
                                  Tất cả
                                </p>
                              </div>
                            </div>
                          )}
                        >
                          <div className="col-4 position-relative pe-3">
                            <div
                              className={cx(
                                " custom-cate",
                                "d-flex justify-content-between align-items-center"
                              )}
                              onClick={() => handleDropdownCategories()}
                            >
                              <div style={{ fontSize: "17px" }}>
                                {" "}
                                Chọn danh mục
                              </div>
                              <div className="">
                                <FontAwesomeIcon
                                  icon={faSortDown}
                                ></FontAwesomeIcon>
                              </div>
                            </div>
                          </div>
                        </HeadLessTippy>

                        <div
                          className={cx("custom-border-input", "col-6  ps-3")}
                        >
                          <input
                            className={cx("custom-input", "w-100")}
                            placeholder="Bạn muốn tìm sản phẩm gì?"
                          />
                        </div>
                        <div className="col-2">
                          <button
                            type="button"
                            className={cx("custom-btn-search")}
                          >
                            <FontAwesomeIcon
                              className="fs-5"
                              icon={faSearch}
                            ></FontAwesomeIcon>
                          </button>
                        </div>
                      </div>
                    </ReactModal>
                  </div>
                  <div className="col-lg-4 text-center">
                    <HeadLessTippy
                      appendTo={() => document.body}
                      //  delay={[0, 400]}
                      //  offset={[14, 10]}
                      //  onClickOutside={handleOnClickOutside}
                      placement="bottom-end"
                      interactive
                      render={(attrs) => (
                        <div tabIndex={-1} {...attrs}>
                          <div className="bg-white px-4 py-2 rounded rounded-3">
                            <div
                              className={cx("btn-login", "mb-0 py-2 ")}
                            >
                              <Link
                                to={'/account/login'}
                                role="button"
                              >
                                Đăng nhập
                              </Link>
                            </div>
                            <span className={cx("divier")}></span>
                            <div
                              className={cx("btn-register", "mb-0 py-2 ")}
                            >

                              <Link to={'/account/register'}
                                role="button"
                              >
                                Đăng ký
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    >
                      <FontAwesomeIcon
                        role="button"
                        className={cx("icon2", "fs-4")}
                        icon={faUser}
                      ></FontAwesomeIcon>
                    </HeadLessTippy>
                  </div>
                  <div className="col-lg-4 text-center ">
                    <HeadLessTippy
                      //  delay={[0, 400]}
                      //  offset={[14, 10]}
                      //  onClickOutside={handleOnClickOutside}
                      placement="bottom-end"
                      // visible={toggleShowModalCart}
                      interactive
                      render={(attrs) => (
                        <div tabIndex={-1} {...attrs}>
                          <div
                            className={cx(
                              "custom-cart",
                              "bg-white rounded rounded-3"
                            )}
                          >

                            <form onSubmit={handleSubmit(handleClickCart)}>
                              <div className={cx('list-item-cart')}>
                                {addToCart.length > 0 ? (addToCart.length > 0 && addToCart.map((item: any, index: number) =>
                                  <div className={cx("item-cart", "row")} key={index}>
                                    <div className="col-4">
                                      <Link to={{ pathname: `/${slugify(item.name, { lower: true })}` }} state={item.id} className="">
                                        <img className={cx('cart-item-img')} src={item.image} alt="" />
                                      </Link>

                                    </div>
                                    <div className={cx("item-cart-right", "col-7")}>
                                      <Link to={{
                                        pathname: `/${slugify(item.name, {
                                          lower: true
                                        })}`
                                      }} state={item.id} className={cx('cart-item-name')}>{item.name} </Link>
                                      {item.color &&
                                        <p className={cx('cart-item-plus')}>{capitalizeFirstLetter(item.color)}</p>
                                      }
                                      {item.kichthuoc &&
                                        <p className={cx('cart-item-plus')}>{capitalizeFirstLetter(item.kichthuoc + 'g')}</p>
                                      }
                                      <p className={cx("cart-item-price")}>{f.format(item.price)}</p>
                                      <div className={cx('product-details-bottom')}>
                                        <InputQuantity valueCart={item} name={`${item.id}`} control={control} key={index}></InputQuantity>
                                      </div>

                                    </div>
                                    <div className={cx("col-1", "trash-item-cart")}>
                                      <FontAwesomeIcon className={cx('icon-trash-item-cart')} icon={faTrash} onClick={() => handleRemoveItem(index)}></FontAwesomeIcon>
                                    </div>
                                  </div>

                                )) :
                                  <span className="mb-0">Không có sản phẩm nào!</span>

                                }


                              </div>


                              {
                                addToCart.length > 0 && <div className={cx('box-btn-pay')}>

                                  <div className="row">
                                    <div className="col-6">
                                      <button className={cx('custom-btn-cart')} type="submit" >Giỏ hàng</button>
                                    </div>
                                    <div className="col-6">
                                      <button className={cx('custom-btn-payment')} type="button">Tiến hành thanh toán</button>
                                    </div>
                                  </div>
                                </div>
                              }


                            </form>
                          </div>
                        </div>

                      )}
                    >
                      <Link to={`/gio-hang`}>
                        <div className={cx("cart", "position-relative")} >
                          <FontAwesomeIcon
                            role="button"
                            className={cx("icon3", "fs-4")}
                            icon={faCartShopping}
                          ></FontAwesomeIcon>
                          <div
                            className={cx(
                              "custom-counter-cart",
                              "text-white bg-danger"
                            )}
                          >
                            {count}
                          </div>
                        </div>
                      </Link>

                    </HeadLessTippy>
                  </div>
                </div>
              </div>
            </div>

            <div className={cx("header-bottom", "container")}>
              <div className=" row ">
                <div className="col-12">
                  <div className={cx("menu")}>
                    <div
                      style={{
                        border: "1px dashed white",
                        borderRadius: "50px",
                      }}
                    >
                      <nav className={cx("nav-menu")}>
                        <ul className={cx("ul-menu")}>
                          <li className={cx("li-item")}>Trang chủ</li>
                          <HeadLessTippy
                            appendTo={() => document.body}
                            delay={[0, 300]}
                            // offset={[14, 10]}
                            //   onClickOutside={handleOnClickOutside}
                            placement="bottom-start"
                            interactive
                            render={(attrs) => (
                              <div tabIndex={-1} {...attrs}>
                                <div
                                  className={cx(
                                    "custom-list-item-cate",
                                    "row bg-white"
                                  )}
                                >
                                  <span
                                    role="button"
                                    className={cx(
                                      "custom-item-cate-menu-nav",
                                      "mb-0"
                                    )}
                                  >
                                    Thức ăn cho hamster
                                  </span>
                                  <span
                                    role="button"
                                    className={cx(
                                      "custom-item-cate-menu-nav",
                                      "mb-0"
                                    )}
                                  >
                                    Thức ăn cho chó
                                  </span>
                                  <span
                                    role="button"
                                    className={cx(
                                      "custom-item-cate-menu-nav",
                                      "mb-0"
                                    )}
                                  >
                                    Thức ăn cho mèo
                                  </span>
                                  <span
                                    role="button"
                                    className={cx(
                                      "custom-item-cate-menu-nav",
                                      "mb-0"
                                    )}
                                  >
                                    Tất cả
                                  </span>
                                </div>
                              </div>
                            )}
                          >
                            <li
                              className={cx(
                                "li-item",
                                "d-flex align-items-center gap-2"
                              )}
                            >
                              <Link to={'/collections/san-pham'}>
                                <img
                                  className={cx("icon-handpet")}
                                  src={images.iconHand}
                                  alt=""
                                />{" "}
                                <span> Sản phẩm</span>
                                <FontAwesomeIcon
                                  style={{ fontSize: "10px" }}
                                  icon={faChevronDown}
                                ></FontAwesomeIcon>
                              </Link>
                            </li>
                          </HeadLessTippy>
                          <li
                            className={cx(
                              "li-item",
                              "d-flex align-items-center gap-2"
                            )}
                          >
                            <img
                              className={cx("icon-handpet")}
                              src={images.iconHand}
                              alt=""
                            />
                            Bảng giá
                          </li>
                        </ul>
                        <ul className={cx("ul-menu")}>
                          <li className={cx("li-item")}>
                            <img
                              className={cx("logo-web")}
                              src={images.logo}
                              alt=""
                            />
                          </li>
                        </ul>
                        <ul className={cx("ul-menu")}>
                          <li className={cx("li-item")}>Tin thú cưng</li>
                          <li
                            className={cx(
                              "li-item",
                              "d-flex align-items-center gap-2"
                            )}
                          >
                            <img
                              className={cx("icon-handpet")}
                              src={images.iconHand}
                              alt=""
                            />
                            Đặt lịch
                          </li>
                          <li
                            className={cx(
                              "li-item",
                              "d-flex align-items-center gap-2"
                            )}
                          >
                            <img
                              className={cx("icon-handpet")}
                              src={images.iconHand}
                              alt=""
                            />
                            Liên hệ
                          </li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div >
        </div >
      </div >

      {toggleShowSideBarMobile && (
        <div className={cx("side-bars")}>
          <div>
            <div className={cx("box-input-search")}>
              <input
                className={cx("input-search-mobile")}
                type="text"
                placeholder="Tìm kiếm sản phẩm..."
              ></input>
            </div>
            <span className={cx("box-icon-search")}>
              <FontAwesomeIcon
                className={cx("icon-search")}
                icon={faSearch}
              ></FontAwesomeIcon>
            </span>
          </div>
          <div className={cx("nav-mobile")}>
            <ul className={cx("nav-mobile-list")}>
              <li className={cx("nav-mobile-item")}>
                <div
                  className="d-flex justify-content-between align-items-center"
                  onClick={() => handleShowNavMenu()}
                >
                  <span>
                    <FontAwesomeIcon
                      className={cx("icon")}
                      icon={faUser}
                    ></FontAwesomeIcon>{" "}
                    <span className={cx("name-cate")}>Tài khoản</span>
                  </span>
                  <FontAwesomeIcon
                    className={cx("icon", showMenuAccount ? "icon-active" : "")}
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                </div>
                {showMenuAccount && (
                  <ul className={cx("nav-menu-account")}>
                    <li className={cx("item-account")}>Đăng nhập</li>
                    <li className={cx("item-account")}>Đăng ký</li>
                  </ul>
                )}
              </li>

              <li className={cx("nav-mobile-item")}>
                <img className={cx("icon-hand")} src={images.iconHand} alt="" />{" "}
                <span className={cx("name-cate")}> Trang chủ</span>
              </li>
              <li
                className={cx(
                  "nav-mobile-item",
                  "d-flex justify-content-between"
                )}
              >
                <span>
                  <img
                    className={cx("icon-hand")}
                    src={images.iconHand}
                    alt=""
                  />
                  <Link to={"/:slug"} className={cx("name-cate-product")}>
                    Sản phẩm
                  </Link>
                </span>
                <span>
                  <FontAwesomeIcon
                    className={cx("icon")}
                    icon={faChevronRight}
                  ></FontAwesomeIcon>
                </span>
              </li>
              <li className={cx("nav-mobile-item")}>
                <img className={cx("icon-hand")} src={images.iconHand} alt="" />{" "}
                <span className={cx("name-cate")}>Bảng giá</span>
              </li>
              <li className={cx("nav-mobile-item")}>
                <img className={cx("icon-hand")} src={images.iconHand} alt="" />{" "}
                <span className={cx("name-cate")}>Tin thú cưng</span>
              </li>
              <li className={cx("nav-mobile-item")}>
                <img className={cx("icon-hand")} src={images.iconHand} alt="" />{" "}
                <span className={cx("name-cate")}>Đặt lịch</span>{" "}
              </li>
              <li className={cx("nav-mobile-item")}>
                <img className={cx("icon-hand")} src={images.iconHand} alt="" />{" "}
                <span className={cx("name-cate")}>Liên hệ</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default HeaderUser;
