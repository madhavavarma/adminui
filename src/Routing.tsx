import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Layout from "./basecomponents/Layout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { FluidContainer } from "./basecomponents/FluidContainer";
import { ProductCreate } from "./components/products/Create";
import { ProductList } from "./components/products/List";
import { ProductEdit } from "./components/products/Edit";
import { CategoryList } from "./components/categories/List";
import { CategoryCreate } from "./components/categories/Create";
import { CategoryEdit } from "./components/categories/Edit";



export default function Routing() {
    return (
        <Router basename="">
            <Routes>
                <Route path="/" element={<Layout />}> 
                    {/* Dashboard */}
                    <Route path="/dashboard" element={ <FluidContainer><Dashboard /></FluidContainer>}></Route>
                   
                    {/* Products */}
                    <Route path="/products/create" element={ <FluidContainer><ProductCreate /></FluidContainer>}></Route>
                    <Route path="/products/edit/:id" element={ <FluidContainer><ProductEdit /></FluidContainer>}></Route>
                    <Route path="/products/list" element={ <FluidContainer><ProductList /></FluidContainer>}></Route>

                    {/* Categoreis */}
                    <Route path="/categories/create" element={ <FluidContainer><CategoryCreate /></FluidContainer>}></Route>
                    <Route path="/categories/edit/:id" element={ <FluidContainer><CategoryEdit /></FluidContainer>}></Route>
                    <Route path="/categories/list" element={ <FluidContainer><CategoryList /></FluidContainer>}></Route>
                </Route>
            </Routes>
        </Router>
    )
}