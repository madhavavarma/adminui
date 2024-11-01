import { Drawer, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../../helpers/GetIcons";
import { Card } from "../../../basecomponents/Card";
import { ICategory } from "../../../models/ICategory";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/interfaces/IState";
import { CategoryStateActions } from "../../../store/Category";
import { SubCategoryCreate } from "./Create";


const SubCategoryList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsChild = "font-Play font-medium overflow-scroll";

    const dispatch = useDispatch();
    const state = useSelector((state:IState) => state.CategoryState);

    const setSubCategoryMode = (mode: string, subCategory: ICategory) => {
      dispatch(CategoryStateActions.setSubCategoryMode(mode));
      dispatch(CategoryStateActions.setEditSubCategory(subCategory));
    }

    function Row(props: { subCategory: ICategory }) {
        const { subCategory: subCategory } = props;
        const [open, setOpen] = React.useState(false);
      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {subCategory.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={subCategory.isPublished} disabled={true}/>
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setSubCategoryMode("V", subCategory)}>
                        <IconButton aria-label="Example">
                          {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    {state.mode === "E" && <span className="bg-btn-icon-color-dull rounded" onClick={() => setSubCategoryMode("E", subCategory)}>
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span>}
                    {state.mode === "E" && <span className="bg-btn-icon-color-dull rounded" onClick={() => setSubCategoryMode("D", subCategory)}>
                        <IconButton aria-label="Example">
                          {GetIcon("delete", "--btn-icon-color-delete")}
                        </IconButton>
                    </span> }
                </section>                
             </TableCell>
             
            </TableRow>
          </React.Fragment>
        );
    }

    return <>
        <article className={clsContainer}>
            <section className={clsChild}>
                {/* <TableContainer component={Paper}> */}
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell><IconButton
                  aria-label="expand row"
                  size="small"
                >
                  <KeyboardArrowDownIcon />
                </IconButton></TableCell>
                            <TableCell>Cagetory</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.category.subCategories?.map((row) => (
                            <Row key={row.name} subCategory={row} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={state.category.subCategories?.length || 0}
                        rowsPerPage={10}
                        page={0}
                        onPageChange={() => {}}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
        />
                {/* </TableContainer> */}
            </section>

            <Drawer open={['E', 'D', 'V'].includes(state.subCategoryMode)} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Add Sub Category"}}>
                    <SubCategoryCreate />
                </Card>
            </Drawer>
        </article>
    </>
}

export default SubCategoryList;