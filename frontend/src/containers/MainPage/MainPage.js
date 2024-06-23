import React, { useState } from "react";
import theme from "../../theme";
import { Stack, TextField, Button, Box } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import CategoryBar from "../../components/CategoryBar/CategoryBar";
import Products from "../../components/Products/Products";
import axios from 'axios';
import { toast } from 'react-toastify';

const MainPage = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [comments, setComments] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const requestData = {
            name,
            phone,
            email,
            comments,
        };

        try {
            await axios.post('https://05e558db2c5f94f2.mokky.dev/faq', requestData);
            // Reset form fields
            setName('');
            setPhone('');
            setEmail('');
            setComments('');
            toast.success('Сообщение успешно отправлено!');
        } catch (error) {
            console.error('Error submitting request:', error);
            toast.error('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте снова.');
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Stack>
                <h2 className="title title-main">Последние поступления</h2>
                <CategoryBar />
                <Products />
                <Box component="form" onSubmit={handleSubmit} sx={{
                    width: { xs: '100%', md: '50%' },
                    margin: '20px auto',
                    padding: '20px',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: '#f9f9f9'
                }}>
                    <h2 style={{marginBottom: "20px", textAlign: "center"}} className="title">Техподдержка</h2>
                    <TextField 
                        label="Имя" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                        required 
                        fullWidth 
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField 
                        label="Телефон" 
                        placeholder="996555111888"
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)} 
                        required 
                        fullWidth 
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField 
                        label="Email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        fullWidth 
                        sx={{ marginBottom: '10px' }}
                    />
                    <TextField 
                        label="Комментарии" 
                        multiline 
                        rows={4} 
                        value={comments} 
                        onChange={(e) => setComments(e.target.value)} 
                        required 
                        fullWidth 
                        sx={{ marginBottom: '10px' }}
                    />
                    <Button style={{margin: "20px auto", display: "flex", justifyContent: "center"}} type="submit" variant="contained" color="primary">Отправить</Button>
                </Box>
            </Stack>
        </ThemeProvider>
    );
};

export default MainPage;
