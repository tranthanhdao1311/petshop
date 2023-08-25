import React from 'react';
import DefaultLayout from '../../components/Layout/DefaultLayout/DefaultLayout';
import styles from "./SignIn.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const SignIn = () => {
    return (
        <DefaultLayout>
            <div className={cx("wrapper-product")}>
                <div className={cx("banner")}>
                    <div className={cx("path", "container")}>
                        <span>Trang chủ </span>
                        <span className={cx("divier")}>/</span>
                        <span className={cx("all-product")}>Đăng nhập tài khoản</span>
                    </div>
                </div>
            </div>

        </DefaultLayout>
    );
};

export default SignIn;