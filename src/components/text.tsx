import React from "react"
import { type VariantProps } from "tailwind-variants";
import { TextVariants } from "./variants/text-variants";


interface TextProps extends VariantProps<typeof TextVariants> {
    as?: keyof React.JSX.IntrinsicElements;
    className?: string;
    children?: React.ReactNode
}

export default function Text({
    as='span',
    variant,
    color,
    className,
    children,
    ...props
}:TextProps) {
    return React.createElement(as, {className: TextVariants({variant, color, className}), ...props}, children);
}