import React from 'react';
import styles from "./InputValue.module.scss";
import classNames from "classnames/bind";
import { useController } from 'react-hook-form';

const cx = classNames.bind(styles);

interface GlobalStyleProps {
    placeholder?: string
    className?: string,
    type: string,
    control?: any,
    name: string,
    onChange?: any,
    onBlur?: any,
    error?: string,
    value?: string,
    touched?: any,

}

const InputValue: React.FC<GlobalStyleProps> = ({ placeholder, touched, error, value, onChange, onBlur, control, className, type = 'text', name, ...props }) => {
    // const { field, fieldState } = useController({
    //     control, name
    // })
    return (
        <div style={{ marginBottom: '8px' }}>

            <input
                name={name}
                type={type}
                className={cx('input-value', touched && error && 'border-error', className)}
                placeholder={placeholder}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                {...props}
            />
            {touched && error && <span className={cx('error')}>{error}</span>}

        </div >

    );
};

export default InputValue;