import { ReactNode } from "react"
import { ICard } from "../models/ICard"

interface IProps {
    card: ICard,
    children: ReactNode
}

export const Card = (props: IProps) => {

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold";
    const clsChild = "px-4 py-6 font-Play font-medium";

    return <>
        <article className={clsContainer}>
            {props.card.cardHeader && <section className={clsHeader}>{props.card.cardHeader}</section> }
            <section className={clsChild}>{props.children}</section>
        </article>
    </>
}