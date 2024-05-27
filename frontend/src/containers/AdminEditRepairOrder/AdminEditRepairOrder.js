import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchOneRepairOrder, updateRepairOrder } from "../../store/slices/repairOrdersSlice";
import { Typography, TextField, Button, MenuItem, Box, Grid } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminEditRepairOrder = ({ match }) => {
    const dispatch = useDispatch();
    const repairOrder = useSelector(state => state.repairOrders.repairOrder);
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [problemDescription, setProblemDescription] = useState('');
    const history = useHistory();

    useEffect(() => {
        dispatch(fetchOneRepairOrder(match.params.id));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (repairOrder) {
            setPrice(repairOrder.price || '');
            setStatus(repairOrder.status || '');
            setProblemDescription(repairOrder.problemDescription || '');
        }
    }, [repairOrder]);

    const submitForm = async () => {
        const updatedOrder = {
            ...repairOrder,
            price,
            status,
            problemDescription
        };
        await dispatch(updateRepairOrder(updatedOrder));
        toast.success('Заявка успешно обновлена!');
        history.push('/admin/repair');
    };

    return (
        <div>
            <ToastContainer />
            <Typography textAlign="center" marginBottom="30px" variant="h4">
                Редактировать заявку на ремонт
            </Typography>
            <Box component="form" sx={{ maxWidth: 600, margin: "0 auto" }}>
                <Grid className='editOrderRead' container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Имя клиента:</strong> {repairOrder?.name || ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Телефон:</strong> {repairOrder?.phone || ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Тип устройства:</strong> {repairOrder?.deviceType || ''}
                        </Typography>
                    </Grid>
                    {repairOrder?.address?.length > 0 &&
                        <Grid item xs={12}>
                            <Typography variant="body1" component="div" gutterBottom>
                                <strong>Адрес:</strong> {repairOrder?.address}
                            </Typography>
                        </Grid>
                    }
                    <Grid item xs={12}>
                        <TextField
                            label="Описание проблемы"
                            value={problemDescription}
                            onChange={(e) => setProblemDescription(e.target.value)}
                            fullWidth
                            margin="normal"
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Цена"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            fullWidth
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            select
                            label="Статус"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            fullWidth
                            margin="normal"
                        >
                            <MenuItem value="new">Новый</MenuItem>
                            <MenuItem value="in-progress">В процессе</MenuItem>
                            <MenuItem value="completed">Завершен</MenuItem>
                            <MenuItem value="rejected">Отказ</MenuItem>
                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" color="primary" onClick={submitForm}>
                            Сохранить
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};

export default AdminEditRepairOrder;
