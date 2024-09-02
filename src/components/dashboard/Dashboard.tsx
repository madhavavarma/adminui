import { IDashboardCard } from "../../models/IDashboardCard"
import { Card } from "./Card"

export const Dashboard = () => {

    const sampleCardData: IDashboardCard[]= [
        {cardData: "13,647", cardName: "Total Orders", footerText: "Last Week", iconName: "Dashboard", navigateTo: ""},
        {cardData: "13,647", cardName: "Total Orders", footerText: "Last Week", iconName: "Dashboard", navigateTo: ""},
        {cardData: "13,647", cardName: "Total Orders", footerText: "Last Week", iconName: "Dashboard", navigateTo: ""},
        {cardData: "13,647", cardName: "Total Orders", footerText: "Last Week", iconName: "Dashboard", navigateTo: ""}
    ]

    return <article>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
            {sampleCardData.map((cardData: IDashboardCard) => {
                return <Card cardData={cardData} />
            })}
        </section>
        
    </article>
}