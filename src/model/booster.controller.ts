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

export const initBoosters = createAsyncThunk(
  `${NAME}/initBoosters`,
  async (bulk: BoosterState) => {
    return bulk
  },
)

export const upsetBooster = createAsyncThunk<
  BoosterState,
  { address: string; data: RetailerData },
  { state: any }
>(`${NAME}/upsetBooster`, async ({ address, data }) => {
  if (!account.isAddress(address)) throw new Error('Invalid booster address')
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
      .addCase(initBoosters.fulfilled, (state, { payload }) => payload)
      .addCase(
        upsetBooster.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
