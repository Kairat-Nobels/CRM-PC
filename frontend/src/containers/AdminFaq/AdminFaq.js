import React, { useEffect, useState } from 'react';
import { Box, Button, Grid, Typography } from "@mui/material";
import MUIDataTable from "mui-datatables";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminFaq = () => {
    const [faqQuestions, setFaqQuestions] = useState([]);

    useEffect(() => {
        const fetchFaqQuestions = async () => {
            const response = await axios.get('https://05e558db2c5f94f2.mokky.dev/faq');
            setFaqQuestions(response.data);
        };

        fetchFaqQuestions();
    }, []);

    const handleDeleteFaqQuestion = async (id) => {
        try {
            await axios.delete(`https://05e558db2c5f94f2.mokky.dev/faq/${id}`);
            toast.success('Вопрос успешно удален!');
            setFaqQuestions(faqQuestions.filter(question => question.id !== id));
        } catch (error) {
            console.error('Error deleting FAQ question:', error);
            toast.error('Произошла ошибка при удалении вопроса. Пожалуйста, попробуйте снова.');
        }
    };

    const columns = [
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
            name: "email",
            label: "Email",
            options: {
                filter: false,
            }
        },
        {
            name: "comments",
            label: "Комментарии",
            options: {
                filter: false,
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
                            <Button onClick={() => handleDeleteFaqQuestion(value)}><DeleteForeverSharpIcon /></Button>
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
        rowsPerPage: 10,
        page: 0,
        rowsPerPageOptions: [],
        count: faqQuestions.length,
    };

    return (
        <Box className='AdminFaqPage' width='95%' margin='0 auto'>
            <ToastContainer />
            <Grid display='flex' justifyContent='space-between' alignItems='center' marginY='30px'>
                <Typography variant='h5'>Вопросы техподдержки</Typography>
            </Grid>

            <Box>
                <MUIDataTable
                    title={"Список вопросов техподдержки"}
                    columns={columns}
                    options={options}
                    data={faqQuestions}
                />
            </Box>
        </Box>
    );
};

export default AdminFaq;
