import { Button, Drawer, FormControlLabel, Switch, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NavigateTo } from "../../services/Navigate";
import { IVariant } from "../../models/IVariant";
import OptionsList from "./options/List";
import { OptionCreate } from "./options/Create";
import { IState } from "../../store/interfaces/IState";
import { VariantStateActions } from "../../store/Variant";
import { createVariant, deleteVariant, getVariant, updateVariant } from "../../services/api";
import { getMode } from "../../helpers/CommonFunctions";

export const VariantCreate = () => {

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";

    const dispatch = useDispatch();
    var navigate = useNavigate();
    var state = useSelector((state: IState) => state.VariantState);

    const [name, setName] = useState(state.variant?.name);
    const [isPublished, setIsPublished] = useState(state.variant?.isPublished || false);
    const [show, setShow] = useState(false);
    var params = useParams();
    

    useEffect(() => {
        var mode = getMode(params?.mode || "");
        dispatch(VariantStateActions.setMode(mode));

        if(params.id) {
            getVariant(+params.id).then((variant: IVariant) => {
                dispatch(VariantStateActions.setVariant(variant));
                setName(variant?.name);
                setIsPublished(variant?.isPublished || false);
                setShow(true);
            })
        } else {
            setShow(true);
        }
    }, []);

    useEffect(() => {
        dispatch(VariantStateActions.updateVariant({name, isPublished}));
    }, [name, isPublished, state.variant])

    const create = () => {
        createVariant(state.variant)
        .then(() => NavigateTo.Variants(navigate));
    }

    const updateV = () => {
        updateVariant(state.variant.id || 0, state.variant)
        .then(() => NavigateTo.Variants(navigate));
    }

    const deleteV = () => {
        deleteVariant(state.variant.id || 0)
        .then(() => NavigateTo.Variants(navigate));
    }

    const createOption = () => {
        dispatch(VariantStateActions.setDefaultOption());
        dispatch(VariantStateActions.setOptionsMode("C"));
    }

    return <>
        {show && <article>
             <MainAlert message="Fields marked with (*) are mandatory" />
            <Card card= { {cardHeader: "Variant Information"}}>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <TextField id="name" required label="Variant Name" disabled={["V", "D"].includes(state.mode)} variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>
            </Card>
            {/* Options */}
            <section className={clsContainer}>
                <section className={clsHeader}>
                    <h6> Options </h6> {state.mode}
                    {(state.mode === "E" || state.mode === "C" ) && <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => {createOption()}}>
                    <span className="text-gray-100 font-bold tracking-wider">Add Options</span>
                    </Button>}
                </section>
                <OptionsList/>
            </section>
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined" onClick={() => NavigateTo.Variants(navigate)}>Cancel</Button>
                    {state.mode === "C" && <Button variant="contained" className="" onClick={() => create()}>Create</Button>}
                    {state.mode === "E" && <Button variant="contained" className="" onClick={() => updateV()}>Update</Button>}
                    {state.mode === "D" && <Button variant="contained" className="" onClick={() => deleteV()}>Delete</Button>}
                    {state.mode === "V" && <Button variant="contained" className="" onClick={() => NavigateTo.Variants(navigate)}>Ok</Button>}
                </section>
            </Card>

            <Drawer open={state.optionsMode === "C"} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "300px"} }}>
                <Card card= { {cardHeader: "Add Options"}}>
                    <OptionCreate/>
                </Card>
            </Drawer>
        </article>}
    </>
}