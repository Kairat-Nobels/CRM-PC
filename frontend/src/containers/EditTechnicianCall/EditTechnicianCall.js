import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchOneRepairCall, updateRepairCall } from "../../store/slices/repairCallsSlice";
import { Typography, TextField, Button, MenuItem, Box, Grid } from "@mui/material";
import { useHistory } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditTechnicianCall = ({ match }) => {
    const dispatch = useDispatch();
    const repairCall = useSelector(state => state.repairCalls.repairCall);
    const history = useHistory();
    const [price, setPrice] = useState('');
    const [status, setStatus] = useState('');
    const [problemDescription, setProblemDescription] = useState('');

    useEffect(() => {
        dispatch(fetchOneRepairCall(match.params.id));
    }, [dispatch, match.params.id]);

    useEffect(() => {
        if (repairCall) {
            setPrice(repairCall.price || '');
            setStatus(repairCall.status || '');
            setProblemDescription(repairCall.problemDescription || '');
        }
    }, [repairCall]);

    const submitForm = () => {
        const updatedCall = {
            ...repairCall,
            price,
            status,
            problemDescription
        };
        dispatch(updateRepairCall(updatedCall)).then(() => {
            toast.success('Заявка успешно обновлена!');
            history.push('/admin/call-repair');
        });
    };

    return (
        <div>
            <ToastContainer />
            <Typography textAlign="center" marginBottom="30px" variant="h4">
                Редактировать заявку на вызов ремонтника
            </Typography>
            <Box component="form" sx={{ maxWidth: 600, margin: "0 auto" }}>
                <Grid className='editCallRead' container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Имя клиента:</strong> {repairCall?.name || ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Телефон:</strong> {repairCall?.phone || ''}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" component="div" gutterBottom>
                            <strong>Адрес:</strong> {repairCall?.address || ''}
                        </Typography>
                    </Grid>
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
                            <MenuItem value="on-the-way">В пути</MenuItem>
                            <MenuItem value="failed">Не удалось</MenuItem>
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

export default EditTechnicianCall;
