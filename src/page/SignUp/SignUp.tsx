import React, { useEffect, useState } from 'react';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from "./SignUp.module.scss";
import classNames from "classnames/bind";
import Heading from '../../components/Heading/Heading';
import Title from '../../components/Title/Title';
import InputValue from '../../components/InputValue/InputValue';
import LabelInput from '../../components/LabelInput/LabelInput';
import { Controller, useForm } from 'react-hook-form';
import InputPhone from '../../components/InputTogglePassword/InputTogglePassword';
import InputEmail from '../../components/InputEmail/InputEmail';
import { yupResolver } from "@hookform/resolvers/yup";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import InputTogglePassword from '../../components/InputTogglePassword/InputTogglePassword';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import * as yup from "yup";

import { Formik } from 'formik';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase/firebase-config';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const cx = classNames.bind(styles);

const validVietnamesePhonePrefixes = [
    '032', '033', '034', '035', '036', '037', '038', '039',
    '070', '076', '077', '078', '079', '081', '082', '083',
    '084', '085', '056', '058', '059', '098', '097', '096',
    '086', '088', '094', '091', '089', '090', '093', '092',
    '052', '099', '087'
];


const isValidPhoneNumber = (phoneNumber: any) => {
    // Thực hiện kiểm tra số điện thoại ở đây
    // Ví dụ: Kiểm tra xem số điện thoại có bắt đầu bằng số 0 hay không
    const validPrefixesPattern = validVietnamesePhonePrefixes.join('|');
    const regexPattern = new RegExp(`^(${validPrefixesPattern})[0-9]{7}$`);
    return regexPattern.test(phoneNumber);
};

const schema = yup.object().shape({
    firstName: yup.string().required("Vui lòng nhập trường này"),
    lastName: yup.string().required("Vui lòng nhập trường này"),
    email: yup
        .string()
        .email("Vui lòng nhập email")
        .required("Vui lòng nhập trường này"),
    phone: yup.string().test('phone', 'Vui lòng kiểm tra lại số điện thoại', (value: any) => {
        return isValidPhoneNumber(value);
    }).required("Vui lòng nhập trường này"), // Add phone validation


    password: yup
        .string()
        .min(8, "Mật khẩu của bạn phải có ít nhất 8 ký tự trở lên")
        .required("Vui lòng nhập trường này "),

    confirmPassword: yup
        .string()
        .required("Vui lòng nhập trường này ").oneOf([yup.ref('password')], 'Nhập lại mật khẩu không trùng khớp!'),
});


// const { control, register, handleSubmit, formState: { errors, isValid, isSubmitting, isSubmitted }, } = useForm({
//     mode: "onSubmit", resolver: yupResolver(schema), defaultValues: {
//         firstname: '',
//         lastname: '',
//         email: '',
//         // phone: ''
//     }
// })


const SignUp = () => {




    const [valuePhone, setValuePhone] = useState<string | undefined>('')
    const [isValidPhone, setIsValidPhone] = useState(true);
    const [isSubmitClicked, setIsSubmitClicked] = useState<boolean>(false);


    // const handleOnChange = (value: any) => {
    //     setValuePhone(value)
    //     setIsValidPhone(false)
    //     setIsSubmitClicked(true)


    // }
    

    const [error, setErorr] = useState('')
    const navigate = useNavigate()
    const handleSubmitForm = async (values: any) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const user = userCredential.user;
            await updateProfile(user, {
                displayName: values.lastName + ' ' + values.firstName,
            });
            const uid = user.uid;
            await setDoc(doc(db, "users", uid), {
                firstname: values.firstName,
                lastname: values.lastName,
                phone: values.phone,
                email: values.email,
                createdAt: serverTimestamp(),
            });
            navigate('/account/login')
        } catch (error: any) {
            console.log(error)
            if (error.code === 'auth/email-already-in-use') {
                setErorr('Email đã tồn tại')

            }
        }


    }



    return (
        <DefaultLayout>
            <div className={cx("wrapper-product")}>
                <div className={cx("banner")}>
                    <div className={cx("path", "container")}>
                        <span>Trang chủ </span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("all-product")}>Đăng ký tài khoản</span>
                    </div>
                </div>
                <div className='container'>
                    <div className=' row '>
                        <div className='col-12 col-md-6 offset-md-3 col-lg-4 offset-lg-4'>
                            <div>
                                <Formik
                                    initialValues={{ firstName: '', lastName: '', phone: '', email: '', password: '', confirmPassword: '' }}
                                    onSubmit={handleSubmitForm}
                                    validationSchema={schema}
                                >
                                    {(formik: any) => (
                                        <>
                                            {console.log(formik)}
                                            <form onSubmit={formik.handleSubmit}>
                                                <Title>Đăng ký</Title>
                                                <div>
                                                    <LabelInput htmlFor='firstName'>Họ <span>*</span></LabelInput>

                                                    <InputValue
                                                        type='text'
                                                        placeholder='Họ'
                                                        name='firstName'
                                                        touched={formik.touched.firstName}
                                                        error={formik.errors.firstName}
                                                        value={formik.values.firstName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    ></InputValue>
                                                </div>

                                                <div>
                                                    <LabelInput htmlFor='lastname'>Tên <span>*</span></LabelInput>
                                                    <InputValue
                                                        name='lastName'
                                                        touched={formik.touched.lastName}
                                                        value={formik.values.lastName}
                                                        error={formik.errors.lastName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        type='text'
                                                        placeholder='Tên' ></InputValue>
                                                </div>
                                                <div>
                                                    <LabelInput htmlFor='phone'>Số điện thoại <span>*</span></LabelInput>
                                                    {/* <PhoneInput
                                                        autoComplete='off'
                                                        placeholder="Số điện thoại"
                                                        defaultCountry="VN"
                                                        limitMaxLength
                                                        value={formik.values.phone}
                                                        className={cx('input-phone')}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}

                                                    /> */}
                                                    <InputValue
                                                        name='phone'
                                                        value={formik.values.phone}
                                                        touched={formik.touched.phone}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.phone}
                                                        onBlur={formik.handleBlur}
                                                        type='text'
                                                        placeholder='Số điện thoại'></InputValue>



                                                </div>
                                                <div>
                                                    <LabelInput htmlFor='email'>Email <span>*</span></LabelInput>
                                                    <InputValue
                                                        name='email'
                                                        value={formik.values.email}
                                                        touched={formik.touched.email}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.email || error}
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
                                                        error={formik.errors.password}
                                                        onBlur={formik.handleBlur}
                                                        placeholder='Mật khẩu'></InputTogglePassword>
                                                </div>

                                                <div>
                                                    <LabelInput htmlFor='password'>Nhập lại mật khẩu <span>*</span></LabelInput>
                                                    <InputTogglePassword
                                                        name='confirmPassword'
                                                        touched={formik.touched.confirmPassword}
                                                        value={formik.values.confirmPassword}
                                                        onChange={formik.handleChange}
                                                        error={formik.errors.confirmPassword}
                                                        onBlur={formik.handleBlur}
                                                        placeholder='Nhập lại mật khẩu'></InputTogglePassword>
                                                </div>
                                                <div className='w-100'>
                                                    <Button className={cx('custom-btn-register')} type='submit'>Đăng kí</Button>
                                                </div>
                                                <div>
                                                    <p className={cx('or')}>Bạn đã có tài khoản? Đăng nhập <Link className={cx('link-login')} to='/account/login'>tại đây</Link></p>
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

        </DefaultLayout >
    );
};

export default SignUp;