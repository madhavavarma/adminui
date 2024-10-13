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

    // Variants
    static Variants = (navigate: NavigateFunction) => {
        navigate("/variants/list")
    }

    static VariantsCreate = (navigate: NavigateFunction) => {
        navigate("/variants/create")
    }

    static VarinatsEdit = (navigate: NavigateFunction, id: number) => {
        navigate("/variants/edit/" +id)
    }
}