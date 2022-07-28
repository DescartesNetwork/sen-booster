import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { VoucherPrinterData } from 'sen-exchange-core'

/**
 * Interface & Utility
 */

export type VoucherPrinterState = Record<string, VoucherPrinterData>

/**
 * Store constructor
 */

const NAME = 'voucherPrinter'
const initialState: VoucherPrinterState = {}

/**
 * Actions
 */

export const initVoucherPrinters = createAsyncThunk(
  `${NAME}/initVoucherPrinters`,
  async (bulk: VoucherPrinterState) => {
    return bulk
  },
)

export const upsetVoucherPrinters = createAsyncThunk<
  VoucherPrinterState,
  { address: string; data: VoucherPrinterData },
  { state: any }
>(`${NAME}/upsetVoucherPrinters`, async ({ address, data }) => {
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
      .addCase(initVoucherPrinters.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetVoucherPrinters.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
