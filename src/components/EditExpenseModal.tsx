import { useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
} from '@mui/material';
import api from '../utils/axios';
import { useAppDispatch } from '../store';
import { fetchExpenses } from '../store/slices/expenseSlice';

export default function EditExpenseModal({ open, onClose, expense }: any) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    date: expense.date || '',
    category: expense.category || '',
    amount: expense.amount || '',
    description: expense.description || '',
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    await api.put(`/api/expense/${expense._id}`, form);
    dispatch(fetchExpenses({}));
    onClose();
  };

  const handleDelete = async () => {
    await api.delete(`/api/expense/${expense._id}`);
    dispatch(fetchExpenses({}));
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          backgroundColor: '#fff',
          padding: 4,
          borderRadius: 2,
          maxWidth: 500,
          margin: '100px auto',
        }}
      >
        <Typography variant='h6' gutterBottom>
          Edit Expense
        </Typography>

        <Stack spacing={2}>
          <TextField
            label='Date'
            type='date'
            name='date'
            value={form.date.slice(0, 10)}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label='Category'
            name='category'
            value={form.category}
            onChange={handleChange}
          />
          <TextField
            label='Amount'
            type='number'
            name='amount'
            value={form.amount}
            onChange={handleChange}
          />
          <TextField
            label='Description'
            name='description'
            value={form.description}
            onChange={handleChange}
          />

          <Stack direction='row' spacing={2} justifyContent='space-between'>
            <Button variant='contained' color='primary' onClick={handleSave}>
              Save
            </Button>
            <Button variant='outlined' color='error' onClick={handleDelete}>
              Delete
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
