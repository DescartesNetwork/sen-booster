import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { OrderData } from 'sen-exchange-core'

/**
 * Interface & Utility
 */

export type OrderState = Record<string, OrderData>

/**
 * Store constructor
 */

const NAME = 'orders'
const initialState: OrderState = {}

/**
 * Actions
 */

export const initOrders = createAsyncThunk(
  `${NAME}/initOrders`,
  async (bulk: OrderState) => {
    return bulk
  },
)

export const upsetOrder = createAsyncThunk<
  OrderState,
  { address: string; data: OrderData },
  { state: any }
>(`${NAME}/upsetOrder`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid order address')
  if (!data) throw new Error('Data is empty')
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
      .addCase(initOrders.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetOrder.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
