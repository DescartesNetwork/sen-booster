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

export const getVoucherPrinters = createAsyncThunk(
  `${NAME}/getVoucherPrinters`,
  async () => {
    const printerVouchers =
      await window.senBooster.program.account.voucherPrinter.all()
    let bulk: VoucherPrinterState = {}
    for (const printerVoucher of printerVouchers) {
      const voucherPrinterData = printerVoucher.account
      bulk[printerVoucher.publicKey.toBase58()] = voucherPrinterData
    }

    return bulk
  },
)

export const getVoucherPrinter = createAsyncThunk<
  VoucherPrinterState,
  { address: string },
  { state: any }
>(`${NAME}/getVoucherPrinter`, async ({ address }, { getState }) => {
  if (!account.isAddress(address))
    throw new Error('Invalid voucherPrinter address')
  const {
    voucherPrinter: { [address]: data },
  } = getState()
  if (data) return { [address]: data }

  const printerVoucherData = {}
  return { [address]: printerVoucherData }
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
      .addCase(getVoucherPrinters.fulfilled, (state, { payload }) => payload)
      .addCase(
        getVoucherPrinter.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
