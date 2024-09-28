import { Button, Drawer, FormControlLabel, Switch, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "../../services/Navigate";
import { ICategory } from "../../models/ICategory";
import SubCategoryList from "./SubCategories/List";
import { SubCategoryCreate } from "./SubCategories/Create";

interface IProps {
    Category?: ICategory,
    isEdit?: boolean
  }

export const CategoryCreate = (props: IProps) => {

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";

    const dispatch = useDispatch();
    var navigate = useNavigate();

    const [Category, setCategory] = useState<ICategory>();
    const [name, setName] = useState(Category?.name);
    const [image, setImage] = useState(Category?.image);
    const [isPublished, setIsPublished] = useState(Category?.isPublished || false);
    const [showSubCatDrawer, setShowSubCatDrawer] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT Category" : "ADD Category"));

        if(props.Category) {
            setCategory(props.Category);
            setName(props.Category.name);
            setImage(props.Category.image);
            setIsPublished(props.Category.isPublished);
        }

        setShow(true);
    }, []);

    const create = () => {

        var Category = {
            name,
            image,
            isPublished,
        }

        console.log(Category);

        NavigateTo.CategoriesCreate(navigate);
    }

    return <>
        {show && <article>
             <MainAlert message="Fields marked with (*) are mandatory" />
            <Card card= { {cardHeader: "Category Information"}}>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <TextField id="name" required label="Category Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <TextField id="image" required label="Category Image (url)" variant="outlined" size="small" value={image} onChange={(e: any) => setImage(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>
            </Card>
            {/* Sub Category */}
            <section className={clsContainer}>
                <section className={clsHeader}>
                    <h6> Sub Categories </h6>
                    <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => {setShowSubCatDrawer(true)}}>
                    <span className="text-gray-100 font-bold tracking-wider">Add Sub Category</span>
                    </Button>
                </section>
                <SubCategoryList />
            </section>
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined" onClick={() => NavigateTo.Categories(navigate)}>Cancel</Button>
                    <Button variant="contained" className="" onClick={() => create()}>{props.isEdit ? "Update" : "Create" }</Button>
                </section>
            </Card>

            <Drawer open={showSubCatDrawer} onClose={() => {setShowSubCatDrawer(false)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "300px"} }}>
                <Card card= { {cardHeader: "Add Sub Category"}}>
                    <SubCategoryCreate />
                </Card>
            </Drawer>
        </article>}
    </>
}