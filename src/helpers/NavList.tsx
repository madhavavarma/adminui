import { INav } from "../models/INav";

export const NavList : INav[] = [
    {id: 1, name:  "General", isActive: false, children: [
        {id: 2, name: "Dashboard", navigateTo: "/dashboard", isActive: false},
        {id: 3, name: "Products", iconName: "ShoppingBag", isActive: false, children: [
            {id: 4, name: "List", navigateTo: "/products/list", isActive: false},
            {id: 5, name: "Create", navigateTo: "/products/create", isActive: false},
            {id: 6, name: "Edit", navigateTo: "/products/edit", isActive: false},
        ]},
        {id: 7, name: "Category", iconName: "Category", isActive: false, children: [
            {id: 8, name: "List", navigateTo: "/category/list", isActive: false},
            {id: 9, name: "Create", navigateTo: "/category/create", isActive: false},
            {id: 10, name: "Edit", navigateTo: "/category/edit", isActive: false},
        ]},
        {id: 11, name: "Orders", iconName: "ShoppingCart", isActive: false, children: [
            {id: 12, name: "List", navigateTo: "/category/list", isActive: false},
            {id: 13, name: "Details", navigateTo: "/category/details", isActive: false},
            {id: 14, name: "Edit", navigateTo: "/category/edit", isActive: false},
        ]},
        {id: 15, name: "Attributes", iconName: "ShoppingCart", isActive: false, children: [
            {id: 16, name: "List", navigateTo: "/category/list", isActive: false},
            {id: 17, name: "Details", navigateTo: "/category/details", isActive: false},
            {id: 18, name: "Edit", navigateTo: "/category/edit", isActive: false},
        ]},
        {id: 19, name: "Tags", iconName: "ShoppingCart", isActive: false, children: [
            {id: 20, name: "List", navigateTo: "/category/list", isActive: false},
            {id: 21, name: "Details", navigateTo: "/category/details", isActive: false},
            {id: 22, name: "Edit", navigateTo: "/category/edit", isActive: false},
        ]}

    ]},

    {id: 23, name:  "Users", isActive: false, children: [
        {id: 24, name: "Profile", navigateTo: "/dashboard", isActive: false},
        {id: 25, name: "Roles", iconName: "ShoppingBag", isActive: false, children: [
            {id: 26, name: "List", navigateTo: "/products/list", isActive: false},
            {id: 27, name: "Create", navigateTo: "/products/create", isActive: false},
            {id: 28, name: "Edit", navigateTo: "/products/edit", isActive: false},
        ]},
        {id: 29, name: "Permissions", iconName: "Category", isActive: false, children: [
            {id: 30, name: "List", navigateTo: "/category/list", isActive: false},
            {id: 31, name: "Create", navigateTo: "/category/create", isActive: false},
            {id: 32, name: "Edit", navigateTo: "/category/edit", isActive: false},
        ]},
        {id: 33, name: "Customers", iconName: "ShoppingCart", isActive: false, children: [
            {id: 34, name: "List", navigateTo: "/category/list", isActive: false},
            {id: 35, name: "Details", navigateTo: "/category/details", isActive: false},
            {id: 36, name: "Edit", navigateTo: "/category/edit", isActive: false},
        ]},
        {id: 37, name: "Sellers", iconName: "ShoppingCart", isActive: false, children: [
            {id: 38, name: "List", navigateTo: "/category/list", isActive: false},
            {id: 39, name: "Details", navigateTo: "/category/details", isActive: false},
            {id: 40, name: "Edit", navigateTo: "/category/edit", isActive: false},
        ]}

    ]},

    {id: 41, name:  "Others", isActive: false, children: [
        {id: 42, name: "Coupons", isActive: false, navigateTo: "/dashboard"},
        {id: 43, name: "Reviews", iconName: "ShoppingBag", isActive: false, children: [
            {id: 44, name: "List", navigateTo: "/products/list", isActive: false},
            {id: 45, name: "Create", navigateTo: "/products/create", isActive: false},
            {id: 46, name: "Edit", navigateTo: "/products/edit", isActive: false},
        ]}
    ]},
];

export const setLvl2Active = (initialNavList: INav[], nav: INav) => {
    var newNavList: INav[] = JSON.parse(JSON.stringify(initialNavList));

    newNavList.forEach(l1 => {
        var l2 = l1.children?.find(l2 => l2.id === nav.id);
        if(l2) {
            l2.isActive = true;
            l2.showChildren = true;

            if(l2.children) {
                l2.children[0].isActive = true;
            }
        } 
    })

    return newNavList;

}

export const setLvl3Active = (initialNavList: INav[], nav: INav) => {
    var newNavList: INav[] = JSON.parse(JSON.stringify(initialNavList));

    newNavList.forEach(l1 => {
        l1.children?.forEach(l2 => {
            var l3 = l2.children?.find(l3 => l3.id === nav.id);
            if(l3) {
                l3.isActive = true;
                l2.isActive = true;
                l2.showChildren = true;
            } 
        }) 
    })

    return newNavList;
}

export const getNav = (id: number, navList: INav[]) => {

    var selectedNav = null;
    var level = "";

    navList.forEach(l1Nav => {
        var selectedNav = l1Nav.children?.find(l2Nav => l2Nav.id === id);
        
        if(selectedNav) {
            selectedNav = selectedNav;
            level = "2";
            return;
        }
        

        l1Nav.children?.forEach(l2Nav => {
            if(l2Nav.id === id) {
                selectedNav = l2Nav;
                level = "3";
            }
        })
    });

    
    return {selectedNav, level};
}