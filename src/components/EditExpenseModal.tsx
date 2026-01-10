import { useEffect, useState } from 'react';
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../utils/axios';
import { useAppDispatch } from '../store';
import { fetchExpenses } from '../store/slices/expenseSlice';
import dayjs from 'dayjs';

export default function EditExpenseModal({
  open,
  onClose,
  expense,
}: {
  open: boolean;
  onClose(): void;
  expense: any;
}) {
  const dispatch = useAppDispatch();
  const [form, setForm] = useState({
    date: expense?.date ? dayjs(expense.date).format('YYYY-MM-DD') : '',
    category: expense?.category ?? '',
    amount: expense?.amount ?? '',
    description: expense?.description ?? '',
  });

  useEffect(() => {
    setForm({
      date: expense?.date ? dayjs(expense.date).format('YYYY-MM-DD') : '',
      category: expense?.category ?? '',
      amount: expense?.amount ?? '',
      description: expense?.description ?? '',
    });
  }, [expense]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        date: dayjs(form.date).toISOString(),
        amount: Number(form.amount),
      };
      await api.put(`/api/expenses/${expense._id}`, payload);
      await dispatch(fetchExpenses({ sort: 'date', order: 'desc', page: 1 }));
      onClose();
    } catch (err) {
      console.error('Failed to update expense', err);
    }
  };

  const handleDelete = async () => {
    try {
      await api.delete(`/api/expenses/${expense._id}`);
      await dispatch(fetchExpenses({ sort: 'date', order: 'desc', page: 1 }));
      onClose();
    } catch (err) {
      console.error('Failed to delete expense', err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={(theme) => ({
          width: 500,
          maxWidth: '90%',
          p: 4,
          bgcolor: 'background.paper',
          color: 'text.primary',
          mx: 'auto',
          mt: 10,
          borderRadius: 2,
          boxShadow: 24,
          position: 'relative',
        })}
      >
        {/* Close (X) Button */}
        <IconButton
          aria-label='close'
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'text.secondary',
          }}
          size='large'
        >
          <CloseIcon />
        </IconButton>

        <Typography variant='h6' gutterBottom>
          Edit Expense
        </Typography>

        <Stack spacing={2}>
          <TextField
            label='Date'
            type='date'
            name='date'
            value={form.date}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            label='Category'
            name='category'
            value={form.category}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label='Amount'
            type='number'
            name='amount'
            value={form.amount}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label='Description'
            name='description'
            value={form.description}
            onChange={handleChange}
            fullWidth
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
