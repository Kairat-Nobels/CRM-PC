import React, { useState } from 'react';
import { ThemeProvider } from '@mui/system';
import theme from '../../theme';
import { Stack, TextField, Button, MenuItem, Select, FormControl, InputLabel, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import axios from 'axios';
import { toast } from 'react-toastify';

const RepairPage = () => {
  const [selectedOption, setSelectedOption] = useState('repair');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [deviceType, setDeviceType] = useState('');
  const [problemDescription, setProblemDescription] = useState('');
  const [address, setAddress] = useState('');
  const [comments, setComments] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      name,
      email,
      phone,
      deviceType,
      problemDescription,
      address,
      comments,
    };

    try {
      if (selectedOption === 'repair' || selectedOption === 'pickup-repair') {
        await axios.post('https://05e558db2c5f94f2.mokky.dev/repair-orders', requestData);
      } else if (selectedOption === 'admin-call') {
        await axios.post('https://05e558db2c5f94f2.mokky.dev/repair-calls', requestData);
      }
      // Reset form fields
      setName('');
      setEmail('');
      setPhone('');
      setDeviceType('');
      setProblemDescription('');
      setAddress('');
      setComments('');
      toast.success('Заявка успешно отправлена!');
    } catch (error) {
      console.error('Error submitting request:', error);
      toast.error('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте снова.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <h2 className="title">Заявка на ремонт</h2>
        <FormControl style={{marginTop: '20px', marginBottom: '20px'}} component="fieldset">
          <RadioGroup row aria-label="repair-option" name="repair-option" value={selectedOption} onChange={handleOptionChange}>
            <FormControlLabel value="repair" control={<Radio />} label="Ремонт" />
            <FormControlLabel value="pickup-repair" control={<Radio />} label="Ремонт с доставкой" />
            <FormControlLabel value="admin-call" control={<Radio />} label="Вызов ремонтника ПК" />
          </RadioGroup>
        </FormControl>
        <Stack component="form" onSubmit={handleSubmit} spacing={2} sx={{
            width: { xs: '100%', md: '50%' },
            margin: '0 auto',
          }}>
          <TextField label="Имя" value={name} onChange={(e) => setName(e.target.value)} required />
          <TextField label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <TextField label="Телефон" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          <FormControl fullWidth required>
            <InputLabel id="device-type-label">Тип устройства</InputLabel>
            <Select
              labelId="device-type-label"
              value={deviceType}
              onChange={(e) => setDeviceType(e.target.value)}
            >
              <MenuItem value="Ноутбук">Ноутбук</MenuItem>
              <MenuItem value="ПК">ПК</MenuItem>
              <MenuItem value="Смартфон">Смартфон</MenuItem>
              <MenuItem value="Планшет">Планшет</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Описание проблемы"
            multiline
            rows={4}
            value={problemDescription}
            onChange={(e) => setProblemDescription(e.target.value)}
            required
          />
          {selectedOption === 'pickup-repair' && (
            <TextField label="Адрес для доставки" value={address} onChange={(e) => setAddress(e.target.value)} required />
          )}
          {selectedOption === 'admin-call' && (
            <TextField label="Адрес для визита администратора" value={address} onChange={(e) => setAddress(e.target.value)} required />
          )}
          <TextField
            label="Комментарии"
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary">Отправить заявку</Button>
        </Stack>
      </div>
    </ThemeProvider>
  );
};

export default RepairPage;
