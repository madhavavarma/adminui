import { Button, Drawer, FormControlLabel, Switch, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "../../services/Navigate";
import { IVariant } from "../../models/IVariant";
import OptionsList from "./options/List";
import { OptionCreate } from "./options/Create";
import { IOption } from "../../models/IOption";

interface IProps {
    Variant?: IVariant,
    isEdit?: boolean,
    isDelete?: boolean,
    isView?: boolean
  }

export const VariantCreate = (props: IProps) => {

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";

    const dispatch = useDispatch();
    var navigate = useNavigate();


    const [Variant, setVariant] = useState<IVariant>();
    const [name, setName] = useState(Variant?.name);
    const [isPublished, setIsPublished] = useState(Variant?.isPublished || false);
    const [showSubCatDrawer, setShowSubCatDrawer] = useState(false);
    const [show, setShow] = useState(false);
    const [isCreate, setIsCreate] = useState(false);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT Variant" : "ADD Variant"));

        setIsCreate(!props.isEdit && !props.isDelete && !props.isView);

        if(props.Variant) {
            setVariant(props.Variant);
            setName(props.Variant.name);
            setIsPublished(props.Variant.isPublished);
        }

        setShow(true);
    }, []);

    const create = () => {

        var Variant = {
            name,
            isPublished,
        }

        console.log(Variant);

        NavigateTo.VariantsCreate(navigate);
    }

    const cancelOption = () => {
        setShowSubCatDrawer(false);
    }

    const addOption = (option: IOption) => {
        if(props.Variant) {
            option.id = (0 - props.Variant.options.filter(x => (x.id || 0) < 1).length);
            option.variantId = props.Variant.id;
            props.Variant.options.push(option);
        }
        
    }

    return <>
        {show && <article>
             <MainAlert message="Fields marked with (*) are mandatory" />
            <Card card= { {cardHeader: "Variant Information"}}>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <TextField id="name" required label="Variant Name" disabled={props.isView || props.isDelete} variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>
            </Card>
            {/* Options */}
            <section className={clsContainer}>
                <section className={clsHeader}>
                    <h6> Options </h6>
                    {(props.isEdit || isCreate ) && <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => {setShowSubCatDrawer(true)}}>
                    <span className="text-gray-100 font-bold tracking-wider">Add Options</span>
                    </Button>}
                </section>
                <OptionsList options={Variant?.options || []} isEdit={props.isEdit || false}/>
            </section>
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined" onClick={() => NavigateTo.Variants(navigate)}>Cancel</Button>
                    {isCreate && <Button variant="contained" className="" onClick={() => create()}>Create</Button>}
                    {props.isEdit && <Button variant="contained" className="" onClick={() => create()}>Update</Button>}
                    {props.isDelete && <Button variant="contained" className="" onClick={() => {}}>Delete</Button>}
                    {props.isView && <Button variant="contained" className="" onClick={() => NavigateTo.Variants(navigate)}>Ok</Button>}
                </section>
            </Card>

            <Drawer open={showSubCatDrawer} onClose={() => {setShowSubCatDrawer(false)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "300px"} }}>
                <Card card= { {cardHeader: "Add Options"}}>
                    <OptionCreate cancel={cancelOption} isCreate={true} addOption= {addOption}/>
                </Card>
            </Drawer>
        </article>}
    </>
}