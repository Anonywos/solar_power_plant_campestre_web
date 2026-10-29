import { tv } from "tailwind-variants";

export const TextVariants = tv({
    base: 'font-sans',
    variants: {
        variant: {
            'body-6xl-bold': 'text-6xl font-bold leading-19.5',
            'body-4xl-semibold': 'text-4xl font-semibold leading-11',
            'body-32-bold': 'text-[32px] font-bold leading-9.75',
            'body-2xl-medium': 'text-2xl font-medium leading-7.25',
            'body-xl-semibold': 'text-xl font-semibold leading-6',
            'body-base-semibold': 'text-base font-semibold leading-5',
            'body-base-medium': 'text-base font-medium',
            'body-sm-semibold': 'text-sm font-semibold leading-5',
            'body-xs-bold': 'text-xs font-bold leading-3.75',
        },
        color: {
            'white': 'text-white',
            'gray': 'text-gray',
            'green': 'text-green',
            'blue': 'text-blue-light',
        }
    },
    defaultVariants: {
        variant: 'body-xl-semibold',
        color: 'white'
    }
})