import React, { ReactNode } from 'react';
import styles from './NavSliderImage.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

interface GlobalStyleProps {
    item: string,
    index: number,
    selectedSlide: number,
    handleSelectImg: Function, 
    children?: ReactNode,
    img?: number

}

const NavSliderImage:React.FC<GlobalStyleProps> = ({children, img, item, index, selectedSlide, handleSelectImg }) => {
    return (
        <div className={cx(`${selectedSlide === index ? 'selected' : ''}`, 'box-nav-img')}  >
            <img src={item} alt="" onClick={() => handleSelectImg(item, index)} />
        </div>
    );
};

export default NavSliderImage;