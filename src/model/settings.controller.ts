import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Mode } from 'constant'

/**
 * Interface & Utility
 */
export type State = {
  mode: Mode
}

/**
 * Store constructor
 */

const NAME = 'settings'
const initialState: State = {
  mode: Mode.User,
}

/**
 * Actions
 */

export const setMode = createAsyncThunk(
  `${NAME}/setMode`,
  async (mode: Mode) => {
    return {
      mode,
    }
  },
)

/**
 * Usual procedure
 */

const slice = createSlice({
  name: NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    void builder.addCase(
      setMode.fulfilled,
      (state, { payload }) => void Object.assign(state, payload),
    ),
})

export default slice.reducer
