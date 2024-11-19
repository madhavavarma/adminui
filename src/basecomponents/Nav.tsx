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
    const clsContainer = "w-72 bg-[#262d34] h-full shadow-lg rounded-r-xl"; // Old background color
    const clsLogoContainer = "px-10 pt-6 pb-4 flex justify-center";
    const clsNavListContainer = "h-[calc(100%-90px)] overflow-y-auto pt-4";
    const clsMenuHeader = "uppercase text-sm text-gray-400 tracking-wider opacity-80 font-semibold px-6 py-2";
    const clsParentNav = "font-Play text-base text-gray-200 hover:text-[#FF8C00] flex gap-4 items-center px-8 py-2 rounded-md transition-all duration-300"; // Adjusted text color
    const clsParentNavIcon = "flex items-center gap-2 px-6 py-1 transition-all duration-300";
    const clsChildNav = "font-Play text-base text-gray-200 hover:text-[#FF8C00] flex gap-2 items-center px-12 py-1 rounded-md transition-all duration-300"; // Adjusted text color for children

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialNavList: INav[] = NavList;
    const [navList, setNavList] = useState(initialNavList);
    const state = useSelector((state: IState) => state.Flags);

    const navigateTo = (nav: INav) => {
        navigate(nav.navigateTo || "");
    };

    const setL2Active = (nav: INav) => {
        const navList = setLvl2Active(initialNavList, nav);
        setNavList(navList);
        navigateTo(nav);
    };

    const setL3Active = (nav: INav) => {
        const navList = setLvl3Active(initialNavList, nav);
        setNavList(navList);
        navigateTo(nav);
    };

    const closeNav = () => () => {
        dispatch(FlagsActions.setNav(false));
    };

    return (
        <Drawer open={state.showNav} onClose={closeNav()} className="w-full" PaperProps={{
            sx: {
                backgroundColor: "#262d34",  // Keep the old background color
                width: "280px",
                borderRadius: "0 10px 10px 0",
                transition: "transform 0.3s ease-in-out",
                boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)"
            }
        }}>
            <section className={clsContainer}>
                {/* Logo */}
                <section className={clsLogoContainer}>
                    <a href="#" className="block">
                        <img src={logo} className="w-12 h-12" alt="logo" />
                    </a>
                </section>

                {/* Nav List */}
                <section className={clsNavListContainer}>
                    {navList.map((nav: INav) => (
                        <ul key={nav.id} className="flex flex-col mb-6 font-Play">
                            {/* Menu Header */}
                            <li className={clsMenuHeader}>
                                {nav.name}
                            </li>

                            {nav.children?.map((navC1: INav) =>
                                <li key={navC1.id}>
                                    <a onClick={() => { setL2Active(navC1) }} className={`flex justify-between items-center cursor-pointer border-l-4 border-solid border-transparent ${navC1.isActive ? "border-[#FF8C00]" : ""}`}>
                                        {/* Parent Nav */}
                                        <span className={clsParentNav + (navC1.isActive ? " text-[#FF8C00]" : "")}>
                                            <span className="flex items-center">
                                                {GetIcon(navC1.iconName || "Dashboard", navC1.isActive ? "#FF8C00" : "#D1D5DB")}
                                            </span>
                                            <span>
                                                {navC1.name}
                                            </span>
                                        </span>
                                        <span className={clsParentNavIcon}>
                                            {navC1.children && <span>
                                                {navC1.showChildren ? <ExpandLessIcon className="text-gray-400" /> : <ExpandMoreIcon className="text-gray-400" />}
                                            </span>}
                                        </span>
                                    </a>

                                    {/* Level 3 Children */}
                                    {navC1.showChildren === true && navC1.children?.map((navC2: INav) =>
                                        <ul key={navC2.id} className="ml-4">
                                            <li>
                                                <a onClick={() => setL3Active(navC2)} className="flex justify-between items-center cursor-pointer">
                                                    <span className={clsChildNav + (navC2.isActive ? " text-[#FF8C00]" : "")}>
                                                        {navC2.name}
                                                    </span>
                                                </a>
                                            </li>
                                        </ul>
                                    )}
                                </li>
                            )}
                        </ul>
                    ))}
                </section>
            </section>
        </Drawer>
    );
};
