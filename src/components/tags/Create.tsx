import { Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { ITag } from "../../models/ITag";
import { NotificationsActions } from "../../store/Notifications";
import { createTag, deleteTag, updateTag } from "../../services/api";

interface IProps {
    tag?: ITag,
    isCreate?: boolean,
    isEdit?: boolean,
    isDelete?: boolean,
    isView?: boolean,
    close: () => void
  }

export const TagCreate = (props: IProps) => {

    var dispatch = useDispatch();

    const [tag, setTag] = useState<ITag | null>(props.tag || null);
    const [name, setName] = useState(tag?.tagName);
    const [isPublished, setIsPublished] = useState(tag?.isPublished || false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT TAG" : "ADD TAG"));

        if(props.tag) {
            setTag(props.tag);
            setName(props.tag.tagName);
            setIsPublished(props.tag.isPublished);
        }

        setShow(true);
    }, []);

    const create = () => {
        createTag({id: 0, tagName: name || "", isPublished})
        .then(() => props.close());
    }

    const deleteT = () => {
        deleteTag(props.tag?.id || 0)
        .then(() => props.close());
    }

    const update = () => {
        updateTag({id: props.tag?.id || 0, tagName: name || "", isPublished})
        .then(() => props.close());
    }

    const ok = () => {
        props.close();
    }


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <TextField id="name" disabled={props.isDelete || props.isView} required label="Tag Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} disabled={props.isDelete || props.isView} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>

                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => props.close()}>Cancel</Button>
                    {props.isCreate && <Button variant="contained" className="" onClick={() => {create()}}>Create</Button>}
                    {props.isEdit && <Button variant="contained" className="" onClick={() => {update()}}>Update</Button>}
                    {props.isView && <Button variant="contained" className="" onClick={() => {ok()}}>Ok</Button>}
                    {props.isDelete && <Button variant="contained" className="" onClick={() => {deleteT()}}>Delete</Button>}
                </section>
        </article>}
    </>
}