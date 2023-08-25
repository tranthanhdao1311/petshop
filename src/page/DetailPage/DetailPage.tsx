import React, { useEffect, useRef, useState } from 'react';
import styles from './DetailPage.module.scss';
import classNames from "classnames/bind";
import { useLocation, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.min.css";
import "owl.carousel/dist/assets/owl.theme.default.min.css";
import NavSliderImage from '../../components/NavSliderImage/NavSliderImage';
import Title from '../../components/Title/Title';
import TitleOption from '../../components/TitleOption/TitleOption';
import Price from '../../components/Price/Price';
import RadioColor from '../../components/RadioColor/RadioColor';
import { useForm } from 'react-hook-form';
import InputQuantity from '../../components/InputQuantity/InputQuantity';
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faPhone } from '@fortawesome/free-solid-svg-icons';
import Radio from '../../components/Radio/Radio';
import Heading from '../../components/Heading/Heading';
import { apiProduct } from '../../api';
import axios from 'axios';
import ProductItem from '../../components/ProductItem/ProductItem';
import "owl.carousel/dist/assets/owl.theme.default.min.css"; // Add this line
import { useDispatch, useSelector } from 'react-redux';
import { setAddToCart } from '../../store/app/slice';
import slugify from 'slugify';


const cx = classNames.bind(styles);

type FormData = {
    kichthuoc: any;
    // age: string | number;
    quantity: number;
    color: string
};

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

