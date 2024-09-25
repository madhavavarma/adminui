import { Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { ICategory } from "../../../models/ICategory";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../../store/Notifications";

interface IProps {
    category?: ICategory,
    isEdit?: boolean
  }

export const SubCategoryCreate = (props: IProps) => {

    var dispatch = useDispatch();


    const [Category, setCategory] = useState<ICategory | null>(props.category || null);
    const [name, setName] = useState(Category?.name);
    const [isPublished, setIsPublished] = useState(Category?.isPublished || false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT CATEGORY" : "ADD CATEGORY"));

        console.log(props.category)

        if(props.category) {
            setCategory(props.category);
            setName(props.category.name);
            setIsPublished(props.category.isPublished);
        }

        setShow(true);
    }, []);



    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4">
                    <TextField id="name" required label="Category Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
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