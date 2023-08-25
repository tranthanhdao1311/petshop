import React, { useEffect, useState } from 'react';
import styles from "./Cart.module.scss";
import classNames from "classnames/bind";
import { useLocation } from 'react-router-dom';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import Heading from '../../components/Heading/Heading';
import Title from '../../components/Title/Title';
import { Link } from 'react-router-dom';
import slugify from 'slugify';
import useFormatPrice from '../../hook/useFormatPrice';
import Price from '../../components/Price/Price';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { setAddToCart, setRemoveItemCart } from '../../store/app/slice';
import ButtonLarge from '../../components/ButtonLarge/ButtonLarge';

const cx = classNames.bind(styles);


const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0)

    const f = new Intl.NumberFormat("vi-VN", {
        style: 'currency',
        currency: 'VND',
    })
    const addToCart = useSelector(
        (state: any) => state.app.addToCart
    );
    const dispatch = useDispatch()

    const handleDeleteItem = (indexItemDelete: number) => {
        dispatch(setRemoveItemCart(indexItemDelete))
        const filterItem = addToCart.filter((item: {}, index: number) => index !== indexItemDelete)
        localStorage.setItem('cart', JSON.stringify(filterItem))
    }

    useEffect(() => {
        const total = addToCart.reduce((acc: number, curr: { price: number, quantity: number }) => {
            const totalPriceItem = curr.price * curr.quantity
            return acc + totalPriceItem
        }, 0)
        setTotalPrice(total)
    }, [addToCart])

    useEffect(() => {
        const cartJson = localStorage.getItem('cart')
        if (cartJson !== null) {
            const cart = JSON.parse(cartJson)
            dispatch(setAddToCart(cart))
        }
    }, [])

    const handleDecrease = (itemDe: { id: number, quantity: number, color: string, kichthuoc: number }) => {
        if (itemDe.quantity <= 1) {
            return
        }
        else {
            const updateQuantity = addToCart.map((item: any) => item.id === itemDe.id && item.color === itemDe.color && item.kichthuoc === itemDe.kichthuoc ? { ...item, quantity: item.quantity - 1 } : item)
            dispatch(setAddToCart(updateQuantity))
            localStorage.setItem('cart', JSON.stringify(updateQuantity))

        }


    }

    const handleIncrease = (itemIn: { id: number, quantity: number, color: string, kichthuoc: number }) => {
        if (itemIn.quantity >= 15) {
            return
        }
        else {
            const updateQuantity = addToCart.map((item: any) => item.id === itemIn.id && item.color === itemIn.color && item.kichthuoc === itemIn.kichthuoc ? { ...item, quantity: item.quantity + 1 } : item)
            dispatch(setAddToCart(updateQuantity))
            localStorage.setItem('cart', JSON.stringify(updateQuantity))
        }

    }


    return (
        <DefaultLayout>
            <div className={cx("wrapper-product")}>
                <div className={cx("banner")}>
                    <div className={cx("path", "container")}>
                        <span>Trang chủ </span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("all-product")}>Giỏ hàng</span>
                    </div>
                </div>
                <div className='container'>
                    <div>
                        <Title> Giỏ hàng của bạn</Title>
                        {
                            addToCart && addToCart.length > 0 &&
                            <>
                                <table className={cx('table-cart')}>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '18%' }}>Ảnh sản phẩm</th>
                                            <th style={{ width: '32%' }}>Tên sản phẩm</th>
                                            <th style={{ width: '17%' }}>Đơn giá</th>
                                            <th style={{ width: '14%' }}>Số lượng</th>
                                            <th style={{ width: '14%' }}>Thành tiền</th>
                                            <th style={{ width: '15%' }}>Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {addToCart.map((item: any, index: number) => {
                                            return <tr key={index}>
                                                <td >
                                                    <Link to={`/${slugify(item.name, {
                                                        lower: true
                                                    })}`}><img src={item.image} alt="" />
                                                    </Link>
                                                </td>

                                                <td>
                                                    <div>
                                                        <Link to={`/${slugify(item.name, {
                                                            lower: true
                                                        })}`}>{item.name}</Link>
                                                    </div>
                                                    {item.color && item.color !== undefined && item.color}
                                                </td>
                                                <td>
                                                    <Price>
                                                        {f.format(item.price)}
                                                    </Price>
                                                </td>
                                                <td>
                                                    <div className={cx('box-quantity')}>
                                                        <button onClick={() => handleDecrease(item)} className={cx('btn-decrease')}>-</button>
                                                        <span style={{ margin: '0px 10px' }}>{item.quantity}</span>
                                                        <button onClick={() => handleIncrease(item)} className={cx('btn-increase')} >+</button>
                                                    </div>

                                                </td>
                                                <td><Price>{f.format(item.price * item.quantity)}</Price></td>
                                                <td>
                                                    <FontAwesomeIcon onClick={() => handleDeleteItem(index)} className={cx('trash-item')} icon={faTrashAlt}></FontAwesomeIcon>
                                                </td>
                                            </tr>

                                        },



                                        )}


                                    </tbody>


                                </table>
                                <div className='row'>
                                    <div className='col-lg-7 col-md-7'>
                                        <Link to={'/collections/san-pham'} className={cx('btn-back')}>
                                            Tiếp tục mua hàng
                                        </Link>
                                    </div>
                                    <div className='col-lg-5 col-md-5'>
                                        <p className={cx('total-price')}>Tổng tiền thanh toán: <Price>{f.format(totalPrice)}</Price></p>

                                        <ButtonLarge to='/' type='button'>Tiến hành thanh toán</ButtonLarge>

                                    </div>
                                </div>
                            </>
                        }


                        {addToCart.length === 0 && <p>Không có sản phẩm nào. Quay lại cửa hàng để tiếp tục mua sắm.
                        </p>}

                    </div>
                </div>
            </div >
        </DefaultLayout >
    );
};

export default Cart;