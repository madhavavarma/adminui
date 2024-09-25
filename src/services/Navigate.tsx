import { NavigateFunction } from "react-router-dom";


export  class  NavigateTo  {
    
    // Dashboard
    static Dashboard = (navigate: NavigateFunction) => {
        navigate("/dashboard")
    }

    // Products
    static Products = (navigate: NavigateFunction) => {
        navigate("/products/list")
    }

    static ProductsCreate = (navigate: NavigateFunction) => {
        navigate("/products/create")
    }

    static ProductsEdit = (navigate: NavigateFunction, id: number) => {
        navigate("/products/edit/" +id)
    }


    // Categories
    static Categories = (navigate: NavigateFunction) => {
        navigate("/categories/list")
    }

    static CategoriesCreate = (navigate: NavigateFunction) => {
        navigate("/categories/create")
    }

    static CaregoriesEdit = (navigate: NavigateFunction, id: number) => {
        navigate("/categories/edit/" +id)
    }
}