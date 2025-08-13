import {
  Box,
  Select,
  MenuItem,
  ButtonGroup,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
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
import { useState } from 'react';
import { Expense, ExpenseCategory } from '../types/types';

interface ChartSectionProps {
  expenses?: Expense[] | any;
  range: 'week' | 'month' | 'year';
  onRangeChange: (r: 'week' | 'month' | 'year') => void;
}

export default function ChartSection({
  expenses = [],
  range,
  onRangeChange,
}: ChartSectionProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [chartType, setChartType] = useState<'pie' | 'line'>('pie');
  const allExpenses: Expense[] = Array.isArray(expenses)
    ? expenses
    : Array.isArray(expenses?.data)
      ? expenses.data
      : [];

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

  const dateKeyFormat = range === 'year' ? 'YYYY-MM' : 'YYYY-MM-DD';

  const lineMap: Record<string, number> = {};
  filtered.forEach((exp) => {
    const key = dayjs(exp.date).format(dateKeyFormat);
    lineMap[key] = (lineMap[key] || 0) + Number(exp.amount || 0);
  });

  const chartData = Object.entries(lineMap)
    .map(([date, total]) => ({ date, total }))
    .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));

  const pieTotals = filtered.reduce((acc: Record<string, number>, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + Number(exp.amount || 0);
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
      {/* Range Selector */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: 2,
          alignItems: 'center',
        }}
      >
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

        {isMobile && (
          <ButtonGroup variant='outlined' size='small'>
            <Button
              variant={chartType === 'pie' ? 'contained' : 'outlined'}
              onClick={() => setChartType('pie')}
            >
              Pie
            </Button>
            <Button
              variant={chartType === 'line' ? 'contained' : 'outlined'}
              onClick={() => setChartType('line')}
            >
              Line
            </Button>
          </ButtonGroup>
        )}
      </Box>

      {/* Charts */}
      {isMobile ? (
        <Box height={340}>
          {chartType === 'pie' ? (
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
          ) : (
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
          )}
        </Box>
      ) : (
        <Box sx={{ display: 'flex', gap: 3, height: 340 }}>
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
      )}
    </Box>
  );
}
