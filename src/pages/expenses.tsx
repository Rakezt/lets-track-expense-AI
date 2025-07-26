import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store/index';
import { fetchExpenses } from '../store/slices/expenseSlice';
import { initSocket } from '../utils/socket';
import AddExpenseModal from '../components/AddExpenseModal';

import Navbar from '../components/Navbar';
import ChartSection from '../components/ChartSection';
import ExpenseTable from '../components/ExpensesTable';
export default function ExpensesPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);
  const expenses = useAppSelector((s) => s.expenses.items);
  const router = useRouter();

  const [range, setRange] = useState<'week' | 'month' | 'year'>('month');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      router.replace('/');
      return;
    }

    const socket = initSocket();

    socket.on('expense:created', () =>
      dispatch(fetchExpenses({ sort: 'amount', order: 'asc', page: 2 }))
    );
    socket.on('expense:updated', () =>
      dispatch(fetchExpenses({ sort: 'amount', order: 'asc', page: 2 }))
    );
    socket.on('expense:deleted', () =>
      dispatch(fetchExpenses({ sort: 'amount', order: 'asc', page: 2 }))
    );

    return () => {
      socket.disconnect();
    };
  }, [token, dispatch, router]);

  // Prepare line chart data

  return (
    <Box>
      <Navbar />
      <Container sx={{ py: 4 }}>
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Typography variant='h4'>Your Expenses</Typography>
          <Button variant='contained' onClick={() => setOpen(true)}>
            Add Expense
          </Button>
        </Box>
        <ChartSection
          range={range}
          expenses={expenses}
          onRangeChange={(r) => setRange(r)}
        />

        <ExpenseTable />

        <AddExpenseModal open={open} onClose={() => setOpen(false)} />
      </Container>
    </Box>
  );
}
