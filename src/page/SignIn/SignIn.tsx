import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from "./SignIn.module.scss";
import classNames from "classnames/bind";
import { Formik } from 'formik';
import * as yup from "yup";
import Title from '../../components/Title/Title';
import LabelInput from '../../components/LabelInput/LabelInput';
import InputValue from '../../components/InputValue/InputValue';
import InputTogglePassword from '../../components/InputTogglePassword/InputTogglePassword';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase/firebase-config';
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../store/app/auth';
import { toast } from 'react-toastify';
import InfoUser from '../InfoUser/InfoUser';
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
const SignIn = () => {

    console.log(auth)

    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [errorAccount, setErrorAccount] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const handleSubmitForm = async (values: any) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);

            dispatch(setUser({ uid: auth.currentUser?.uid, email: auth.currentUser?.email, displayName: auth.currentUser?.displayName }))
            navigate('/account');

        } catch (error: any) {
            console.log(error)
            if (error.code === "auth/user-not-found") {
                // toast.error('Tài khoản chưa được đăng ký')
                setErrorAccount('Tài khoản chưa được đăng ký')
            }
            if (error.code === "auth/wrong-password") {
                // toast.error('Vui lòng kiểm tra lại mật khẩu')
                setErrorPassword('Vui lòng kiểm tra lại mật khẩu')
            }
        }


    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                // Người dùng đã xác thực, chuyển hướng đến trang /account
                navigate('/account');
            }
        });

        // Dọn dẹp trình nghe khi thành phần bị hủy
        return () => unsubscribe();
    }, [navigate]);

    
    if (auth.currentUser !== null) {
        return null;
    }



    return (
        <DefaultLayout>
            <div className={cx("wrapper-product")} >
                <div className={cx("banner")}>
                    <div className={cx("path", "container")}>
                        <span>Trang chủ </span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("all-product")}>Đăng nhập tài khoản</span>
                    </div>
                </div>
                <div className='container'>
                    <div className=' row '>
                        <div className='col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                            <div>
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    onSubmit={handleSubmitForm}
                                    validationSchema={schema}
                                >
                                    {(formik: any) => (
                                        <>
                                            {console.log(formik)}
                                            <form onSubmit={formik.handleSubmit}>
                                                <Title>Đăng nhập</Title>
                                                <div>
                                                    <LabelInput htmlFor='email'>Email <span>*</span></LabelInput>
                                                    <InputValue
                                                        name='email'
                                                        value={formik.values.email}
                                                        touched={formik.touched.email}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.email || errorAccount}
                                                        onBlur={formik.handleBlur}
                                                        type='text'
                                                        placeholder='Email'></InputValue>
                                                </div>

                                                <div>
                                                    <LabelInput htmlFor='password'>Mật khẩu <span>*</span></LabelInput>
                                                    <InputTogglePassword
                                                        name='password'
                                                        touched={formik.touched.password}
                                                        value={formik.values.password}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.password || errorPassword}
                                                        onBlur={formik.handleBlur}
                                                        placeholder='Mật khẩu'></InputTogglePassword>
                                                </div>


                                                <div className='w-100'>
                                                    <Button className={cx('custom-btn-login')} type='submit'>Đăng nhập</Button>
                                                </div>
                                                <div>
                                                    <p className={cx('or')}>Bạn chưa có tài khoản? Đăng kí tài khoản <Link className={cx('link-login')} to='/account/register'>tại đây</Link></p>
                                                </div>
                                            </form>
                                            <div className={cx('login-social')}>
                                                <p>Hoặc đăng nhập bằng</p>
                                                <div className={cx('logo-social')}>
                                                    <Link to={'/'}>
                                                        <img style={{ width: '129px', height: '37px' }} src="https://bizweb.dktcdn.net/assets/admin/images/login/fb-btn.svg" alt="" />
                                                    </Link>
                                                    <Link to={'/'}>
                                                        <img style={{ width: '129px', height: '37px' }} src="https://bizweb.dktcdn.net/assets/admin/images/login/gp-btn.svg" alt="" />
                                                    </Link>
                                                </div>

                                            </div>
                                        </>
                                    )

                                    }
                                </Formik>


                            </div>

                        </div>

                    </div>
                </div>
            </div>

        </DefaultLayout>

    );
};

export default SignIn;