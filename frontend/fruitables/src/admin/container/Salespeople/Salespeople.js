import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { boolean, object, string } from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@mui/x-data-grid';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addSalespeople, editSalespeople, deleteSalespeople, getSalespeople } from '../../../redux/action/salespeople.action';
import Switch from '@mui/material/Switch';
import { FormControlLabel, styled } from '@mui/material';

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
        IsActive: string().required('Status is required'),
    });



    const formik = useFormik({
        initialValues: {
            sname: '',
            city: '',
            comm: '',
            IsActive: 1,
        },
        validationSchema: SalespeopleSchema,
        onSubmit: async (values, { resetForm }) => {
            if (update) {
                dispatch(editSalespeople({ ...values, id: editId }));
            } else {
                dispatch(addSalespeople(values));
            }
            resetForm();
            handleClose();
        },
    });

    const handleDelete = async (snum) => {
        dispatch(deleteSalespeople(snum));
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
            field: 'IsActive', headerName: 'Status', width: 80, renderCell: (params) => (
                <Android12Switch
                    checked={params.row.IsActive}
                    disabled
                />
            )
        },
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



    // const [checked, setChecked] = React.useState(true);


    const { handleSubmit, handleChange, handleBlur, errors, values, touched, setFieldValue } = formik;


    // const handleChange = (event) => {
    //     setChecked(event.target.checked);
    // };


    const Android12Switch = styled(Switch)(({ theme }) => ({
        padding: 8,
        '& .MuiSwitch-track': {
            borderRadius: 22 / 2,
            '&::before, &::after': {
                content: '""',
                position: 'absolute',
                top: '50%',
                transform: 'translateY(-50%)',
                width: 16,
                height: 16,
            },
            '&::before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                left: 12,
            },
            '&::after': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    theme.palette.getContrastText(theme.palette.primary.main),
                )}" d="M19,13H5V11H19V13Z" /></svg>')`,
                right: 12,
            },
        },
        '& .MuiSwitch-thumb': {
            boxShadow: 'none',
            width: 16,
            height: 16,
            margin: 2,
        },
    }));

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


                        <FormControlLabel
                            name='IsActive'
                            control={
                                <Android12Switch
                                    checked={values.IsActive === 1}
                                    onChange={() => formik.setFieldValue('IsActive', values.IsActive === 1 ? 0 : 1)}
                                />
                            }

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