import React, { ReactNode, useEffect, useState } from 'react';
import styles from "./LayoutInfoUser.module.scss";
import classNames from "classnames/bind";
import DefaultLayout from '../DefaultLayout/DefaultLayout';
import { NavLink } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebase/firebase-config';

const cx = classNames.bind(styles);

interface GlobalStyleProps {
    children: ReactNode
}

const listMenu = [
    {
        name: 'Thông tin tài khoản',
        to: '/account'
    },
    {
        name: 'Đơn hàng của bạn',
        to: '/account/orders'
    },
    {
        name: 'Đổi mật khẩu',
        to: '/account/changepassword'
    },
    {
        name: 'Sổ địa chỉ',
        to: '/account/addresses'
    }
]
const LayoutInfoUser: React.FC<GlobalStyleProps> = ({ children }) => {

    const active = ({ isActive }: any) => (isActive ? cx("active") : "");
    const [data, setData] = useState<any>()
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Lấy thông tin người dùng từ Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setData(userData)

                }
            } else {

            }
        })
        // Hủy theo dõi khi unmount
        return () => unsubscribe();
    }, [])
    return (
        <DefaultLayout>
            <div className={cx("wrapper-product")}>
                <div className={cx("banner")}>
                    <div className={cx("path", "container")}>
                        <span>Trang chủ </span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("all-product")}>Trang khách hàng</span>
                    </div>
                </div>
                <div style={{ padding: '20px 0' }} >
                    <div className='container'>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-12 col-lg-3 col-left-ac'>
                                <div className={cx('block-account')}>
                                    <h5>TRANG TÀI KHOẢN</h5>
                                    <p className={cx('box-welcome')}>
                                        <span className={cx('hello')}>Xin chào, </span>
                                        <span className={cx('name-user')}>{!data ? 'User' : data?.lastname + " " + data?.firstname}</span>
                                        <span> !</span>
                                    </p>
                                    <ul>
                                        {
                                            listMenu.length > 0 && listMenu.map((item: any) =>
                                                <li><NavLink className={active} to={item.to}>{item.name}</NavLink></li>
                                            )
                                        }                                    
                                    </ul>
                                </div>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-lg-9 col-right-ac'>
                                {children}
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </DefaultLayout>
    );
};

export default LayoutInfoUser;