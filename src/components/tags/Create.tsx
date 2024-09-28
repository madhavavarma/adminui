import { Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ITag } from "../../models/ITag";
import { NotificationsActions } from "../../store/Notifications";

interface IProps {
    tag?: ITag,
    isEdit?: boolean
  }

export const TagCreate = (props: IProps) => {

    var dispatch = useDispatch();

    const [tag, setTag] = useState<ITag | null>(props.tag || null);
    const [name, setName] = useState(tag?.name);
    const [isPublished, setIsPublished] = useState(tag?.isPublished || false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT TAG" : "ADD TAG"));

        console.log(props.tag)

        if(props.tag) {
            setTag(props.tag);
            setName(props.tag.name);
            setIsPublished(props.tag.isPublished);
        }

        setShow(true);
    }, []);


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <TextField id="name" required label="Tag Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
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