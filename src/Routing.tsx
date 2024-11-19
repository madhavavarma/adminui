import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Layout from "./basecomponents/Layout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { FluidContainer } from "./basecomponents/FluidContainer";
import { Product } from "./components/products/Product";
import { Products } from "./components/products/Products";
import { CategoryList } from "./components/categories/List";
import { CategoryCreate } from "./components/categories/Create";
import { TagsList } from "./components/tags/List";
import { VariantCreate } from "./components/variants/Create";
import { VariantList } from "./components/variants/List";
import { OrdersList } from "./components/orders/OrdersList";
import { Order } from "./components/orders/Order";



export default function Routing() {
    return (
        <Router basename="">
            <Routes>
                <Route path="/" element={<Layout />}> 
                    {/* Dashboard */}
                    <Route path="" element={ <FluidContainer><Dashboard /></FluidContainer>}></Route>
                    <Route path="/dashboard" element={ <FluidContainer><Dashboard /></FluidContainer>}></Route>
                   
                    {/* Products */}
                    <Route path="/products/:mode/:id?" element={ <FluidContainer><Product /></FluidContainer>}></Route>
                    <Route path="/products/list" element={ <FluidContainer><Products /></FluidContainer>}></Route>

                    {/* Categoreis */}
                    <Route path="/categories/:mode/:id?" element={ <FluidContainer><CategoryCreate /></FluidContainer>}></Route>
                    <Route path="/categories/list" element={ <FluidContainer><CategoryList /></FluidContainer>}></Route>

                    {/* Variants */}
                    <Route path="/variants/:mode/:id?" element={ <FluidContainer><VariantCreate /></FluidContainer>}></Route>
                    <Route path="/variants/list" element={ <FluidContainer><VariantList /></FluidContainer>}></Route>

                    {/* Tags */}
                    <Route path="/tags/list" element={ <FluidContainer><TagsList /></FluidContainer>}></Route>

                     {/* Orders */}
                    <Route path="/orders/:mode/:id" element={ <FluidContainer><Order /></FluidContainer>}></Route>
                    <Route path="/orders/list" element={ <FluidContainer><OrdersList /></FluidContainer>}></Route>
                </Route>
            </Routes>
        </Router>
    )
}