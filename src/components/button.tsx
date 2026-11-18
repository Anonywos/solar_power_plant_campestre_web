import React from "react"
import { tv, type VariantProps } from "tailwind-variants";
import Text from "./text";
import Icon from "./icon";

const ButtonVariants = tv({
    base: `
        flex items-center justify-center rounded-xl gap-2
    `,
    variants: {
        variant: {
            primary: 'bg-linear-to-r from-blue-light from-30% to-blue-dark shadow-[2px_2px_4px_0px_rgba(1,49,96,0.25)] hover:cursor-pointer',
            secondary: 'bg-green',
            tertiary: 'bg-red',
            quaternary: 'bg-linear-to-t from-green from-50% to-blue-dark',
            quinary: 'bg-yellow',
            transparent: 'border rounded-2xl border-white',
            disabled: 'bg-gray',
        },
        size: {
            'md': 'w-44 h-9',
            'sm': 'h-7 px-2',
            'lg': 'w-50 h-10'
        }
    },
    defaultVariants: {
        variant: 'primary',
        size: 'md',
    },
})

interface ButtonProps extends React.ComponentProps<'button'>
    , VariantProps<typeof ButtonVariants> {
    icon?: React.FC<React.ComponentProps<'svg'>>;
    textVariants?: 'white' | 'dark';
    className?: string;
    children?: React.ReactNode
}

export default function Button({
    variant,
    size,
    textVariants = 'white',
    icon,
    className,
    children,
    ...props
}:ButtonProps) {
    return <button
        className={ButtonVariants({className, variant, size})}
        {...props}
    >
        <Text variant="body-sm-semibold" color={textVariants === 'white' ? 'white' : 'dark-gray'}>{children}</Text>
        {icon && (<Icon svg={icon} className="size-4 fill-white" />)}
    </button>
}