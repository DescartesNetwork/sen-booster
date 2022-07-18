import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Mode } from 'constant'

/**
 * Interface & Utility
 */

export type FilterOrderState = {
  mode: Mode
  token: string
  time: string
  status: string
}

/**
 * Store constructor
 */

const NAME = 'orderFilter'
const initialState: FilterOrderState = {
  mode: Mode.User,
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

export const switchMode = createAsyncThunk(
  `${NAME}/switchMode`,
  async (mode: Mode) => {
    return {
      mode,
      token: '',
      time: '',
      status: '',
    }
  },
)

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
      .addCase(
        switchMode.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
