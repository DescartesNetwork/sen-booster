import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */

export type FilterOrderState = {
  token: string
  time: string
  status: string
}

/**
 * Store constructor
 */

const NAME = 'orderFilter'
const initialState: FilterOrderState = {
  token: '',
  time: '',
  status: '',
}

/**
 * Actions
 */

export const setTokenFilter = createAsyncThunk(
  `${NAME}/setTokenFilter`,
  async (token: string) => {
    return {
      token,
    }
  },
)

export const setTimeFilter = createAsyncThunk(
  `${NAME}/setTimeFilter`,
  async (time: string) => {
    return {
      time,
    }
  },
)

export const setStatusFilter = createAsyncThunk(
  `${NAME}/setStatusFilter`,
  async (status: string) => {
    return {
      status,
    }
  },
)

export const resetFilter = createAsyncThunk(`${NAME}/resetFilter`, async () => {
  return initialState
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder
      .addCase(
        setTokenFilter.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setTimeFilter.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setStatusFilter.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(resetFilter.fulfilled, (state, { payload }) => payload),
})

export default slice.reducer
