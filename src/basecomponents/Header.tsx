import { useDispatch, useSelector } from "react-redux";
import userImage from "../assets/user.jpg";
import { FluidContainer } from "./FluidContainer";
import { IState } from "../store/interfaces/IState";
import EditNotificationsTwoToneIcon from '@mui/icons-material/EditNotificationsTwoTone';
import NightsStayTwoToneIcon from '@mui/icons-material/NightsStayTwoTone';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { FlagsActions } from "../store/Flags";

export const Header = () => {

    const clsHeaderArticle = "sticky top-0 w-full z-50 bg-bg-light";
    const clsHeaderSection = "flex justify-between items-center h-24 text-text-color-gray";
    const clsPageMessage = "text-text-color-gray text-lg";
    const clsIconsSection = "flex items-center gap-6";
    const clsUserImage = "!w-10 rounded-full";

    const dispatch = useDispatch();
    const flagsState = useSelector((state: IState) => state.Flags );
    const notificationsState = useSelector((state: IState) => state.Notifications );

    const openNav = () => {
        dispatch(FlagsActions.setNav(true));
    }

    const darkMode = () => {
        dispatch(FlagsActions.setDarkMode(!flagsState.darkMode));
    }
    

    return <>
    {flagsState.showHeader &&
        <article className={clsHeaderArticle}>
            <FluidContainer>
                <section className={clsHeaderSection}>
                    <section className="flex gap-4 items-center">
                        <a type="button" onClick={() => openNav()} color="inherit">
                            <DehazeIcon color="inherit"/>
                        </a>
                        <h3 className={clsPageMessage}>{notificationsState.headerMessage || "WELCOME!"}</h3>
                    </section>
                    <section className={clsIconsSection}>
                        <a type="button" onClick={() => darkMode()} color="inherit">
                            <NightsStayTwoToneIcon />
                        </a>
                        <EditNotificationsTwoToneIcon />

                        <img alt="Login User Image" src={userImage} className={clsUserImage}/>
                    </section>
                </section>   
            </FluidContainer>          
        </article>
    }
    </>
}