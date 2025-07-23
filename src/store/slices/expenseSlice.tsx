import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Expense } from '../../types/types';

export const fetchExpenses = createAsyncThunk(
  'expenses/fetchAll',
  async (_, thunkAPI) => {
    const res = await axios.get<Expense[]>('/api/expense');
    return res.data;
  }
);

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: { items: [] as Expense[], status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchExpenses.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'succeeded';
    });
  },
});

export default expensesSlice.reducer;
