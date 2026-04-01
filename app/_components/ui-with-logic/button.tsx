'use client'

export type ButtonProps = {
    style : string,
    title : string,
    action : () => void
}

export function Button({style, title, action} : ButtonProps) {
    return (
        <button onClick={action} className={style}>{title}</button>
    )
}