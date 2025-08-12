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
  expenses?: Expense[] | any; // can be array or something (defensive)
  range: 'week' | 'month' | 'year';
  onRangeChange: (r: 'week' | 'month' | 'year') => void;
}

export default function ChartSection({
  expenses = [],
  range,
  onRangeChange,
}: ChartSectionProps) {
  // Defensive: ensure we have an array
  const allExpenses: Expense[] = Array.isArray(expenses)
    ? expenses
    : Array.isArray(expenses?.data)
      ? expenses.data
      : [];

  // 1) Filter by range
  const filtered = allExpenses.filter((exp) => {
    if (!exp || !exp.date) return false;
    const d = dayjs(exp.date);
    if (range === 'week')
      return d.isAfter(dayjs().subtract(7, 'day').startOf('day'));
    if (range === 'month')
      return d.isAfter(dayjs().subtract(1, 'month').startOf('day'));
    if (range === 'year')
      return d.isAfter(dayjs().subtract(1, 'year').startOf('day'));
    return true;
  });

  // 2) Choose date key format depending on range
  const dateKeyFormat = range === 'year' ? 'YYYY-MM' : 'YYYY-MM-DD';

  // 3) Build line chart data (group by dateKeyFormat)
  const lineMap: Record<string, number> = {};
  filtered.forEach((exp) => {
    const key = dayjs(exp.date).format(dateKeyFormat);
    lineMap[key] = (lineMap[key] || 0) + Number(exp.amount || 0);
  });

  // Convert to sorted array for chart
  const chartData = Object.entries(lineMap)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  // If no data for the selected range, optionally populate zeros for last N days/months
  if (chartData.length === 0) {
    if (range === 'week') {
      const arr = Array.from({ length: 7 }).map((_, i) => {
        const d = dayjs()
          .subtract(6 - i, 'day')
          .format('YYYY-MM-DD');
        return { date: d, total: 0 };
      });
      // replace chartData
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      chartData.push(...arr);
    } else if (range === 'month') {
      // last 30 days
      const arr = Array.from({ length: 30 }).map((_, i) => {
        const d = dayjs()
          .subtract(29 - i, 'day')
          .format('YYYY-MM-DD');
        return { date: d, total: 0 };
      });
      // @ts-ignore
      chartData.push(...arr);
    } else if (range === 'year') {
      // last 12 months
      const arr = Array.from({ length: 12 }).map((_, i) => {
        const d = dayjs()
          .subtract(11 - i, 'month')
          .format('YYYY-MM');
        return { date: d, total: 0 };
      });
      // @ts-ignore
      chartData.push(...arr);
    }
  }

  // 4) Pie chart (category totals) based on same filtered data
  const pieTotals = filtered.reduce((acc: Record<string, number>, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount || 0);
    return acc;
  }, {});
  const pieData = Object.entries(pieTotals).map(([name, value]) => ({
    name,
    value,
  }));

  // 5) Category color map (keeps your mapping)
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
      {/* Range selector */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Select
          value={range}
          onChange={(e) =>
            onRangeChange(e.target.value as 'week' | 'month' | 'year')
          }
          size='small'
        >
          <MenuItem value='week'>WEEK</MenuItem>
          <MenuItem value='month'>MONTH</MenuItem>
          <MenuItem value='year'>YEAR</MenuItem>
        </Select>
      </Box>

      {/* Charts row */}
      <Box sx={{ display: 'flex', gap: 3, height: 340 }}>
        {/* Line chart */}
        <Box flex={1}>
          <ResponsiveContainer width='100%' height='100%'>
            <LineChart data={chartData}>
              <XAxis dataKey='date' tick={{ fontSize: 12 }} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type='monotone'
                dataKey='total'
                stroke='#1976d2'
                strokeWidth={2}
                dot={false}
              />
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
                innerRadius={30}
              >
                {pieData.map((entry) => (
                  <Cell
                    key={entry.name}
                    fill={
                      categoryColors[entry.name as ExpenseCategory] || '#ccc'
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign='bottom' />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </Box>
  );
}
