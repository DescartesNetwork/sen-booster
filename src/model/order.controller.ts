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

export const getOrders = createAsyncThunk(`${NAME}/getOrders`, async () => {
  // const orders = await window.senExchange
  const orders: any = []
  let bulk: OrderState = {}
  for (const order of orders) {
    const orderData: any = order.account as OrderData
    const orderState = orderData.state as OrderState
    if (orderState['deleted']) continue
    bulk[order.publicKey.toBase58()] = orderData
  }
  return bulk
})

export const getOrder = createAsyncThunk<
  OrderState,
  { address: string },
  { state: any }
>(`${NAME}/getOrder`, async ({ address }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid order address')
  const {
    order: { [address]: data },
  } = getState()
  if (data) return { [address]: data }

  const orderData = {}
  return { [address]: orderData }
})

export const upsetOrder = createAsyncThunk<
  OrderState,
  { address: string; data: OrderData },
  { state: any }
>(`${NAME}/upsetOrder`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid order address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const removeOrder = createAsyncThunk<
  OrderState,
  { address: string },
  { state: any }
>(`${NAME}/removeOrder`, async ({ address }, { getState }) => {
  const { orders } = getState()
  if (!account.isAddress(address)) throw new Error('Invalid order address')
  if (!orders[address]) throw new Error('Order address does not exist!')
  const newOrders = { ...orders }
  delete newOrders[address]
  return newOrders
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
      .addCase(getOrders.fulfilled, (state, { payload }) => payload)
      .addCase(
        getOrder.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetOrder.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(removeOrder.fulfilled, (state, { payload }) => payload),
})

export default slice.reducer
