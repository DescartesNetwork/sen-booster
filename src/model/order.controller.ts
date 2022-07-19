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
  // const orders = await window.senBooster.getAllPoolData()
  const orders: any = []
  let bulk: OrderState = {}
  for (const order of orders) {
    const orderData: any = order.account as OrderData
    const orderState = orderData.state as OrderState
    if (orderState['deleted']) continue
    bulk[order.publicKey.toBase58()] = boosterData
  }
  return bulk
})

export const getOrder = createAsyncThunk<
  OrderState,
  { address: string },
  { state: any }
>(`${NAME}/getOrder`, async ({ address }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid pool address')
  const {
    pools: { [address]: data },
  } = getState()
  if (data) return { [address]: data }

  // const poolData = await window.balansol.getPoolData(address)
  const BoosterData = {}
  return { [address]: BoosterData }
})

export const upsetOrder = createAsyncThunk<
  OrderState,
  { address: string; data: OrderData },
  { state: any }
>(`${NAME}/upsetOrder`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid pool address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const removeOrder = createAsyncThunk<
  OrderState,
  { address: string },
  { state: any }
>(`${NAME}/removeBooster`, async ({ address }, { getState }) => {
  const { booster } = getState()
  if (!account.isAddress(address)) throw new Error('Invalid pool address')
  if (!booster[address]) throw new Error('Pool address does not exist!')
  const newBooster = { ...booster }
  delete newBooster[address]
  return newBooster
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
