import {  Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../../store/Notifications";
import { IOption } from "../../../models/IOption";

interface IProps {
    option?: IOption,
    isEdit?: boolean
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


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <TextField id="name" required label="Option Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>

                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => {}}>Cancel</Button>
                    <Button variant="contained" className="" onClick={() => {}}>{props.isEdit ? "Update" : "Create" }</Button>
                </section>
        </article>}
    </>
}