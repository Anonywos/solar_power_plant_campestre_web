import type React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const IconVariant = tv({
    variants: {
        animate: {
            false: '',
            true: 'animate-spin'
        }
    },
    defaultVariants: {
        animate: false
    }
})

interface IconProps extends React.ComponentProps<'svg'>,
    VariantProps<typeof IconVariant> {
    svg: React.FC<React.ComponentProps<'svg'>>;
}

export default function Icon({
    svg: SVGComponent,
    animate,
    className,
    ...props
}:IconProps) {
    return (
        <SVGComponent className={IconVariant({animate, className})} {...props} />
    )
}