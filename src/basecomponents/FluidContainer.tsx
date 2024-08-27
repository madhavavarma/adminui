import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

export const FluidContainer = (props : IProps) => {
    return <>
        <section className="container mx-auto px-4">
            {props.children}
        </section>
    </>
}