import { useEffect, useState } from 'react';
import { Container, Box, Typography, Button } from '@mui/material';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store/index';
import { fetchAllExpenses, fetchExpenses } from '../store/slices/expenseSlice';
import { initSocket } from '../utils/socket';
import AddExpenseModal from '../components/AddExpenseModal';

import Navbar from '../components/Navbar';
import ChartSection from '../components/ChartSection';
import ExpenseTable from '../components/ExpensesTable';
import AiSummaryModal from '../components/AISummaryModal';
import AiSummaryFab from '../components/AISummaryFab';
export default function ExpensesPage() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((s) => s.auth.token);

  const allExpenses = useAppSelector((s) => s.expenses.allItems);
  const router = useRouter();

  const [range, setRange] = useState<'week' | 'month' | 'year'>('month');
  const [open, setOpen] = useState(false);
  const [openAi, setOpenAi] = useState(false);

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

  useEffect(() => {
    dispatch(fetchAllExpenses());
  }, [dispatch]);

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
          expenses={allExpenses}
          onRangeChange={(r) => setRange(r)}
        />

        <ExpenseTable />

        <AddExpenseModal open={open} onClose={() => setOpen(false)} />
        <AiSummaryModal open={openAi} onClose={() => setOpenAi(false)} />
        <AiSummaryFab onClick={() => setOpenAi(true)} />
      </Container>
    </Box>
  );
}
