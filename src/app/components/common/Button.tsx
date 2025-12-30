type ButtonProps = {
    children: React.ReactNode
    onClick?: ()=>void
    type?: 'button' | 'submit'
    disabled?: boolean
    loading?:boolean
}

export default function Button({
    children,
    onClick,
    type ='button',
    disabled = false,
    loading =false,
}:ButtonProps){
    return (
        <button 
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            aria-disabled={disabled || loading}
        >
            {loading ? 'loading...':children}
        </button>
    )
}