import { tv } from "tailwind-variants";
import Text from "./text";
import { useState } from "react";
import Icon from "./icon";
import arrowIcon from "../assets/caret-down.svg?react";

const SelectIconVariants = tv({
    base: 'fill-gray max-h-3.75 transition-transform duration-200',
    variants: {
        open: {
            false: 'rotate-0 fill-gray-200',
            true: 'rotate-180 fill-green-100'
        }
    },
    defaultVariants: {
        open: false
    }
})

interface SelectProps {
    options: string[];
    currentOption: string;
    setCurrentOption: (value:string) => void
}

export default function Select({
    options,
    currentOption,
    setCurrentOption
}:SelectProps) {
    const [ isOpen, setIsOpen] = useState(false)

    function handleSelectBox() {
        setIsOpen(!isOpen)
    }

    function handleCurrentOption(newOption: string) {
        setCurrentOption(newOption)
        handleSelectBox()
    }
    
    return(
        <div className="relative">
            <button 
                className="hover:cursor-pointer" 
                onClick={handleSelectBox}
            >
                <div className="relative z-50 flex items-center justify-between w-44 h-9 bg-white shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)] rounded-xl p-2.5">
                    <Text variant="body-sm-semibold" color="gray">{currentOption}</Text>
                    <Icon svg={arrowIcon} className={SelectIconVariants({open: isOpen})} />
                </div>
            </button>
            {options.length > 0 && (
                <div 
                    className={`
                    bg-white absolute w-44 top-10 shadow-[2px_2px_4px_0px_rgba(0,0,0,0.25)]
                    rounded-xl z-40 p-2.5 space-y-3
                    origin-top
                    transition-all duration-200 ease-out
                    ${
                        isOpen
                        ? "opacity-100 translate-y-0 scale-100 visible"
                        : "opacity-0 -translate-y-2 scale-95 invisible pointer-events-none"
                    }
                    `}
                >
                   {
                        options.map((option, index) => (
                            <ul>
                                <li 
                                    key={`index: ${index}`}
                                >
                                    <button 
                                        className="w-full h-full hover:cursor-pointer"
                                        onClick={() =>handleCurrentOption(option)}
                                    >
                                        <Text variant="body-sm-semibold" color="gray">{option}</Text>
                                    </button>
                                </li>
                            </ul>
                        ))
                    }
                </div>
            )}
        </div>
    )
}