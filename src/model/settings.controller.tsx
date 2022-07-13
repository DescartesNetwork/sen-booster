import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

/**
 * Interface & Utility
 */
export type BoosterMode =  'user' | 'retailer'
export type State = {
  mode: BoosterMode
}

/**
 * Store constructor
 */

const NAME = 'settings'
const initialState: State = {
  mode: 'user'
}

/**
 * Actions
 */


export const setSettings = createAsyncThunk<
  Partial<State>,
  { mode: BoosterMode },
  { state: any }
>(`${NAME}/setSettings`, async ({ mode }) => {
  return {
   mode
  }
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
      setSettings.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
