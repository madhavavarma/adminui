import { Button, Divider, FormControlLabel, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from "@mui/material"
import { ICategory } from "../../../models/ICategory";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetIcon } from "../../../helpers/GetIcons";
import { IState } from "../../../store/interfaces/IState";
import { CategoryStateActions } from "../../../store/Category";
import React from "react";

export const SubCategoryCreate = () => {

    var dispatch = useDispatch();
    var state = useSelector((state: IState) => state.CategoryState)


    const [name, setName] = useState(state.subCategory?.name);
    const [isPublished, setIsPublished] = useState(state.subCategory?.isPublished || false);
    const [show, setShow] = useState(true);

    const [miniCategoryName, setMiniCategoryName] = useState<string>();

    useEffect(() => {
        setName(state.subCategory.name);
        setIsPublished(state.category.isPublished);
        setShow(true);
    }, []);


    const update = () => {
      dispatch(CategoryStateActions.updateSubCategory({id: state.subCategory.id, name, isPublished}));
      close();
  }

  const deleteSubCategory = () => {
      dispatch(CategoryStateActions.deleteSubCategory(state.subCategory));
      close();
  }

  const addSubCategory = () => {
      dispatch(CategoryStateActions.addSubCategory({id: - (state.category.subCategories?.length || 0) + 1, name, isPublished}));
      close();
  }

const updateMiniCategory = (miniCategory: ICategory, isPublished: boolean) => {
    dispatch(CategoryStateActions.updateMiniCategory({id: miniCategory.id, name: miniCategory.name, isPublished: isPublished}));
}

const deleteMiniCategory = (miniCategory: ICategory) => {
    dispatch(CategoryStateActions.deleteMiniCategory(miniCategory));
}

const addMiniCategory = () => {
    dispatch(CategoryStateActions.addMiniCategory({id: - (state.subCategory.subCategories?.length || 0) + 1, name: miniCategoryName || "", isPublished: true}));
    setMiniCategoryName("");
}

  const close = () => {
      dispatch(CategoryStateActions.setSubCategoryMode(""))
  }

    function Row(props: { miniCategory: ICategory }) {
        const { miniCategory: miniCategory } = props;
          
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell component="th" scope="row">
                {miniCategory.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={miniCategory.isPublished} onChange={(e) => updateMiniCategory(miniCategory, e.target.checked)} />
             </TableCell>
             { ['C', 'E'].includes(state.subCategoryMode) && <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded">
                        <IconButton aria-label="Example" onClick={() => deleteMiniCategory(miniCategory)}>
                            {GetIcon("delete", "")}
                        </IconButton>
                    </span>
                </section>                
             </TableCell> }
             
            </TableRow>
            <TableRow>
             
            </TableRow>
          </React.Fragment>
        );
    }

    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <TextField id="name" required label="Category Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>

               
                <section>
                    <span className="text-text-header-color size-sm font-semibold">Mini Categories</span>
                    <Divider />
                    { ['C', 'E'].includes(state.subCategoryMode)  && <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1 mt-6">
                        <TextField id="name" required label="Mini" variant="outlined" size="small"  value={miniCategoryName} onChange={(e: any) => setMiniCategoryName(e.target.value)}/>
                        <Button variant="outlined" onClick={() => {addMiniCategory()}}>Add New</Button> 
                    </section> }

                    {/* <TableContainer component={Paper}> */}
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Cagetory</TableCell>
                            <TableCell>Published</TableCell>
                            { state.subCategoryMode === "E" &&  <TableCell>Action</TableCell> }
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.subCategory.subCategories?.map((miniCategory) => (
                            <Row key={miniCategory.name} miniCategory={miniCategory} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        className="mb-6"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={state.subCategory.subCategories?.length || 0}
                        rowsPerPage={10}
                        page={0}
                        onPageChange={() => {}}
        />
                    <Divider />
                </section>
                
                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => {close()}}>Cancel</Button>
                    {state.subCategoryMode === "E" && <Button variant="contained" className="" onClick={() => update()}>Update</Button>}
                    {state.subCategoryMode === "C" && <Button variant="contained" className="" onClick={() => addSubCategory()}>Create</Button>}
                    {state.subCategoryMode === "V" && <Button variant="contained" className="" onClick={() => close()}>Ok</Button>}
                    {state.subCategoryMode === "D" && <Button variant="contained" className="" onClick={() => deleteSubCategory()}>Delete</Button>}
                </section>
        </article>}
    </>
}