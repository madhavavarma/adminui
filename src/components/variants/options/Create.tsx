import {  Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IOption } from "../../../models/IOption";
import { IState } from "../../../store/interfaces/IState";
import { VariantStateActions } from "../../../store/Variant";

export const OptionCreate = () => {

    var dispatch = useDispatch();
    var state = useSelector((state: IState) => state.VariantState)

    const [option] = useState<IOption>(state.option);
    const [name, setName] = useState(option?.name);
    const [isPublished, setIsPublished] = useState(option?.isPublished || false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        setName(option.name);
        setIsPublished(option.isPublished);
        setShow(true);
    }, []);

    const update = () => {
        dispatch(VariantStateActions.updateOption({id: option.id, name, isPublished}));
        close();
    }

    const deleteOption = () => {
        dispatch(VariantStateActions.deleteOption(option));
        close();
    }

    const addOption = () => {
        dispatch(VariantStateActions.addOption({name, isPublished}));
        close();
    }

    const close = () => {
        dispatch(VariantStateActions.setOptionsMode(""))
    }


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <TextField id="name" disabled={["V", "D"].includes(state.optionsMode)} required label="Option Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } disabled={['V', 'D'].includes(state.optionsMode)} />
                    </span>
                </section>

                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => close()}>Cancel</Button>
                    {state.optionsMode === "E" && <Button variant="contained" className="" onClick={() => update()}>Update</Button>}
                    {state.optionsMode === "C" && <Button variant="contained" className="" onClick={() => addOption()}>Create</Button>}
                    {state.optionsMode === "V" && <Button variant="contained" className="" onClick={() => close()}>Ok</Button>}
                    {state.optionsMode === "D" && <Button variant="contained" className="" onClick={() => deleteOption()}>Delete</Button>}
                </section>
        </article>}
    </>
}