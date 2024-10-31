import { Drawer } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../store/interfaces/IState";
import { FlagsActions } from "../store/Flags";
import logo from "../assets/react.svg";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { INav } from "../models/INav";
import { useState } from "react";
import { GetIcon } from "../helpers/GetIcons";
import { NavList, setLvl2Active, setLvl3Active } from "../helpers/NavList";
import { useNavigate } from "react-router-dom";

export const Nav = () => {

    const clsContainer = "w-72 bg-main-nav-bg h-full";
    const clsLogoContainer = "px-10 leading-[8]";
    const clsNavListContainer = "h-199 overflow-hidden";
    const clsMenuHeader = "uppercase text-main-nav-item-color text-[10px] tracking-wider opacity-60 font-bold h-7 px-6";
    const clsParentNav = "font-Play text-[14px] text-main-nav-item-color hover:text-main-nav-item-hover-color flex gap-4 items-center px-8 py-2";
    const clsParentNavIcon = "font-Play text-[14px] text-main-nav-item-color hover:text-main-nav-item-hover-color flex gap-2 items-center px-6 py-1";
    const clsChildNav = "font-Play text-[14px] text-main-nav-item-color hover:text-main-nav-item-hover-color flex gap-2 items-center px-20 py-1";

    const dispatch = useDispatch();    
    const navigate = useNavigate();
    const initialNavList: INav[] = NavList;   
    const [navList, setNavList] = useState(initialNavList);
    const state = useSelector((state: IState) => state.Flags);

    const navigateTo = (nav: INav) => {
        navigate(nav.navigateTo || "");
    }

    const setL2Active = (nav: INav) => {
        const navList = setLvl2Active(initialNavList, nav);

        setNavList(navList);

        navigateTo(nav);
    }

    const setL3Active = (nav: INav) => {
        const navList = setLvl3Active(initialNavList, nav);

        setNavList(navList);

        navigateTo(nav);
    }

    const closeNav = () => () => {
      dispatch(FlagsActions.setNav(false))
    };   

    return (
        <Drawer open={state.showNav} onClose={closeNav()} className="w-full" PaperProps={{
            sx: {backgroundColor: "#262d34"} }} >

            {/* Container */}
            <section className={clsContainer}>

                {/* Logo */}
                <section className={clsLogoContainer}>
                    <a href="#" className="block">
                        <img src={logo} className="inline align-middle"/> 
                    </a>
                </section>

                {/* Nav List */}
                <section className={clsNavListContainer}>
                    {navList.map( (nav: INav) => <ul key={nav.id} className="flex flex-col mb-6 font-Play">

                        {/* Menu Header */}
                        <li className={clsMenuHeader}>
                           {nav.name}
                        </li>

                        {nav.children?.map( (navC1: INav) =>  
                        <li  key={navC1.id}>
                            <a onClick={() => {setL2Active(navC1)} } type="button" className= {"flex justify-between align-center cursor-pointer border-l-4 border-solid border-transparent " + (navC1.isActive ? "border-primary-color" : "")}>
                                {/* Parent Nav */}
                                <span className={clsParentNav + (navC1.isActive ? " text-main-nav-item-hover-color" : "")}>
                                    <span className="flex items-center">
                                        {GetIcon(navC1.iconName || "Dashboard", navC1.isActive ? "--primary-color" : "")}
                                    </span>
                                    <span>
                                        {navC1.name}
                                    </span>
                                </span>
                                <span className={clsParentNavIcon}>
                                    {navC1.children && <span>
                                        {navC1.showChildren ? <ExpandLessIcon /> : <ExpandMoreIcon />} 
                                    </span> }
                                </span>
                            </a>
                            <ul>
                                {/* Child Nav */}
                                {navC1.showChildren === true && navC1.children?.map( (navC2: INav) =>  
                                <li>
                                    <a onClick={() => setL3Active(navC2)} type="button" className="flex justify-between align-center cursor-pointer">
                                        <span className={clsChildNav + (navC2.isActive ? " text-main-nav-item-hover-color" : "")}>
                                            <span>
                                                {navC2.name}
                                            </span>
                                        </span>
                                    </a> 
                                </li> )}
                            </ul>
                        </li> )}
                    </ul>
                    )}
                </section>
            </section>
        </Drawer>
    )
}