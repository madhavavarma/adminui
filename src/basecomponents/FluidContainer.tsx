import { ReactNode } from "react"

interface IProps {
    children: ReactNode
}

export const FluidContainer = (props : IProps) => {
    return <>
        <section className="container mx-auto px-6 md:px-16 lg:px-16">
            {props.children}
        </section>
    </>
}