
interface IProps {
    message: string
}

export const MainAlert = (props: IProps) => {

    const clsMessage = "font-Play rounded-lg bg-bg-alert dark:bg-bg-alert-dark p-3 mb-8 text-txt-alert dark:text-txt-alert-dark text-sm font-normal w-full";

    return <>
        <article>
                <p className={clsMessage}>{props.message}</p>
        </article> 
    </>
}