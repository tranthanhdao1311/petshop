import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from "./InfoUser.module.scss";
import classNames from "classnames/bind";
import { Formik } from 'formik';
import * as yup from "yup";
import Title from '../../components/Title/Title';
import LabelInput from '../../components/LabelInput/LabelInput';
import InputValue from '../../components/InputValue/InputValue';
import InputTogglePassword from '../../components/InputTogglePassword/InputTogglePassword';
import Button from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/app/auth';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
const cx = classNames.bind(styles);

const schema = yup.object().shape({

    email: yup
        .string()
        .email("Vui lòng nhập email")
        .required("Vui lòng nhập trường này"),


    password: yup
        .string()
        .min(8, "Mật khẩu của bạn phải có ít nhất 8 ký tự trở lên")
        .required("Vui lòng nhập trường này "),

});
const InfoUser = () => {

    const userInfo = useSelector(
        (state: any) => state.auth.user
      );
      console.log(userInfo)
    const [data, setData] = useState<any>()
    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // Lấy thông tin người dùng từ Firestore
                const userDocRef = doc(db, "users", user.uid);
                const userDocSnapshot = await getDoc(userDocRef);
                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    console.log(userData)
                    setData(userData)
                } else {
                }
            } else {
                console.log("Người dùng đã đăng xuất");
            }
        })
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
                                        <li> <Link to={''}>Thông tin tài khoản</Link ></li>
                                        <li><Link to={''}>Đơn hàng của bạn</Link></li>
                                        <li><Link to={''}>Đổi mật khẩu</Link></li>
                                        <li><Link to={''}>Sổ địa chỉ</Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className='col-xs-12 col-sm-12 col-lg-9 col-right-ac'>
                                <h5 className={cx('title-head')}>ĐỊA CHỈ CỦA BẠN</h5>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </DefaultLayout>
    );
};

export default InfoUser;