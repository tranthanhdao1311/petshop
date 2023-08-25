
import React from 'react';
import HeaderUser from '../../components/Header/HeaderUser';
import Banner from '../../components/Banner/Banner';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import Category from '../../components/Category/Category';
import ProductOutstanding from '../../components/ProductOutstanding/ProductOutstanding';
import BannerIndex from '../../components/BannerIndex/BannerIndex';
import ProductOnSale from '../../components/ProductOnSale/ProductOnSale';
import Service from '../../components/Service/Service';
import Accessory from '../../components/Accessory/Accessory';
import Brand from '../../components/Brand/Brand';
import ProductItem from '../../components/ProductItemTest/ProductItemTest';
import ProductItemTest from '../../components/ProductItemTest/ProductItemTest';

const HomePage:React.FC = () => {
    return (
        <DefaultLayout>
            <Banner/>
            <Category></Category>
            <ProductOutstanding></ProductOutstanding>
            <BannerIndex></BannerIndex>
            <ProductOnSale></ProductOnSale>
            <Service></Service>
            <Accessory></Accessory>
            <Brand></Brand>
        </DefaultLayout>
    );
};

export default HomePage;