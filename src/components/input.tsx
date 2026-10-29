import { tv, type VariantProps } from "tailwind-variants";

const InputVariants = tv({
    base: 'text-gray w-full caret-gray focus:outline-none text-sm font-semibold'
})

interface InputProps extends VariantProps<typeof InputVariants>,
    React.ComponentProps<'input'> {
    type: string;
    className?: string;
}

export default function Input({
    type,
    className,
    ...props
}:InputProps) {
    return(
        <div className="flex items-center justify-between w-44 h-9 bg-white shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] rounded-xl p-2.5">
            <input 
                type={type}
                className={InputVariants({className})} 
                {...props} 
            />
        </div>
    )
}