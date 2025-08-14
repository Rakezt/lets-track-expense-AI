import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Expense } from '../../types/types';
import api from '../../utils/axios';

interface FetchParams {
  sort?: string;
  order?: 'asc' | 'desc';
  page?: number;
}

interface ExpensesState {
  items: Expense[];
  allItems: Expense[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  allstatus: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  total: number;
  page: number;
  totalPages: number;
}

const initialState: ExpensesState = {
  items: [],
  allItems: [],
  status: 'idle',
  allstatus: 'idle',
  error: null,
  total: 0,
  page: 1,
  totalPages: 1,
};

export const fetchExpenses = createAsyncThunk<
  { data: Expense[]; total: number; page: number; totalPages: number },
  FetchParams
>('expenses/fetchPaginated', async (params = {}, thunkAPI) => {
  const { sort = 'date', order = 'desc', page = 1 } = params;
  const limit = 10;
  const response = await api.get<{
    data: Expense[];
    total: number;
    page: number;
    totalPages: number;
  }>(`/api/expense?sort=${sort}&order=${order}&page=${page}&limit=${limit}`);
  return response.data;
});

export const fetchAllExpenses = createAsyncThunk<Expense[]>(
  'expenses/fetchAll',
  async () => {
    const response = await api.get('/api/expense');
    if (Array.isArray(response.data)) return response.data;
    if (response.data && Array.isArray(response.data.data))
      return response.data.data;
    return [];
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(
        fetchExpenses.fulfilled,
        (
          state,
          action: PayloadAction<{
            data: Expense[];
            total: number;
            page: number;
            totalPages: number;
          }>
        ) => {
          state.status = 'succeeded';
          state.items = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.totalPages = action.payload.totalPages;
        }
      )
      .addCase(fetchExpenses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch expenses';
      });
    builder
      .addCase(fetchAllExpenses.pending, (state) => {
        state.allstatus = 'loading';
        state.error = null;
      })
      .addCase(
        fetchAllExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.allstatus = 'succeeded';
          state.allItems = action.payload;
        }
      )
      .addCase(fetchAllExpenses.rejected, (state, action) => {
        state.allstatus = 'failed';
        state.error = action.error.message || 'Failed to fetch all expenses';
      });
  },
});

export default expensesSlice.reducer;
