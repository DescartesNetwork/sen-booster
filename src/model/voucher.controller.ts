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

export const getVouchers = createAsyncThunk(`${NAME}/getVouchers`, async () => {
  const vouchers = await window.senBooster.program.account.voucher.all()
  let bulk: VoucherState = {}
  for (const voucher of vouchers) {
    const voucherData = voucher.account
    bulk[voucher.publicKey.toBase58()] = voucherData
  }
  return bulk
})

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      getVouchers.fulfilled,
      (state, { payload }) => payload,
    ),
})

export default slice.reducer