const DetailPage = () => {
    const location = useLocation()
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [detailItem, setDetailItem] = useState<Product>()
    console.log(detailItem)
    const mainCarouselRef = useRef<OwlCarousel>(null);
    const [img, setImg] = useState(0)
    const [selectedSlide, setSelectedSlide] = useState(0); // Thêm state cho slider được chọn
    const handleSelectImg = (item: string, index: number) => {
        setSelectedSlide(index);
        setImg(index)

    }
    const [carouselKey, setCarouselKey] = useState(0);

    const [products, setProducts] = useState<Product[]>([]);


    const addToCart = useSelector(
        (state: any) => state.app.addToCart
    );

    useEffect(() => {
        axios
            .get(apiProduct)
            .then(function (response) {
                const filter = response.data.find((item: any) => item.id === location.state)
                setDetailItem(filter);
                if (filter && filter.color && filter.color[0]) {
                    setValue('color', filter.color[0]);
                }
                if (filter && filter.size && filter.size[0].capacity) {
                    setPriceSize(filter.size[0].priceSale)
                    setCostSize(filter.size[0].cost)
                    setValue('kichthuoc', filter.size[0].capacity);
                }

            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });


    }, [location.state]);

    useEffect(() => {
        if (detailItem) {
            const category = detailItem.category
            axios
                .get(apiProduct + `?category=${category}`)
                .then(function (response) {
                    const filter = response.data.filter((item: any) => item.id !== detailItem.id)
                    setProducts(filter);

                })
                .catch(function (error) {
                    // handle error
                    console.log(error);
                })
                .finally(function () {
                    // always executed
                });
        }



    }, [detailItem]);


    // useEffect(() => {
    //     setDetailItem(location.state);

    //     window.scrollTo({
    //         top: 0,
    //         behavior: "smooth"
    //     });
    //     setCarouselKey(carouselKey + 1);

    // }, [location.state])

    const owlOptions = {
        items: 1, // Số hình ảnh hiển thị trong hình chính
        nav: false,
        dots: false,
        startPosition: img,
        onChanged: (event: any) => {
            // Lấy hình ảnh hiện tại của hình chính
            const currentIndex = event.item.index;
            if (currentIndex !== null) {
                setSelectedSlide(currentIndex);
                setImg(currentIndex)

            }
        },

    };



    const owlOptionsSimilar = {
        items: 5,


    };


    const f = new Intl.NumberFormat("vi-VN", {
        style: 'currency',
        currency: 'VND',
    })


    const { control, handleSubmit, register, setValue, watch } =
        useForm<FormData>({
            mode: "onChange",
            defaultValues: {
                quantity: 1,
            },
        });

    const watchColor = watch("color");
    const watchStatusKichthuoc = watch("kichthuoc");

    const [priceSize, setPriceSize] = useState()
    const [costSize, setCostSize] = useState()

    const handleClickSize = (index: number) => {

        if (detailItem?.size[index]?.priceSale !== undefined) {
            setPriceSize(detailItem.size[index].priceSale);
            setCostSize(detailItem.size[index].cost);
        }
    }



    const [showDesc, setShowDesc] = useState(true)
    const [showInfo, setShowInfo] = useState(false)

    const handleShowDesc = () => {
        setShowDesc(true)
        setShowInfo(false)

    }

    const handleShowInfo = () => {
        setShowInfo(true)
        setShowDesc(false)
    }
    const handleSubmitForm = (values: any, event: any) => {
        const existingProduct = addToCart.find((item: any) => item.id === detailItem?.id && item.color === values.color && item.kichthuoc === values.kichthuoc);

        if (existingProduct) {
            dispatch(setAddToCart(addToCart.map((item: any) => item.id === detailItem?.id && item.color === existingProduct.color && item.kichthuoc === existingProduct.kichthuoc ?
                { ...item, quantity: item.quantity + values.quantity } : item)))
        } else {
            dispatch(setAddToCart([...addToCart, { ...values, id: detailItem?.id, name: detailItem?.name, image: detailItem?.image[0], price: (priceSize || detailItem?.priceSale) }]))
        }

        if (event.nativeEvent.submitter.name === 'btn-1') {
            navigate('/gio-hang')

        } else if (event.nativeEvent.submitter.name === 'btn-2') {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

    }

    // const slugifyLink = slugify(detailItem.category, { lower: true })



    return (
        <DefaultLayout>
            <div className={cx("wrapper-product")}>
                <div className={cx("banner")}>
                    <div className={cx("path", "container")}>
                        <span>Trang chủ </span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("all-product")}>{detailItem?.category}</span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("product")}>{detailItem?.name}</span>

                    </div>
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-5'>
                            <div className='row'>
                                <div className={cx('col-md-12')}>
                                    <div className={cx('img-main')}>
                                        {/* {img && <img src={img} alt="" />} */}
                                        {
                                            <OwlCarousel className="owl-theme main-carousel"
                                                ref={mainCarouselRef}
                                                {...owlOptions}

                                            >
                                                {
                                                    detailItem && detailItem.image.map((item: any, index: number) => (
                                                        <img key={index} src={item} alt="" />
                                                    ))
                                                }
                                            </OwlCarousel>
                                        }


                                    </div>
                                </div>
                                <div className='col-md-12'>
                                    <div className={cx('nav-img', 'thumbnail-carousel')} >
                                        <OwlCarousel
                                            className={cx('vertical-carousel', "owl-theme thumbnail-carousel")}
                                            nav={false}
                                            dots={false}
                                            items={4}
                                        >
                                            {
                                                detailItem && detailItem?.image.length > 0 && detailItem?.image.map((item: string, index: number) =>
                                                    // <div className={cx(`${ index === selectedSlide ? 'selected' : ''}`, 'box-nav-img')}  >
                                                    //     <img src={item} alt="" onClick={() => handleSelectImg(item, index)} />
                                                    // </div>
                                                    <NavSliderImage key={index} img={img} item={item} index={index} selectedSlide={selectedSlide} handleSelectImg={handleSelectImg}>

                                                    </NavSliderImage>



                                                )
                                            }
                                        </OwlCarousel>
                                    </div>


                                </div>


                            </div>

                        </div>
                        <div className='col-md-7'>
                            <form onSubmit={handleSubmit(handleSubmitForm)}>
                                <div className={cx('detail-top')}>
                                    <Title className={cx('custom-title')}>{detailItem?.name}</Title>
                                    <div className={cx('box-brand-quantity')}>
                                        <div>
                                            <TitleOption>Thương hiệu:</TitleOption>
                                            <span>{detailItem?.brand}</span>
                                        </div>
                                        <div className={cx('quantity')}>
                                            <TitleOption>Tình trạng:</TitleOption>
                                            <span>{detailItem && detailItem.quantity > 0 ? "Còn hàng" : 'Hết hàng'}</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={cx("box-price-modal")}>
                                            <span className={cx("sale-price")}>
                                                {
                                                    detailItem?.size ? f.format(priceSize || 0) : detailItem?.priceSale
                                                }

                                            </span>
                                            <span className={cx("compare-price")}>
                                                {
                                                    detailItem?.size ? f.format(costSize || 0) : detailItem?.cost
                                                }

                                            </span>
                                        </div>
                                    </div>

                                </div>
                                <div className={cx('detail-mid')}>
                                    <div>
                                        {detailItem && detailItem.size &&
                                            <div className='my-3'>
                                                <TitleOption>Kích thước:</TitleOption>
                                                {
                                                    detailItem.size.map((item: { capacity: number }, index: number) =>
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
                                                    )
                                                }

                                            </div>

                                        }
                                        {detailItem?.color &&
                                            <div className='d-flex align-items-center'>
                                                <TitleOption>Màu sắc:</TitleOption>
                                                {
                                                    detailItem.color.map((item: string) =>
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
                                                    )
                                                }
                                            </div>

                                        }

                                        <div className={cx('quantity-in-de')}>
                                            <TitleOption>Số lượng:</TitleOption>
                                            <InputQuantity
                                                name="quantity"
                                                control={control}
                                            ></InputQuantity>
                                        </div>
                                    </div>

                                </div>
                                <div className={cx('detail-bottom')}>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <ButtonLarge name='btn-1' className={cx('custom-btn-buynow')} type='submit'>
                                                <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                                                <span>Mua ngay</span>
                                            </ButtonLarge>
                                        </div>
                                        <div className='col-md-6'>
                                            <ButtonLarge name='btn-2' type='submit'>Thêm vào giỏ hàng</ButtonLarge>
                                        </div>
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '40px', float: 'left' }}>
                                                <img src="https://bizweb.dktcdn.net/100/432/370/themes/894869/assets/service_product_1.png?1676276556806" alt="" />
                                            </div>
                                            <TitleOption className={cx('custom-title-option')}>Vận chuyển toàn quốc:</TitleOption>
                                            <span>
                                                Miễn phí vận chuyển trong bán kính 15km
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>

                                            <div style={{ width: '40px', float: 'left' }}>
                                                <img src="https://bizweb.dktcdn.net/100/432/370/themes/894869/assets/service_product_2.png?1676276556806" alt="" />
                                            </div>
                                            <TitleOption className={cx('custom-title-option')}>Hỗ trợ đổi trả:</TitleOption>
                                            <span>
                                                Trong vòng 15 ngày kể từ khi mua hàng
                                            </span>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <div style={{ width: '40px', float: 'left' }}>
                                                <FontAwesomeIcon className={cx('icon-phone')} icon={faPhone}></FontAwesomeIcon>
                                            </div>
                                            <TitleOption className={cx('custom-title-option')}>Hỗ trợ tư vấn:</TitleOption>
                                            <span>17770000</span>

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className={cx('desc-product')}>
                        <ul className={cx('desc-product-title')}>
                            <li className={cx(`${showDesc && 'active'}`)} onClick={handleShowDesc}>MÔ TẢ THÔNG TIN</li>
                            <li className={cx(`${showInfo && 'active'} `)} onClick={handleShowInfo}>THÔNG TIN SẢN PHẨM</li>
                        </ul>
                        {
                            showDesc && <div style={{ padding: '30px 0' }}>
                                Mô tả sản phẩm
                            </div>
                        }


                        {
                            showInfo && <div style={{ padding: '30px 0' }}>
                                Thông tin sản phẩm
                            </div>
                        }
                    </div>
                    {

                    }
                    <div className={cx('related-products')}>
                        <div className='row'>
                            <Heading to={`danh-muc/${detailItem && slugify(detailItem.category, { lower: true })}`}> Sản phẩm liên quan</Heading>

                            {products.length > 0 && products.slice(0,5).map((item: any, index: number) =>
                                <div className={cx('custom-col')} >
                                    <ProductItem key={index} data={item}></ProductItem>
                                </div>

                            )
                            }
                        </div>






                    </div>

                </div>
            </div >
        </DefaultLayout >

    );
};

export default DetailPage;