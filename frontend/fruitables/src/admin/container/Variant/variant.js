// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogTitle from '@mui/material/DialogTitle';
// import { useFormik } from 'formik';
// import { object, string, number, mixed } from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { getProducts, addProducts, editProducts, deleteProducts } from '../../../redux/action/products.action'
// import IconButton from '@mui/material/IconButton';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { FormControl, InputLabel, MenuItem, OutlinedInput, Select } from '@mui/material';
// import { getData } from '../../../redux/action/category.action';
// import { getSubData } from '../../../redux/slice/subCategory.slice';


// function Variant() {
//   const [open, setOpen] = useState(false);
//   const [update, setUpdate] = useState(false);
//   const dispatch = useDispatch();
//   const products = useSelector((state) => state.products.products);
//   const categories = useSelector((state) => state.categories.categories);
//   const subcategories = useSelector((state) => state.subcategories.subcategories);

//   useEffect(() => {
    // dispatch(getProducts());
    // dispatch(getData());
    // dispatch(getSubData());
//   }, [dispatch]);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setUpdate(false);
//     formik.resetForm();
//   };

//   const handleDelete = (id) => {
//     dispatch(deleteProducts(id));
//   };

//   const handleEdit = (data) => {
//     formik.setValues(data);
//     setOpen(true);
//     setUpdate(true);
//   };



//   const productSchema = object({

//     price: number().required("Please enter price").positive("Price must be positive"),
//     category_id: string().required("Please select a category"),
//     subcategory_id: string().required("Please select a subcategory"),
//     product_id: string().required("Please enter product id"),
//     stock: number().required("Please enter stock").min(0, "Stock cannot be negative"),

//   });

//   const formik = useFormik({
//     initialValues: {
//       subcategory_id: '',
//       category_id: '',
//       product_id: '',
//       price: '',
//       stock: '',
 
//     },
//     validationSchema: productSchema,
//     onSubmit: (values, { resetForm }) => {
//       if (update) {
//         dispatch(editProducts(values));
//       } else {
//         dispatch(addProducts(values));
//       }
//       resetForm();
//       handleClose();
//     },
//   });

//   const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;

//   const changeCategorySelect = (event) => {
//     const selectedCategoryId = event.target.value;
//     console.log(selectedCategoryId)
//     setFieldValue("category_id", selectedCategoryId);
//     setFieldValue("subcategory_id", "");
//   };

//   const changeSubcategorySelect = (event) => {
//     setFieldValue("subcategory_id", event.target.value);
//   };
//   const changeProductSelect  =  (event) => {
//     setFieldValue("product_id", event.target.value);
//     };



//   const filteredSubcategories = subcategories.filter(subcategory => subcategory.category_id === values.category_id);
//   const filteredProducts = products.filter(product => product.subcategory_id === values.subcategory_id);
//   const columns = [
//     {
//       field: 'category_id', headerName: 'Category', width: 150,
//       renderCell: (params) => {
//         const category = categories.find((v) => v._id === params.row.category_id);

//         return category ? category.name : '';
//       }
//     },
//     {
//       field: 'subcategory_id', headerName: 'SubCategory', width: 150,
//       renderCell: (params) => {
//         const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
//         return subcategory ? subcategory.name : '';
//       }
//     },
//     {
//         field: 'product_id', headerName: 'Product', width: 150,
//         renderCell: (params) => {
//             const product = products.find((v) => v._id === params.row.product_id);
//             return product ? product.name : '';
//         }
//     },



//     { field: 'price', headerName: 'Product Price', width: 160 },
//     { field: 'stock', headerName: 'Products Stock', width: 160 },

//     {
//       field: 'action',
//       headerName: 'Action',
//       width: 160,
//       renderCell: (params) => (
//         <>
//           <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
//             <EditIcon />
//           </IconButton>
//           <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
//             <DeleteIcon />
//           </IconButton>
//         </>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Button variant="outlined" onClick={handleClickOpen}>
//         Add Product
//       </Button>
//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>{update ? 'Update Product' : 'Add Product'}</DialogTitle>
//         <form onSubmit={handleSubmit} enctype="multipart/form-data">
//           <DialogContent>
//             <FormControl fullWidth margin="dense">
//               <InputLabel id="category_id-label">Select Category</InputLabel>
//               <Select
//                 labelId="category_id-label"
//                 id="category_id"
//                 value={values.category_id}
//                 label="Category"
//                 name="category_id"
//                 onChange={changeCategorySelect}
//                 onBlur={handleBlur}
//                 input={<OutlinedInput label="Select Category" />}
//               >
//                 {categories.map((v) => (
//                   <MenuItem key={v._id} value={v._id}>
//                     {v.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.category_id && touched.category_id && <span style={{ color: 'red' }}>{errors.category_id}</span>}
//             </FormControl>

