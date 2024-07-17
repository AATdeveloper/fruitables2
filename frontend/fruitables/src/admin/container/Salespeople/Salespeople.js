import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addSalespeople, editSalespeople, deleteSalespeople, getSalespeople } from '../../../redux/action/salespeople.action';

function Salespeople() {
    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState(false);
    const [editId, setEditId] = useState(null);
    
    const dispatch = useDispatch();
    const salespeople = useSelector((state) => state.Salespeople.salespeople);

    useEffect(() => {
        dispatch(getSalespeople());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setUpdate(false);
        setEditId(null);
    };

    const SalespeopleSchema = object({
        sname: string().required('Sname is required'),
        city: string().required('City is required'),
        comm: string().required('Comm is required'),
    });

    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: '',
        },
        validationSchema: SalespeopleSchema,
        onSubmit: async (values, { resetForm }) => {
            if (update) {
                await dispatch(editSalespeople({ ...values, id: editId }));
            } else {
                await dispatch(addSalespeople(values));
            }
            resetForm();
            handleClose();
        },
    });

    const handleDelete = async (snum) => {
        await dispatch(deleteSalespeople(snum));
    };

    const handleEdit = (data) => {
        formik.setValues(data);
        setUpdate(true);
        setEditId(data.snum);
        setOpen(true);
    };

    const columns = [
        { field: 'sname', headerName: 'SName', width: 150 },
        { field: 'city', headerName: 'City', width: 150 },
        { field: 'comm', headerName: 'Comm', width: 150 },
        {
            field: 'action',
            headerName: 'Action',
            width: 150,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={() => handleEdit(params.row)}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(params.row.snum)}>
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Salespeople
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Salespeople</DialogTitle>
                <form onSubmit={formik.handleSubmit}>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="sname"
                            name="sname"
                            label="Sname"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.sname}
                            error={formik.errors.sname && formik.touched.sname}
                            helperText={formik.errors.sname && formik.touched.sname ? formik.errors.sname : ''}
                        />
                        <TextField
                            margin="dense"
                            id="city"
                            name="city"
                            label="City"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.city}
                            error={formik.errors.city && formik.touched.city}
                            helperText={formik.errors.city && formik.touched.city ? formik.errors.city : ''}
                        />
                        <TextField
                            margin="dense"
                            id="comm"
                            name="comm"
                            label="Comm"
                            type="text"
                            fullWidth
                            variant="outlined"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.comm}
                            error={formik.errors.comm && formik.touched.comm}
                            helperText={formik.errors.comm && formik.touched.comm ? formik.errors.comm : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button type="submit">{update ? 'Update' : 'Add'}</Button>
                    </DialogActions>
                </form>
            </Dialog>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    getRowId={(row) => row.snum}
                    rows={salespeople}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </div>
    );
}

export default Salespeople;
