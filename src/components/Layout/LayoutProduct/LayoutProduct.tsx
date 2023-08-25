import React, { ReactNode, useEffect, useState } from 'react';
import styles from "./LayoutProduct.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import Title from '../../Title/Title';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import { faChevronDown, faChevronUp, faSearch } from '@fortawesome/free-solid-svg-icons';
import ReactSlider from 'react-slider';
import ButtonLarge from '../../ButtonLarge/ButtonLarge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Checkbox from '../../Checkbox/Checkbox';
import axios from 'axios';
import { apiCategores } from '../../../api';
import slugify from 'slugify';
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

interface SelectedBrandsType {
    [key: string]: boolean;
}
interface GlobalStyleProps {
    children: ReactNode,
    data: Product[],
    productsSortDefault: Product[],
    sortAZ: Function,
    sortZA: Function,
    sortDefault: Function,
    sortPriceUp: Function,
    sortPriceDown: Function,
    sortOldest: Function,
    sortLatest: Function,
    onChangeBrand?: any,
    onChangePrice?: any,
    title?: string,
    labelSort?: string
}

const LayoutProduct: React.FC<GlobalStyleProps> = ({ children, title, labelSort, data, onChangeBrand, onChangePrice, productsSortDefault, sortAZ, sortZA, sortDefault, sortPriceUp, sortPriceDown, sortOldest, sortLatest }) => {

    const [productsDefault, setProductsDefault] = useState<Product[]>([]);
    const [brands, setBrands] = useState(brand)

    const [categories, setCategories] = useState([])
    const [showNavCate, setShowNavCate] = useState(false)

    const handleShowNavCate = () => {
        setShowNavCate(!showNavCate)
    }

    useEffect(() => {
        axios.get(apiCategores)
            .then(function (response) {
                setCategories(response.data);
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });
    }, [])


    const f = new Intl.NumberFormat("vi-VN", {
        style: 'currency',
        currency: 'VND',
    })


    const [valueFilterBrand, setValueFilterBrand] = useState<string>()
    const handleChangeInputBrand = (e: any) => {
        setValueFilterBrand(e.target.value)
    }

    useEffect(() => {
        if (valueFilterBrand && valueFilterBrand.length > 0) {
            const filteredBrands = brand.filter((item: string) =>
                item.toLowerCase().includes(valueFilterBrand.toLowerCase())
            )
            setBrands(filteredBrands)
        } else {
            setBrands(brand)
        }
    }, [valueFilterBrand])

    const [selectedBrands, setSelectedBrands] = useState<SelectedBrandsType>({})
    const handleCheckboxChange = (name: any) => {
        setSelectedBrands((prev: any) => ({
            ...prev,
            [name]: !prev[name]
        }))
    }

    useEffect(() => {
        if (Object.values(selectedBrands).some((value) => value)) {
            const filter = productsSortDefault.filter((item: any) => selectedBrands[item.brand] === true)
            // setProducts(filter)
            onChangeBrand(filter)
        } else {
            onChangeBrand(productsSortDefault)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedBrands])

    const [minPrice, setMinPrice] = useState(0);
    const [priceLimit, setPriceLimit] = useState(1000000)
    const handleChangePriceLimit = (values: [minPrice: number, priceLimit: number]) => {
        setMinPrice(values[0])
        setPriceLimit(values[1])
    }

    const handleSubmit = () => {

        const filter = productsSortDefault.filter((product: any) => (product.priceSale || product.size[0].priceSale) <= priceLimit && (product.priceSale || product.size[0].priceSale) > minPrice)
        onChangePrice(filter)
    }

    return (
        <DefaultLayout>
            <div className={cx("wrapper-product")}>
                <div className={cx("banner")}>
                    <div className={cx("path", "container")}>
                        <span>Trang chủ </span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("all-product")}>{title}</span>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className={cx("side-bar", "col-3")}>
                            <div>
                                <div className={cx("sidebar-category")}>
                                    <Title>Danh mục sản phẩm</Title>
                                    <div className={cx("aside-content")}>
                                        <ul className={cx("category-list")}>
                                            <li className={cx("category-item")}>
                                                <Link className={cx('category-item-link')} to={"/"}>Trang chủ</Link>
                                            </li>
                                            <li className={cx("category-item")}>
                                                <div className={cx('category-nav')}>
                                                    <Link className={cx('category-item-link')} to={"/collections/san-pham"}>Sản phẩm</Link>
                                                    {
                                                        categories.length > 0 && <div onClick={handleShowNavCate} >
                                                            {
                                                                showNavCate ?
                                                                    <FontAwesomeIcon className={cx('category-nav-icon')} icon={faChevronUp}></FontAwesomeIcon>
                                                                    :
                                                                    <FontAwesomeIcon className={cx('category-nav-icon')} icon={faChevronDown}></FontAwesomeIcon>

                                                            }
                                                        </div>
                                                    }

                                                </div>
                                                {showNavCate && categories.length > 0 &&
                                                    <ul className={cx('cate-nav-list')}>
                                                        {
                                                            categories.map((item: any) => <li className={cx('item-cate-nav')}><Link to={`/danh-muc/${slugify(item.name, { lower: true })}`}>{item.name}</Link></li>)
                                                        }
                                                    </ul>}

                                            </li>
                                            <li className={cx("category-item")}>
                                                <Link className={cx('category-item-link')} to={"/"}>Bảng giá</Link>
                                            </li>
                                            <li className={cx("category-item")}>
                                                <Link className={cx('category-item-link')} to={"/"}>Tin thú cưng</Link>
                                            </li>
                                            <li className={cx("category-item")}>
                                                <Link className={cx('category-item-link')} to={"/"}>Đặt lịch</Link>
                                            </li>
                                            <li className={cx("category-item")}>
                                                <Link className={cx('category-item-link')} to={"/"}>Liên hệ</Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={cx("filter-product")}>
                                    <Title>Chọn thương hiệu</Title>
                                    <div className={cx("box-filter")}>
                                        <input
                                            onChange={(e) => handleChangeInputBrand(e)}
                                            type="text"
                                            className={cx("input")}
                                            placeholder="Bạn muốn tìm gì"
                                        />
                                        <Button
                                            type="submit"
                                            icon={faSearch}
                                            className={cx("icon")}
                                        ></Button>
                                    </div>
                                    <ul className={cx("list-product-filter")}>
                                        {brands.length > 0 && brands.map((item: any) =>
                                            <li>
                                                <Checkbox
                                                    checked={selectedBrands[item] || false}
                                                    onChange={() => handleCheckboxChange(item)}
                                                >
                                                    {item}
                                                </Checkbox>
                                            </li>)}

                                        {brands.length === 0 && <span>Không có thương hiệu bạn tìm kiếm!</span>}

                                    </ul>
                                </div>
                                <div className={cx("filter-price")}>
                                    <Title>Khoảng giá</Title>

                                    <ReactSlider
                                        className="horizontal-slider"
                                        thumbClassName="example-thumb"
                                        trackClassName="example-track"
                                        defaultValue={[minPrice, priceLimit]}
                                        ariaLabel={["Lower thumb", "Upper thumb"]}
                                        ariaValuetext={(state: any) =>
                                            `Thumb value ${state.valueNow}`
                                        }
                                        onChange={handleChangePriceLimit}
                                        renderThumb={(props: any, state: any) => (

                                            <div {...props}>{f.format(state.valueNow)}</div>
                                        )}
                                        pearling
                                        minDistance={10}
                                        max={1000000}
                                    />
                                    <ButtonLarge
                                        type="button"
                                        className={cx("custom-btn-filter-price")}
                                        onClick={handleSubmit}
                                    >
                                        Lọc giá
                                    </ButtonLarge>

                                </div>
                            </div>
                        </div>
                        <div className={cx("main-container", "col-12 col-lg-9")}>
                            <div>
                                <Title>{title}</Title>
                                <div className={cx("sort-by")}>
                                    <ul className={cx("list-sort")}>
                                        <li className={cx('label-sort')}>
                                            <p >{labelSort}</p>
                                            <FontAwesomeIcon
                                                className={cx("icon-sort")}
                                                icon={faChevronDown}
                                            ></FontAwesomeIcon>
                                        </li>
                                        <ul className={cx("list-sort-nav")}>
                                            <li onClick={() => sortDefault()}>
                                                Mặc định
                                            </li>
                                            <li onClick={() => sortAZ()}>
                                                A - Z
                                            </li>
                                            <li onClick={() => sortZA()}>
                                                Z - A
                                            </li>
                                            <li onClick={() => sortPriceUp()}>
                                                Giá tăng dần
                                            </li>
                                            <li onClick={() => sortPriceDown()}>
                                                Giá giảm dần
                                            </li>
                                            <li onClick={() => sortLatest()}>
                                                Sản phẩm mới nhất
                                            </li>
                                            <li onClick={() => sortOldest()}>
                                                Sản phẩm cũ nhất
                                            </li>
                                        </ul>
                                    </ul>
                                </div>
                            </div>

                            <div className="row">
                                {children}
                            </div>
                            {/* 
                            {currentItem < data.length && (
                                <Loadmore items={currentItem} setItems={setCurrentItem}>
                                    Xem thêm...
                                </Loadmore>
                            )} */}
                        </div>
                    </div>
                </div>
            </div >
            {/* <div className={cx("box-icon-filter")}>
                <FontAwesomeIcon
                    className={cx("icon-filter")}
                    icon={faFilter}
                ></FontAwesomeIcon>
            </div> */}
        </DefaultLayout >
    );
};

export default LayoutProduct;