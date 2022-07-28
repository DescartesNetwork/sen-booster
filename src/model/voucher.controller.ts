import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { VoucherData } from 'sen-exchange-core'

/**
 * Interface & Utility
 */

export type VoucherState = Record<string, VoucherData>

/**
 * Store constructor
 */

const NAME = 'voucher'
const initialState: VoucherState = {}

/**
 * Actions
 */

export const initVouchers = createAsyncThunk(
  `${NAME}/initVouchers`,
  async (bulk: VoucherState) => {
    return bulk
  },
)

export const upsetVoucher = createAsyncThunk<
  VoucherState,
  { address: string; data: VoucherData },
  { state: any }
>(`${NAME}/upsetVoucher`, async ({ address, data }) => {
  return { [address]: data }
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
      .addCase(initVouchers.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetVoucher.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
