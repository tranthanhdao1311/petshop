import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from "./CategoryPage.module.scss";
import classNames from "classnames/bind";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { apiCategores, apiProduct } from '../../api';
import slugify from "slugify";
import LayoutProduct from '../../components/Layout/LayoutProduct/LayoutProduct';
import ProductItem from '../../components/ProductItem/ProductItem';
import Loadmore from '../../components/Loadmore/Loadmore';

const cx = classNames.bind(styles);

interface Categories {
    id: number,
    name: string,
    created_at: number


}

const CategoryPage = () => {
    const { slug } = useParams()
    const [categories, setCategories] = useState<Categories[]>([])
    const [products, setProducts] = useState<any>([])
    const [labelSort, setLabelSort] = useState('Sắp xếp theo')
    const [productsDefault, setProductsDefault] = useState<any>([]);
    const [currentItem, setCurrentItem] = useState(12);
    const [productsSortDefault, setProductsSortDefault] = useState<any>([]);
    useEffect(() => {

        axios.get(apiCategores)
            .then(function (response) {
                setCategories(response.data)
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .finally(function () {
                // always executed
            });


    }, [])




    const category = categories.find(category => slugify(category.name, { lower: true }) === slug);
    useEffect(() => {
        if (category) {
            const storedProducts = localStorage.getItem('sorted');
            if (storedProducts === 'az') {
                axios.get(apiProduct + `?category=${category.name}`)
                    .then(function (response) {
                        setProductsDefault(response.data)
                        setProductsSortDefault(response.data)
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
                axios.get(apiProduct + `?category=${category.name}`)
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
                axios.get(apiProduct + `?category=${category.name}`)
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
                axios.get(apiProduct + `?category=${category.name}`)
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
                axios.get(apiProduct + `?category=${category.name}`)
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
                axios.get(apiProduct + `?category=${category.name}`)
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
                axios.get(apiProduct + `?category=${category.name}`)
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
                axios.get(apiProduct + `?category=${category.name}`)
                    .then(function (response) {
                        setProducts(response.data)
                        setProductsDefault(response.data)
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

        }

    }, [category])


    const handleSortDefault = () => {
        localStorage.setItem('sorted', 'default');
        setProducts(productsDefault)
        setLabelSort('Mặc định')
        // localStorage.setItem('label-sort', JSON.stringify('Mặc định'))
        // localStorage.setItem('sort', JSON.stringify(productsDefault))
    }


    const handleSortAZ = () => {
        const sortData = [...products].sort((a, b) => {
            if (a.name < b.name) return -1;
            if (a.name > b.name) return 1;
            return 0;
        })
        localStorage.setItem('sorted', 'az');
        setProducts(sortData)
        setLabelSort('A-Z')


    }

    const handleSortZA = () => {
        const sortData = [...products].sort((a, b) => {
            if (a.name < b.name) return 1;
            if (a.name > b.name) return -1;
            return 0;
        })

        localStorage.setItem('sorted', 'za');

        setProducts(sortData)
        setLabelSort('Z-A')
    }

    const handleSortPriceUp = () => {
        const sortData = [...products].sort((a, b) => {
            const aPrice = a.priceSale || (a.size && a.size[0]?.priceSale);
            const bPrice = b.priceSale || (b.size && b.size[0]?.priceSale);

            return aPrice - bPrice;
        })
        localStorage.setItem('sorted', 'price-up');
        setProducts(sortData)
        setLabelSort('Giá tăng dần')
    }

    const handleSortPriceDown = () => {
        const sortData = [...products].sort((a, b) => {
            const aPrice = a.priceSale || (a.size && a.size[0]?.priceSale);
            const bPrice = b.priceSale || (b.size && b.size[0]?.priceSale);

            return bPrice - aPrice;
        })
        localStorage.setItem('sorted', 'price-down');

        setProducts(sortData)
        setLabelSort('Giá giảm dần')

    }

    const handleSortLatestProduct = () => {
        const sortData = [...products].sort((a, b) => {
            if (a.created_at < b.created_at) return 1;
            if (a.created_at > b.created_at) return -1;
            return 0;
        })
        localStorage.setItem('sorted', 'latest');

        setProducts(sortData)
        setLabelSort('Sản phẩm mới nhất')

    }


    const handleSortOldestProduct = () => {
        const sortData = [...products].sort((a, b) => {
            if (a.created_at > b.created_at) return 1;
            if (a.created_at < b.created_at) return -1;
            return 0;
        })
        localStorage.setItem('sorted', 'oldest');

        setProducts(sortData)
        setLabelSort('Sản phẩm cũ nhất')

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
                title={category?.name}
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


            </LayoutProduct>
    );
};

export default CategoryPage;