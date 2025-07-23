import { useEffect, useState } from 'react';
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Select,
  MenuItem,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../store/index';
import { fetchExpenses } from '../store/slices/expenseSlice';
import { initSocket, getSocket } from '../utils/socket';
import AddExpenseModal from '../components/AddExpenseModal';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';

export default function ExpensesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const expenses = useAppSelector((s) => s.expenses.items);
  const [range, setRange] = useState('month');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      router.replace('/');
      return;
    }

    dispatch(fetchExpenses());

    const socket = initSocket();
    socket.on('expense:created', () => dispatch(fetchExpenses()));
    socket.on('expense:updated', () => dispatch(fetchExpenses()));
    socket.on('expense:deleted', () => dispatch(fetchExpenses()));

    return () => {
      socket.disconnect();
    };
  }, [session]);

  const chartData = expenses.reduce(
    (acc: { date: string; total: number }[], expense) => {
      const date = dayjs(expense.date).format('YYYY-MM-DD');
      const existing = acc.find((item) => item.date === date);
      if (existing) {
        existing.total += expense.amount;
      } else {
        acc.push({ date, total: expense.amount });
      }
      return acc;
    },
    []
  );

  const pieData = expenses.reduce(
    (acc: { [key: string]: number }, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {} as Record<string, number>
  );

  const pieChartData = Object.entries(pieData).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Container sx={{ py: 4 }}>
      <Box display='flex' justifyContent='space-between' alignItems='center'>
        <Typography variant='h4'>Your Expenses</Typography>
        <Button variant='contained' onClick={() => setOpen(true)}>
          Add Expense
        </Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 3, mt: 4, height: 300 }}>
        <Box flex={1}>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <XAxis dataKey='date' />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type='monotone' dataKey='total' />
            </LineChart>
          </ResponsiveContainer>
        </Box>
        <Box flex={1}>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey='value'
                nameKey='name'
                outerRadius={100}
              >
                {pieChartData.map((_, idx) => (
                  <Cell key={idx} fill={undefined /* MUI will auto-assign */} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>

      <Box sx={{ mt: 2, textAlign: 'right' }}>
        <Select value={range} onChange={(e) => setRange(e.target.value)}>
          {['week', 'month', 'year'].map((r) => (
            <MenuItem key={r} value={r}>
              {r.toUpperCase()}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Table sx={{ mt: 4 }}>
        <TableHead>
          <TableRow>
            {['Date', 'Title', 'Category', 'Amount', 'Actions'].map((h) => (
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell>{new Date(exp.date).toLocaleDateString()}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.amount}</TableCell>
              <TableCell>{/* Edit/Delete buttons */}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <AddExpenseModal open={open} onClose={() => setOpen(false)} />
    </Container>
  );
}
