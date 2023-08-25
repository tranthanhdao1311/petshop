import React from 'react';
import images from '../../asset/image/img';
import styles from "./BannerIndex.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
const BannerIndex = () => {
    return (
        <div className={cx('banner-index')}>
            <img className={cx('img')} src={images.imgBanner2} alt="" />
        </div>
    );
};

export default BannerIndex;