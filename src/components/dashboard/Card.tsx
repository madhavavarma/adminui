import { GetIcon } from "../../helpers/GetIcons";
import { IDashboardCard } from "../../models/IDashboardCard";

interface IProps {
    cardData: IDashboardCard
}

export const Card  = (props: IProps) => {

    // 0px 3px 4px 0px rgba(0, 0, 0, 0.03)

    return <>
        <article className="flex flex-col bg-dbcard-bgcolor shadow-dbcard-shadow rounded mb-4  ">
            <section className="p-8 flex flex-row justify-between items-center">
                <div className="bg-dbcard-bgicon h-14 w-14 flex justify-center items-center rounded">
                    {GetIcon(props.cardData.iconName, "--dbcard-colicon")}
                </div>
                <section className="flex flex-col">
                    <p className="font-Play text-dbcard-colname text-sm">{props.cardData.cardName}</p>
                    <label className="text-2xl text-dbcard-coldata mt-1">{props.cardData.cardData}</label>
                </section>
            </section>
            <section className="px-8 py-4 flex flex-row justify-between items-center bg-dbcard-bgfooter" style={{boxShadow: "var(--dbcard-shadow)"}}>
                <label className="font-Play text-dbcard-colname text-xs">{props.cardData.footerText}</label>
                <a type="button" href={props.cardData.navigateTo} className="font-Play text-dbcard-colname text-xs ">View More</a>
            </section>
        </article>
    </>

}