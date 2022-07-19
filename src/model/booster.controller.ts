import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { account } from '@senswap/sen-js'
import { RetailerData } from 'sen-exchange-core'

/**
 * Interface & Utility
 */

export type BoosterState = Record<string, RetailerData>

/**
 * Store constructor
 */

const NAME = 'boosters'
const initialState: BoosterState = {}

/**
 * Actions
 */

export const getBoosters = createAsyncThunk(`${NAME}/getBoosters`, async () => {
  // const pools = await window.senBooster.getAllPoolData()
  const pools: any = []
  let bulk: BoosterState = {}
  for (const pool of pools) {
    const boosterData: any = pool.account as RetailerData
    const poolState = boosterData.state as BoosterState
    if (poolState['deleted']) continue
    bulk[pool.publicKey.toBase58()] = boosterData
  }
  return bulk
})

export const getBooster = createAsyncThunk<
  BoosterState,
  { address: string },
  { state: any }
>(`${NAME}/getBooster`, async ({ address }, { getState }) => {
  if (!account.isAddress(address)) throw new Error('Invalid pool address')
  const {
    booster: { [address]: data },
  } = getState()
  if (data) return { [address]: data }

  // const poolData = await window.balansol.getPoolData(address)
  const boosterData = {}
  return { [address]: boosterData }
})

export const upsetBooster = createAsyncThunk<
  BoosterState,
  { address: string; data: RetailerData },
  { state: any }
>(`${NAME}/upsetBooster`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid pool address')
  if (!data) throw new Error('Data is empty')
  return { [address]: data }
})

export const removeBooster = createAsyncThunk<
  BoosterState,
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
      .addCase(getBoosters.fulfilled, (state, { payload }) => payload)
      .addCase(
        getBooster.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        upsetBooster.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(removeBooster.fulfilled, (state, { payload }) => payload),
})

export default slice.reducer
