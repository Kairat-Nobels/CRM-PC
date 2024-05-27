import React, { useEffect } from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import MUIDataTable from "mui-datatables";
import EditSharpIcon from "@mui/icons-material/EditSharp";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import { fetchRepairCalls, deleteRepairCall } from '../../store/slices/repairCallsSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminCallRepair = () => {
    const dispatch = useDispatch();
    const repairCalls = useSelector(state => state.repairCalls.repairCalls);
    const user = useSelector(state => state.users.user);

    useEffect(() => {
        dispatch(fetchRepairCalls());
    }, [dispatch]);

    if (user?.role !== 'admin') {
        return <Redirect to="/" />;
    }

    const handleDeleteRepairCall = async (id) => {
        await dispatch(deleteRepairCall(id));
        toast.success('Заявка успешно удалена!');
        dispatch(fetchRepairCalls());
    };

    const columns = [
        {
            name: "address",
            label: "Адрес",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return value ? value : "Нет";
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
                        'rejected': 'Отказ',
                        'on-the-way': 'В пути',
                        'failed': 'Не удалось'
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
                            <Button component={Link} to={`/admin/call-repair/edit/${value}`}><EditSharpIcon /></Button>
                            <Button onClick={() => handleDeleteRepairCall(value)}><DeleteForeverSharpIcon /></Button>
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
        count: repairCalls?.length,
        onTableChange: (action, tableState) => {
            if (action === 'changePage') {
                dispatch(fetchRepairCalls(`?page=${tableState.page + 1}`));
            }
        },
    };

    return (
        <Box className='AdminRepairPage' width='95%' margin='0 auto'>
            <ToastContainer />
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Заявки на ремонт и вызовы ремонтников</Typography>
            </Grid>

            <Box>
                <MUIDataTable
                    title={"Список заявок на ремонт и вызовов ремонтников"}
                    columns={columns}
                    options={options}
                    data={repairCalls || []}
                />
            </Box>
        </Box>
    );
};

export default AdminCallRepair;
