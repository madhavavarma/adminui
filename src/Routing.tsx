import { Route, HashRouter as Router, Routes } from "react-router-dom";
import Layout from "./basecomponents/Layout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { FluidContainer } from "./basecomponents/FluidContainer";



export default function Routing() {
    return (
        <Router basename="">
            <Routes>
                <Route path="/" element={<Layout />}> 
                    <Route path="/dashboard" element={ <FluidContainer><Dashboard /></FluidContainer>}></Route>
                </Route>
            </Routes>
        </Router>
    )
}