import { ReactNode } from "react"
import { ICard } from "../models/ICard"

interface IProps {
    card: ICard,
    children: ReactNode
}

export const Card = (props: IProps) => {
    return <>
        <article className="bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4">
            {props.card.cardHeader && <section className="px-4 py-4 text-text-header-color size-sm font-semibold">{props.card.cardHeader}</section> }
            <section className="px-4 py-6 font-Play font-medium">{props.children}</section>
        </article>
    </>
}