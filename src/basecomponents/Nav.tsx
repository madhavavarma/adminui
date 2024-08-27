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

export const Nav = () => {

    const navListData: INav[] = [
        {name:  "General", children: [
            {name: "Dashboard", navigateTo: "/dashboard"},
            {name: "Products", iconName: "ShoppingBag", children: [
                {name: "List", navigateTo: "/products/list"},
                {name: "Create", navigateTo: "/products/create"},
                {name: "Edit", navigateTo: "/products/edit"},
            ]},
            {name: "Category", iconName: "Category", children: [
                {name: "List", navigateTo: "/category/list"},
                {name: "Create", navigateTo: "/category/create"},
                {name: "Edit", navigateTo: "/category/edit"},
            ]},
            {name: "Orders", iconName: "ShoppingCart", children: [
                {name: "List", navigateTo: "/category/list"},
                {name: "Details", navigateTo: "/category/details"},
                {name: "Edit", navigateTo: "/category/edit"},
            ]},
            {name: "Attributes", iconName: "ShoppingCart", children: [
                {name: "List", navigateTo: "/category/list"},
                {name: "Details", navigateTo: "/category/details"},
                {name: "Edit", navigateTo: "/category/edit"},
            ]},
            {name: "Tags", iconName: "ShoppingCart", children: [
                {name: "List", navigateTo: "/category/list"},
                {name: "Details", navigateTo: "/category/details"},
                {name: "Edit", navigateTo: "/category/edit"},
            ]}

        ]},

        {name:  "Users", children: [
            {name: "Profile", navigateTo: "/dashboard"},
            {name: "Roles", iconName: "ShoppingBag", children: [
                {name: "List", navigateTo: "/products/list"},
                {name: "Create", navigateTo: "/products/create"},
                {name: "Edit", navigateTo: "/products/edit"},
            ]},
            {name: "Permissions", iconName: "Category", children: [
                {name: "List", navigateTo: "/category/list"},
                {name: "Create", navigateTo: "/category/create"},
                {name: "Edit", navigateTo: "/category/edit"},
            ]},
            {name: "Customers", iconName: "ShoppingCart", children: [
                {name: "List", navigateTo: "/category/list"},
                {name: "Details", navigateTo: "/category/details"},
                {name: "Edit", navigateTo: "/category/edit"},
            ]},
            {name: "Sellers", iconName: "ShoppingCart", children: [
                {name: "List", navigateTo: "/category/list"},
                {name: "Details", navigateTo: "/category/details"},
                {name: "Edit", navigateTo: "/category/edit"},
            ]}

        ]},

        {name:  "Others", children: [
            {name: "Coupons", navigateTo: "/dashboard"},
            {name: "Reviews", iconName: "ShoppingBag", children: [
                {name: "List", navigateTo: "/products/list"},
                {name: "Create", navigateTo: "/products/create"},
                {name: "Edit", navigateTo: "/products/edit"},
            ]}
        ]},
    ]
    
    const dispatch = useDispatch();
    const state = useSelector((state: IState) => state.Flags)
    const [navList, setNavList] = useState(navListData);

    const closeNav = () => () => {
      dispatch(FlagsActions.setNav(false))
    };

    const showChildren = (nav: INav) => {
        var newNavList: INav[] = JSON.parse(JSON.stringify(navList));

        newNavList.forEach(x => {
            if(x.name === nav.name) {
                x.showChildren = !x.showChildren;
            } else {
                x.showChildren = false;
                if(x.children) {
                    x.children.forEach(y => {
                        if(y.name === nav.name) {
                            y.showChildren = !y.showChildren;
                        } else {
                            y.showChildren = false;
                        }
                    })
                }
            }
        });

        setNavList(newNavList);
    }

    return (
        <Drawer open={state.showNav} onClose={closeNav()} className="w-full" PaperProps={{
            sx: {
              backgroundColor: "#262d34",
            }
          }} >
            <section className="w-72 bg-main-nav-bg h-full">
                <section className="px-10 leading-[8]">
                    <a href="#" className="block">
                        <img src={logo} className="inline align-middle"/> 
                    </a>
                </section>
                <section className="h-199 overflow-hidden">
                    {navList.map( (nav: INav) => <ul className="flex flex-col mb-6 font-Play">
                        <li className="uppercase text-main-nav-item-color text-[12px] tracking-wider opacity-60 font-bold h-7 px-6">
                           {nav.name}
                        </li>
                        {nav.children?.map( (navC1: INav) =>  <li  onClick={() => {showChildren(navC1)} }>
                            <a href="#" className=" flex justify-between align-center">
                                <span className="font-Play text-[18px] text-main-nav-item-color hover:text-main-nav-item-hover-color flex gap-4 items-center px-8 py-2">
                                    <span className="flex items-center">
                                        {GetIcon(navC1.iconName || "Dashboard")}
                                    </span>
                                    <span>
                                        {navC1.name}
                                    </span>
                                </span>
                                <span className="font-Play text-[18px] text-main-nav-item-color hover:text-main-nav-item-hover-color flex gap-2 items-center px-6 py-1">
                                    {navC1.children && <span>
                                        {navC1.showChildren ? <ExpandLessIcon /> : <ExpandMoreIcon />} 
                                    </span> }
                                </span>
                            </a>
                            <ul>
                                {navC1.showChildren === true && navC1.children?.map( (navC2: INav) =>  <li>
                                    <a href="#" className=" flex justify-between align-center">
                                        <span className="font-Play text-[18px] text-main-nav-item-color hover:text-main-nav-item-hover-color flex gap-2 items-center px-20 py-1">
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