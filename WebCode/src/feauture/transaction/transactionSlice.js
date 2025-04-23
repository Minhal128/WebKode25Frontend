import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching transaction history
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async ({ page = 1, limit = 10, type, search } = {}, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/transactions/history', {
        params: { 
          page, 
          limit,
          type: type !== 'all' ? type : undefined,
          search: search || undefined
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch transactions');
    }
  }
);

// Async thunk for generating invoice
export const generateInvoice = createAsyncThunk(
  'transaction/generateInvoice',
  async (transactionId, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/transactions/invoice', {
        params: { transactionId },
        responseType: 'blob'
      });
      
      // Return both the blob and transaction ID
      return {
        blob: response.data,
        transactionId
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to generate invoice');
    }
  }
);

// Deposit funds
export const depositFunds = createAsyncThunk(
  'transaction/depositFunds',
  async ({ amount, paymentMethod }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/transactions/deposit', {
        amount,
        paymentMethod
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to deposit funds');
    }
  }
);

// Transfer funds
export const transferFunds = createAsyncThunk(
  'transaction/transferFunds',
  async ({ amount, destinationAccount, description }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/transactions/transfer', {
        amount,
        destinationAccount,
        description
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to transfer funds');
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    filteredTransactions: [],
    isLoading: false,
    error: null,
    currentPage: 1,
    totalPages: 1,
    invoice: {
      data: null,
      isGenerating: false,
      error: null,
    },
    deposit: {
      isLoading: false,
      success: false,
      error: null
    },
    transfer: {
      isLoading: false,
      success: false,
      error: null
    }
  },
  reducers: {
    clearInvoiceData: (state) => {
      state.invoice.data = null;
      state.invoice.error = null;
    },
    setFilteredTransactions: (state, action) => {
      state.filteredTransactions = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    resetDepositState: (state) => {
      state.deposit = {
        isLoading: false,
        success: false,
        error: null
      };
    },
    resetTransferState: (state) => {
      state.transfer = {
        isLoading: false,
        success: false,
        error: null
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload.transactions;
        state.filteredTransactions = action.payload.transactions;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Generate invoice
      .addCase(generateInvoice.pending, (state) => {
        state.invoice.isGenerating = true;
        state.invoice.error = null;
      })
      .addCase(generateInvoice.fulfilled, (state, action) => {
        state.invoice.isGenerating = false;
        state.invoice.data = action.payload;
      })
      .addCase(generateInvoice.rejected, (state, action) => {
        state.invoice.isGenerating = false;
        state.invoice.error = action.payload;
      })
      
      // Deposit funds
      .addCase(depositFunds.pending, (state) => {
        state.deposit.isLoading = true;
        state.deposit.error = null;
        state.deposit.success = false;
      })
      .addCase(depositFunds.fulfilled, (state) => {
        state.deposit.isLoading = false;
        state.deposit.success = true;
      })
      .addCase(depositFunds.rejected, (state, action) => {
        state.deposit.isLoading = false;
        state.deposit.error = action.payload;
      })
      
      // Transfer funds
      .addCase(transferFunds.pending, (state) => {
        state.transfer.isLoading = true;
        state.transfer.error = null;
        state.transfer.success = false;
      })
      .addCase(transferFunds.fulfilled, (state) => {
        state.transfer.isLoading = false;
        state.transfer.success = true;
      })
      .addCase(transferFunds.rejected, (state, action) => {
        state.transfer.isLoading = false;
        state.transfer.error = action.payload;
      });
  },
});
export const { 
  clearInvoiceData, 
  setFilteredTransactions,
  resetDepositState,
  resetTransferState,
  setCurrentPage
} = transactionSlice.actions;

// Add this line to create an alias for resetTransferState
export const clearTransferStatus = resetTransferState;

export default transactionSlice.reducer;