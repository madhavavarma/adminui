import { useSelector } from "react-redux";
import userImage from "../assets/user.jpg";
import { FluidContainer } from "./FluidContainer";
import { IState } from "../store/interfaces/IState";
import EditNotificationsTwoToneIcon from '@mui/icons-material/EditNotificationsTwoTone';
import NightsStayTwoToneIcon from '@mui/icons-material/NightsStayTwoTone';

export const Header = () => {

    const clsHeaderArticle = "sticky top-0 w-full z-50";
    const clsHeaderSection = "flex justify-between items-center h-32";
    const clsPageMessage = "text-txt-color-1 text-lg";
    const clsIconsSection = "flex items-center gap-6";
    const clsUserImage = "!w-10 rounded-full";

    const showHeader = useSelector((state: IState) => state.Flags.showHeader );

    return <>
    {showHeader &&
        <article className={clsHeaderArticle}>
            <FluidContainer>
                <section className={clsHeaderSection}>
                    <section>
                        <h3 className={clsPageMessage}>WELCOME!</h3>
                    </section>
                    <section className={clsIconsSection}>
                        <NightsStayTwoToneIcon />
                        <EditNotificationsTwoToneIcon />

                        <img alt="Remy Sharp" src={userImage} className={clsUserImage}/>
                    </section>
                </section>   
            </FluidContainer>          
        </article>
    }
    </>
}