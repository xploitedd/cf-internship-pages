import { MouseEventHandler } from "react"

export type ButtonType = 'success' | 'info' | 'danger'

interface ButtonProps {
    children: string
    disabled?: boolean
    status?: ButtonType
    className?: string
    buttonType?: 'button' | 'submit' | 'reset'
    size?: 'big' | 'small'
    onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: React.FC<ButtonProps> = props => {
    const statusCSS = buttonPropsToCSS(props)
    return (
        <button onClick={props.onClick} disabled={props.disabled} type={props.buttonType} className={statusCSS + " transition duration-100 rounded-md shadow-md " + props.className}>
            {props.children}
        </button>
    )
}

const buttonPropsToCSS = (props: ButtonProps): string => {
    const size = props.size ?? 'big'
    const sizeCSS = size === 'small' ? 'py-2 px-5' : 'py-2 px-10'

    switch (props.status ?? 'info') {
        case 'success':
            return `${sizeCSS} bg-green-700 hover:bg-green-800`
        case 'danger':
            return `${sizeCSS} bg-red-700 hover:bg-red-800`
        default:
            return `${sizeCSS} bg-gray-700 hover:bg-gray-800`
    }
}

export default Button