import { NavigateFunction } from "react-router-dom";


export  class  NavigateTo  {
    
    static Dashboard = (navigate: NavigateFunction) => {
        navigate("/dashboard")
    }

    static Products = (navigate: NavigateFunction) => {
        navigate("/products/list")
    }

    static ProductsCreate = (navigate: NavigateFunction) => {
        navigate("/products/create")
    }
    
}