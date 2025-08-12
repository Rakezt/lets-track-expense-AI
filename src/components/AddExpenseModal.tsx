import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import dayjs from 'dayjs';
import api from '../utils/axios';
import { useAppDispatch } from '../store/index';
import { fetchExpenses } from '../store/slices/expenseSlice';
import { ExpenseCategory, PaymentMode } from '../types/types';

export default function AddExpenseModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose(): void;
}) {
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<string>(dayjs().format('YYYY-MM-DD'));
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<ExpenseCategory>(
    ExpenseCategory.OTHER
  );
  const [paymentMode, setPaymentMode] = useState<PaymentMode>(PaymentMode.CASH);
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    if (amount === '') return;

    try {
      const payload = {
        date: dayjs(date).toISOString(),
        amount: Number(amount),
        category,
        paymentMode,
        description: description || undefined,
      };

      await api.post('/api/expense', payload);
      await dispatch(fetchExpenses({ sort: 'date', order: 'desc', page: 1 }));
      onClose();
    } catch (err) {
      console.error('Failed to save expense:', err);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={(theme) => ({
          width: 400,
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
          New Expense
        </Typography>

        <TextField
          fullWidth
          label='Date'
          type='date'
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{ mb: 2 }}
          InputLabelProps={{ shrink: true }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id='category-label'>Category</InputLabel>
          <Select
            labelId='category-label'
            value={category}
            label='Category'
            onChange={(e) => setCategory(e.target.value as ExpenseCategory)}
          >
            {Object.values(ExpenseCategory).map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id='payment-label'>Payment Mode</InputLabel>
          <Select
            labelId='payment-label'
            value={paymentMode}
            label='Payment Mode'
            onChange={(e) => setPaymentMode(e.target.value as PaymentMode)}
          >
            {Object.values(PaymentMode).map((mode) => (
              <MenuItem key={mode} value={mode}>
                {mode}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          fullWidth
          label='Amount'
          type='number'
          value={amount}
          onChange={(e) =>
            setAmount(e.target.value === '' ? '' : +e.target.value)
          }
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label='Description (optional)'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Box textAlign='right'>
          <Button onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant='contained' onClick={handleSubmit}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
