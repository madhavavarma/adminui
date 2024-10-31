import { Button, Drawer, FormControlLabel, Switch, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch, useSelector } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { useNavigate, useParams } from "react-router-dom";
import { NavigateTo } from "../../services/Navigate";
import { ICategory } from "../../models/ICategory";
import SubCategoryList from "./SubCategories/List";
import { SubCategoryCreate } from "./SubCategories/Create";
import { IState } from "../../store/interfaces/IState";
import { getMode } from "../../helpers/CommonFunctions";
import { CategoryStateActions } from "../../store/Category";
import { getCategory } from "../../services/api";


export const CategoryCreate = () => {

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";

    const dispatch = useDispatch();
    var navigate = useNavigate();
    var state = useSelector((state: IState) => state.CategoryState);

    const [name, setName] = useState<string>();
    const [image, setImage] = useState<string>();
    const [isPublished, setIsPublished] = useState<boolean>();
    const [show, setShow] = useState(false);
    var params = useParams();

    useEffect(() => {
        var mode = getMode(params?.mode || "");
        dispatch(CategoryStateActions.setMode(mode));

        if(params.id) {
            getCategory(+params.id).then((category: ICategory) => {
                dispatch(CategoryStateActions.setCategory(category));
                setName(category?.name);
                setIsPublished(category?.isPublished || false);
                setImage(category?.image)
                setShow(true);
            })
        }

    }, []);

    useEffect(() => {
        dispatch(CategoryStateActions.updateCategory({name, isPublished, image}));
    }, [name, isPublished, image, state.category])

    const create = () => {
        console.log(state.category);
    }

    const createSubCategory = () => {
        dispatch(CategoryStateActions.setDefaultSubCategory());
        dispatch(CategoryStateActions.setSubCategoryMode("C"));
    }

    return <>
        {show && <article>
             <MainAlert message="Fields marked with (*) are mandatory" />
            <Card card= { {cardHeader: "Category Information"}}>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <TextField id="name" required label="Category Name" disabled={["V", "D"].includes(state.mode)} variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <TextField id="image" required label="Category Image (url)" disabled={["V", "D"].includes(state.mode)} variant="outlined" size="small" value={image} onChange={(e: any) => setImage(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } disabled={["V", "D"].includes(state.mode)}/>
                    </span>
                </section>
            </Card>
            {/* Sub Category */}
            <section className={clsContainer}>
                <section className={clsHeader}>
                    <h6> Sub Categories </h6>
                    {(state.mode === "E" || state.mode === "C" ) && <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => {createSubCategory()}}>
                    <span className="text-gray-100 font-bold tracking-wider">Add Sub Category</span>
                    </Button>}
                </section>
                <SubCategoryList />
            </section>
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined" onClick={() => NavigateTo.Categories(navigate)}>Cancel</Button>
                    {state.mode === "C" && <Button variant="contained" className="" onClick={() => create()}>Create</Button>}
                    {state.mode === "E" && <Button variant="contained" className="" onClick={() => create()}>Update</Button>}
                    {state.mode === "D" && <Button variant="contained" className="" onClick={() => {}}>Delete</Button>}
                    {state.mode === "V" && <Button variant="contained" className="" onClick={() => NavigateTo.Categories(navigate)}>Ok</Button>}
                </section>
            </Card>

            <Drawer open={state.subCategoryMode === "C"} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "300px"} }}>
                <Card card= { {cardHeader: "Add Sub Category"}}>
                    <SubCategoryCreate />
                </Card>
            </Drawer>
        </article>}
    </>
}