//             <FormControl fullWidth margin="dense">
//               <InputLabel id="subcategory_id-label">Select SubCategory</InputLabel>
//               <Select
//                 labelId="subcategory_id-label"
//                 id="subcategory_id"
//                 value={values.subcategory_id}
//                 label="subcategory"
//                 name="subcategory_id"
//                 onChange={changeSubcategorySelect}
//                 onBlur={handleBlur}
//                 input={<OutlinedInput label="Select subcategory" />}
//                 disabled={!values.category_id}
//               >
//                 {filteredSubcategories.map((v) => (
//                   <MenuItem key={v._id} value={v._id}>
//                     {v.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.subcategory_id && touched.subcategory_id && <span style={{ color: 'red' }}>{errors.subcategory_id}</span>}
//             </FormControl>
            
//             <FormControl fullWidth margin="dense">
//               <InputLabel id="product_id-label">Select Product</InputLabel>
//               <Select
//                 labelId="product_id-label"
//                 id="product_id"
//                 value={values.product_id}
//                 label="products"
//                 name="product_id"
//                 onChange={changeProductSelect}
//                 onBlur={handleBlur}
//                 input={<OutlinedInput label="Select product" />}
//                 disabled={!values.category_id}
//               >
//                 {filteredProducts.map((v) => (
//                   <MenuItem key={v._id} value={v._id}>
//                     {v.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.product_id && touched.product_id && <span style={{ color: 'red' }}>{errors.product_id}</span>}
//             </FormControl>

          
//             <TextField
//               margin="dense"
//               id="price"
//               name="price"
//               label="Price"
//               type="number"
//               fullWidth
//               variant="standard"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.price}
//               error={errors.price && touched.price}
//               helperText={errors.price && touched.price ? errors.price : ''}
//             />
//             <TextField
//               margin="dense"
//               id="stock"
//               name="stock"
//               label="Stock"
//               type="number"
//               fullWidth
//               variant="standard"
//               onChange={handleChange}
//               onBlur={handleBlur}
//               value={values.stock}
//               error={errors.stock && touched.stock}
//               helperText={errors.stock && touched.stock ? errors.stock : ''}
//             />

//           </DialogContent>
//           <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button type="submit">{update ? 'Update' : 'Add'}</Button>
//           </DialogActions>
//         </form>
//       </Dialog>
//       <br /><br />
//       <div style={{ height: 400, width: '100%' }}>
//         <DataGrid
//           rows={products}
//           columns={columns}
//           initialState={{
//             pagination: {
//               paginationModel: { page: 0, pageSize: 5 },
//             },
//           }}
//           getRowId={(row) => row._id}
//           pageSizeOptions={[5, 10]}
//           checkboxSelection
//         />
//       </div>
//     </>
//   );
// }

// export default Variant;





import React, { useEffect, useState } from 'react';
import {
    Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle,
    Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select, IconButton
} from '@mui/material';
import { useFormik } from 'formik';
import { object, string, boolean } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';

import { getVariantData, handleAdd, handleRemove, handleUpdateData } from '../../../redux/slice/variant.slice';
import { getProducts, addProducts, editProducts, deleteProducts } from '../../../redux/action/products.action'
import { getData } from '../../../redux/action/category.action';
import { getSubData } from '../../../redux/slice/subCategory.slice';


