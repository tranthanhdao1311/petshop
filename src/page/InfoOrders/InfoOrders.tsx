import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from "./InfoOrders.module.scss";
import classNames from "classnames/bind";
import { Formik } from 'formik';
import * as yup from "yup";
import Title from '../../components/Title/Title';
import LabelInput from '../../components/LabelInput/LabelInput';
import InputValue from '../../components/InputValue/InputValue';
import InputTogglePassword from '../../components/InputTogglePassword/InputTogglePassword';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../../firebase/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/app/auth';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';
import SignIn from '../SignIn/SignIn';
import { NavLink } from 'react-router-dom';
import LayoutInfoUser from '../../components/Layout/LayoutInfoUser/LayoutInfoUser';
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
const InfoOrders = () => {

    const navigate = useNavigate()

    const [data, setData] = useState<any>()
    console.log(data)
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



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (!user) {
                // Người dùng đã xác thực, chuyển hướng đến trang /account
                navigate('/account/login');
            }
        });

        // Dọn dẹp trình nghe khi thành phần bị hủy
        return () => unsubscribe();
    }, [navigate]);

    if (auth.currentUser === null) {
        return null
    }





    return (

        <LayoutInfoUser>
            <div className={cx('box-title')}>
                <h5 className={cx('title-head')}>ĐƠN HÀNG CỦA BẠN</h5>
                {/* <div>
                    <p className={cx('title')}><strong>Họ tên: </strong> <span>{data?.lastname + ' ' + data?.firstname}</span></p>
                    <p className={cx('title')}><strong>Email: </strong><span>{data?.email}</span></p>
                    <p className={cx('title')}><strong>Điện thoại: </strong><span>{data?.phone}</span></p>
                    {data?.address &&
                        <p className={cx('title')}><strong>Địa chỉ: </strong></p>
                    }
                </div> */}

            </div>

        </LayoutInfoUser>

    );
};

export default InfoOrders;