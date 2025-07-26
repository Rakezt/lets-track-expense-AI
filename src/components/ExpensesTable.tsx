import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Select,
  MenuItem,
  Pagination,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { fetchExpenses } from '../store/slices/expenseSlice';

type SortOption = {
  value: string;
  label: string;
  sort: string;
  order: 'asc' | 'desc';
};

const sortOptions: SortOption[] = [
  { value: 'date_desc', label: 'Date (Newest)', sort: 'date', order: 'desc' },
  { value: 'date_asc', label: 'Date (Oldest)', sort: 'date', order: 'asc' },
  {
    value: 'category_asc',
    label: 'Category (A-Z)',
    sort: 'category',
    order: 'asc',
  },
  {
    value: 'category_desc',
    label: 'Category (Z-A)',
    sort: 'category',
    order: 'desc',
  },
  {
    value: 'amount_desc',
    label: 'Amount (High → Low)',
    sort: 'amount',
    order: 'desc',
  },
  {
    value: 'amount_asc',
    label: 'Amount (Low → High)',
    sort: 'amount',
    order: 'asc',
  },
];

export default function ExpenseTable() {
  const dispatch = useAppDispatch();
  const { items: expenses, total, page } = useAppSelector((s) => s.expenses);

  const [selectedSort, setSelectedSort] = useState<SortOption>(sortOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(
      fetchExpenses({
        sort: selectedSort.sort,
        order: selectedSort.order,
        page: currentPage,
      })
    );
  }, [selectedSort, currentPage, dispatch]);

  const handleSortChange = (e: any) => {
    const newSort = sortOptions.find((s) => s.value === e.target.value)!;
    setSelectedSort(newSort);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(total / 10);

  return (
    <Box mt={4}>
      <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        mb={2}
      >
        <Typography variant='h6'>Expense History</Typography>
        <Select
          value={selectedSort.value}
          onChange={handleSortChange}
          size='small'
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Table>
        <TableHead>
          <TableRow>
            {['Date', 'Category', 'Amount', 'Description'].map((h) => (
              <TableCell key={h}>{h}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((exp) => (
            <TableRow key={exp._id}>
              <TableCell>{dayjs(exp.date).format('MM/DD/YYYY')}</TableCell>
              <TableCell>{exp.category}</TableCell>
              <TableCell>{exp.amount.toFixed(2)}</TableCell>
              <TableCell>{exp.description ?? 'Not Available'}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <Box display='flex' justifyContent='center' mt={2}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
          />
        </Box>
      )}
    </Box>
  );
}