function Variants(props) {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [dynamicFields, setDynamicFields] = useState([]);
    const dispatch = useDispatch();

    const products = useSelector(state => state.product.product);
    const subcategories = useSelector(state => state.subcategory.subcategory);
    const categories = useSelector(state => state.category.category);
    const variants = useSelector(state => state.variants.variants);

    // console.log("subcategories", subcategories,);
    // console.log("categories", categories,);
    // console.log("products", products);

    useEffect(() => {
      dispatch(getProducts());
      dispatch(getData());
      dispatch(getSubData());
        dispatch(getVariantData())
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
        setUpdate(false);
    };

    const handleClose = () => {
        setOpen(false);
        setUpdate(false);
        setDynamicFields([]);
        formik.resetForm();
    };

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            additionalFields: Object.entries(data.attributes).map(([key, value]) => ({ key, value })),
        });
        setOpen(true);
        setUpdate(true);
        setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
    };

    const handleDelete = (id) => {
        dispatch(handleRemove(id));
    };

    const variantSchema = object({
        is_active: boolean(),
        subcategory_id: string().required('Subcategory is required'),
        category_id: string().required('Category is required'),
        product_id: string().required('Product is required'),
    });

    const formik = useFormik({
        initialValues: {
            is_active: true,
            subcategory_id: '',
            category_id: '',
            product_id: '',
            additionalFields: [],
        },
        validationSchema: variantSchema,
        onSubmit: (values, { resetForm }) => {
            const attributes = values.additionalFields.reduce((acc, field) => {
                acc[field.key] = field.value;
                console.log(acc);
                console.log(field);
                return acc;
            });

            console.log(attributes);

            const variantData = {
                ...values,
                attributes,
            };

            if (update) {
                dispatch(handleUpdateData(variantData));
            } else {
                dispatch(handleAdd(variantData));
            }
            resetForm();
            handleClose();
        },
    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = formik;

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const columns = [
        { field: 'is_active', headerName: 'Active', width: 90, renderCell: (params) => (params.value ? 'Yes' : 'No') },
        {
            field: 'category_id', headerName: 'Category', width: 130,
            renderCell: (params) => {
                const category = categories.find((v) => v._id === params.row.category_id);
                return category ? category.name : '';
            }
        },
        {
            field: 'subcategory_id', headerName: 'Subcategory', width: 130,
            renderCell: (params) => {
                const subcategory = subcategories.find((v) => v._id === params.row.subcategory_id);
                return subcategory ? subcategory.name : '';
            }
        },
        {
            field: 'product_id', headerName: 'Product', width: 130,
            renderCell: (params) => {
                const product = products.find((v) => v._id === params.row.product_id);
                return product ? product.name : '';
            }
        },
        {
            field: 'attributes', headerName: 'Attributes', width: 400,
            renderCell: (params) => {
                const attributes = params.row.attributes;
                return attributes ? Object.entries(attributes).map(([key, value]) => `${key}: ${value}`).join(', ') : '';
            }
        },
        {
            field: 'Action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row._id)}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <>
            <div>
                <Button variant="contained" onClick={handleClickOpen}>
                    Add Variant
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>{update ? 'Edit Variant' : 'Add Variant'}</DialogTitle>
                    <form onSubmit={handleSubmit}>
                        <DialogContent>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="category-select-label">Category</InputLabel>
                                <Select
                                    labelId="category-select-label"
                                    id="category-select"
                                    name="category_id"
                                    value={values.category_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {categories.map((v) => (
                                        <MenuItem key={v._id} value={v._id}>
                                            {v.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {touched.category_id && errors.category_id ? (
                                    <div>{errors.category_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="subcategory-select-label">Subcategory</InputLabel>
                                <Select
                                    labelId="subcategory-select-label"
                                    id="subcategory-select"
                                    name="subcategory_id"
                                    value={values.subcategory_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        subcategories.filter((v) => v.categoriesid === values.category_id)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.subcategory_id && errors.subcategory_id ? (
                                    <div>{errors.subcategory_id}</div>
                                ) : null}
                            </FormControl>
                            <FormControl fullWidth margin="dense">
                                <InputLabel id="product-select-label">Product</InputLabel>
                                <Select
                                    labelId="product-select-label"
                                    id="product-select"
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                >
                                    {
                                        products.filter((v) => v.subcategory_id === values.subcategory_id)
                                            .map((v) => (
                                                <MenuItem key={v._id} value={v._id}>
                                                    {v.name}
                                                </MenuItem>
                                            ))
                                    }
                                </Select>
                                {touched.product_id && errors.product_id ? (
                                    <div>{errors.product_id}</div>
                                ) : null}
                            </FormControl>
                            <div>
                                {dynamicFields.map((f, i) => (
                                    <div key={i} >
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}].key`}
                                            name={`additionalFields[${i}].key`}
                                            label="Key"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'key')}
                                            value={f.key}
                                        />
                                        <TextField
                                            margin="dense"
                                            id={`additionalFields[${i}].value`}
                                            name={`additionalFields[${i}].value`}
                                            label="Value"
                                            type="text"
                                            fullWidth
                                            variant="standard"
                                            onChange={handleDynamicFieldChange(i, 'value')}
                                            value={f.value}
                                        />
                                        <IconButton onClick={() => removeField(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </div>
                                ))}
                                <Button variant="outlined" onClick={addField}>
                                    Add Field
                                </Button>
                            </div>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button type="submit" variant="contained">
                                {update ? 'Update' : 'Add'}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid
                        getRowId={(row) => row._id}
                        rows={variants}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5, 10, 20]}
                        checkboxSelection
                        disableSelectionOnClick
                    />
                </div>
            </div>
        </>
    );
}

export default Variants;     
