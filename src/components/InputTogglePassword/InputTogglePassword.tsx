import React, { useState } from 'react';
import styles from "./InputTogglePassword.module.scss";
import classNames from "classnames/bind";
import { useController } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

interface GlobalStyleProps {
    placeholder?: string
    className?: string,
    control?: any,
    name: string,
    onChange?: any,
    onBlur?: any,
    error?: string,
    touched?: any,
    value?: string

}

const InputTogglePassword: React.FC<GlobalStyleProps> = ({ placeholder, error, touched, value, onChange, onBlur, control, className, name, ...props }) => {

    const [showPass, setShowPass] = useState(false)

    const handleShowPass = () => {
        setShowPass(!showPass)
    }
    return (
        <div className='position-relative' style={{ marginBottom: '8px' }}>
            <input
                name={name}
                type={showPass ? 'text' : 'password'}
                className={cx('input-value', touched && error && 'border-error', className)}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                onInput={(e: any) => {
                    if (e.currentTarget instanceof HTMLInputElement && e.currentTarget.isContentEditable) {
                        e.currentTarget.innerText = value;
                    }
                }}
                {...props}
            />
            <div onClick={handleShowPass}>
                {showPass ? <FontAwesomeIcon className={cx('icon-eye')} icon={faEye}></FontAwesomeIcon>
                    :
                    <FontAwesomeIcon className={cx('icon-eye')} icon={faEyeSlash}></FontAwesomeIcon>
                }
            </div>
            {touched && error && <span className={cx('error')}>{error}</span>}


        </div>

    );
};

export default InputTogglePassword;