// src/components/ChartSection.tsx
import { Box, Select, MenuItem } from '@mui/material';
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
import { Expense, ExpenseCategory } from '../types/types';

interface ChartSectionProps {
  expenses?: Expense[];
  range: 'week' | 'month' | 'year';
  onRangeChange: (r: 'week' | 'month' | 'year') => void;
}

export default function ChartSection({
  expenses = [],
  range,
  onRangeChange,
}: ChartSectionProps) {
  const chartData = expenses.reduce(
    (acc: { date: string; total: number }[], exp) => {
      const date = dayjs(exp.date).format('YYYY-MM-DD');
      const item = acc.find((i) => i.date === date);
      if (item) item.total += exp.amount;
      else acc.push({ date, total: exp.amount });
      return acc;
    },
    []
  );

  const pieTotals = expenses.reduce((acc: Record<string, number>, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});
  const pieData = Object.entries(pieTotals).map(([name, value]) => ({
    name,
    value,
  }));

  const categoryColors: Record<ExpenseCategory, string> = {
    [ExpenseCategory.FOOD_DINING]: '#FF6384',
    [ExpenseCategory.GROCERIES]: '#36A2EB',
    [ExpenseCategory.TRANSPORTATION]: '#FFCE56',
    [ExpenseCategory.RENT]: '#4BC0C0',
    [ExpenseCategory.HEALTH_MEDICAL]: '#9966FF',
    [ExpenseCategory.ENTERTAINMENT]: '#FF9F40',
    [ExpenseCategory.SHOPPING]: '#C9CBCF',
    [ExpenseCategory.TRAVEL]: '#8AFFC1',
    [ExpenseCategory.EDUCATION]: '#FF6B6B',
    [ExpenseCategory.PERSONAL_CARE]: '#6BFFB8',
    [ExpenseCategory.OTHER]: '#AAAAAA',
  };

  return (
    <Box>
      {/* Charts row */}
      <Box sx={{ display: 'flex', gap: 3, height: 300 }}>
        {/* Line chart */}
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

        {/* Pie chart */}
        <Box flex={1}>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={pieData}
                dataKey='value'
                nameKey='name'
                outerRadius={100}
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={categoryColors[entry.name as ExpenseCategory]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}
