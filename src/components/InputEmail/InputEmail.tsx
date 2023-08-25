import React from 'react';
import styles from "./InputEmail.module.scss";
import classNames from "classnames/bind";
import { useController } from 'react-hook-form';

const cx = classNames.bind(styles);

interface GlobalStyleProps {
    placeholder?: string
    className?: string,
    type: string,
    control: any,
    name: string,
    onChange?: any

}

const InputEmail: React.FC<GlobalStyleProps> = ({ placeholder, onChange, control, className, type = 'text', name, ...props }) => {
    const { field, fieldState } = useController({
        control, name, rules: {
            pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Biểu thức chính quy cho email
                message: 'Vui lòng nhập email',
            },
        },
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        field.onChange(newValue);

        // If you have provided an onChange prop, call it here
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div>

            <input
                type={type}
                className={cx('input-value', fieldState.invalid && 'border-error', className)}
                placeholder={placeholder}
                {...field}
                onChange={handleInputChange}
                {...props}
                value={field.value}
            />
            {fieldState.invalid && (
                <p className={cx('error')}>{fieldState.error?.message}</p>
            )}
        </div>

    );
};

export default InputEmail;