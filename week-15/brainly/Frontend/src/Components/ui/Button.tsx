import { ReactElement } from "react";

interface ButtonProps {
    variant: 'primary' | 'secondary';
    size: 'small' | 'medium' | 'large';
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    text: String;
    iconColor?: 'text-white' | 'text-purple-700' | 'text-purple-500';
    onClick?: () => void;
    disabled?: boolean;
    className?:String;
    type?: 'submit'
}

const buttonVariants = {
    primary: 'bg-purple-700  cursor-pointer hover:opacity-90 text-white',
    secondary: 'bg-purple-500 cursor-pointer text-purple-700',
}

const buttonSizes = {
    small: 'text-sm py-1 px-2 rounded-sm',
    medium: 'text-md py-2 px-4 rounded-md',
    large: 'text-lg py-3 px-6 rounded-lg',
}

export function Button({ onClick,variant, size, disabled ,startIcon, endIcon, text,iconColor, className }: ButtonProps) {
    return (
        <button disabled={disabled} onSubmit={onClick} onClick={onClick} className={`${buttonVariants[variant]}  ${buttonSizes[size]} ${className} flex items-center  justify-center`}>
            {startIcon && <span className={` pr-2 ${iconColor}`}>{startIcon}</span>}
            {text}
            {endIcon && <span className={` pr-2 ${iconColor}`}>{endIcon}</span>}
        </button>
    )
}