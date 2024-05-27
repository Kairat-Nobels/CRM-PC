import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { fetchRepairOrders, deleteRepairOrder } from '../../store/slices/repairOrdersSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminRepair = () => {
    const dispatch = useDispatch();
    const repairOrders = useSelector(state => state.repairOrders.repairOrders);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchRepairOrders());
    }, [dispatch]);

    if (user?.role !== 'admin') {
        return <Redirect to="/" />;
    }

    const handleDelete = async (id) => {
        await dispatch(deleteRepairOrder(id));
        toast.success('Заявка успешно удалена!');
        dispatch(fetchRepairOrders());
    };

    const columns = [
        {
            name: "address",
            label: "Доставка",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value ? "Есть" : "Нет";
                }
            }
        },
        {
            name: "name",
            label: "Имя клиента",
            options: {
                filter: false,
            }
        },
        {
            name: "phone",
            label: "Телефон",
            options: {
                filter: false,
            }
        },
        {
            name: "deviceType",
            label: "Тип устройства",
            options: {
                filter: false,
            }
        },
        {
            name: "problemDescription",
            label: "Описание проблемы",
            options: {
                filter: false,
            }
        },
        {
            name: "price",
            label: "Цена",
            options: {
                filter: false,
            }
        },
        {
            name: "status",
            label: "Статус",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    const statusLabels = {
                        'new': 'Новый',
                        'in-progress': 'В процессе',
                        'completed': 'Завершен',
                        'rejected': 'Отказ'
                    };
                    return statusLabels[value] || value;
                }
            }
        },
        {
            name: "id",
            label: 'Действие',
            options: {
                filter: false,
                empty: true,
                customBodyRender: (value) => {
                    return (
                        <Box display='flex' justifyContent='center'>
                            <Button component={Link} to={"/admin/repair/edit/" + value}><EditSharpIcon /></Button>
                            <Button onClick={() => handleDelete(value)}><DeleteForeverSharpIcon /></Button>
                        </Box>
                    );
                }
            }
        }
    ];

    const options = {
        selectableRows: "none",
        filter: true,
        print: false,
        filterType: 'dropdown',
        responsive: 'standard',
        serverSide: true,
        sort: false,
        rowsPerPage: 10,
        page: 0,
        rowsPerPageOptions: [],
        count: repairOrders?.length,
        onTableChange: (action, tableState) => {
            if (action === 'changePage') {
                dispatch(fetchRepairOrders(`?page=${tableState.page + 1}`));
            }
        },
    };

    return (
        <Box className='AdminRepairPage' width='95%' margin='0 auto'>
            <ToastContainer />
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Заявки на ремонт</Typography>
            </Grid>

            <Box>
                <MUIDataTable
                    title={"Список заявок на ремонт"}
                    columns={columns}
                    options={options}
                    data={repairOrders || []}
                />
            </Box>
        </Box>
    );
};

export default AdminRepair;
