import {  Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../../store/Notifications";
import { IOption } from "../../../models/IOption";

interface IProps {
    option?: IOption,
    isEdit?: boolean,
    isView?: boolean,
    isDelete?: boolean,
    isCreate?: boolean,
    cancel: () => void,
    updateOption?: (option: IOption) => void,
    deleteOption?: (option: IOption) => void,
    addOption?: (option: IOption) => void,
  }

export const OptionCreate = (props: IProps) => {

    var dispatch = useDispatch();

    const [option, setOption] = useState<IOption | null>(props.option || null);
    const [name, setName] = useState(option?.name);
    const [isPublished, setIsPublished] = useState(option?.isPublished || false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT OPTION" : "ADD OPTION"));

        console.log(props.option)

        if(props.option) {
            setOption(props.option);
            setName(props.option.name);
            setIsPublished(props.option.isPublished);
        }

        setShow(true);
    }, []);

    const update = () => {
        if(props.updateOption && props.option) {
            props.option.name = name || "";
            props.option.isPublished = isPublished;
            props.updateOption(props.option);
            props.cancel();
        }
    }

    const deleteOption = () => {

        if(props.deleteOption && props.option)
        props.deleteOption(props.option);
        props.cancel();
    }

    const addOption = () => {
        if(props.addOption) {
            var option: IOption = {
                name: name || "",
                isPublished: isPublished
            }

            props.addOption(option)
            props.cancel();
        }
    }


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <TextField id="name" disabled={props.isView || props.isDelete} required label="Option Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } disabled={props.isView || props.isDelete} />
                    </span>
                </section>

                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => props.cancel()}>Cancel</Button>
                    {props.isEdit && <Button variant="contained" className="" onClick={() => update()}>Update</Button>}
                    {props.isCreate && <Button variant="contained" className="" onClick={() => addOption()}>Create</Button>}
                    {props.isView && <Button variant="contained" className="" onClick={() => {}}>Ok</Button>}
                    {props.isDelete && <Button variant="contained" className="" onClick={() => deleteOption()}>Delete</Button>}
                </section>
        </article>}
    </>
}