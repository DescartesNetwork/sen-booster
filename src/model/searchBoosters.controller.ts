import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { UserBoosterCategory, RetailerBoosterCategory } from 'constant'

/**
 * Interface & Utility
 */

export type SearchState = {
  searchKeyword: string
  filterUserBooster: UserBoosterCategory
  filterRetailerBooster: RetailerBoosterCategory
}

/**
 * Store constructor
 */

const NAME = 'searchBoosters'
const initialState: SearchState = {
  searchKeyword: '',
  filterUserBooster: UserBoosterCategory.AllBooster,
  filterRetailerBooster: RetailerBoosterCategory.AvailableBooster,
}

/**
 * Actions
 */

export const setFilterUserBooster = createAsyncThunk(
  `${NAME}/setFilterUserBooster`,
  async (filterBooster: UserBoosterCategory) => {
    return {
      filterUserBooster: filterBooster,
    }
  },
)

export const setFilterRetailerBooster = createAsyncThunk(
  `${NAME}/setFilterRetailerBooster`,
  async ({ filterBooster }: { filterBooster: RetailerBoosterCategory }) => {
    return {
      filterRetailerBooster: filterBooster,
    }
  },
)

export const setSearchInput = createAsyncThunk(
  `${NAME}/setSearchInput`,
  async ({ searchText }: { searchText: string }) => {
    return {
      searchInput: searchText,
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
    void builder
      .addCase(
        setFilterUserBooster.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setFilterRetailerBooster.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      )
      .addCase(
        setSearchInput.fulfilled,
        (state, { payload }) => void Object.assign(state, payload),
      ),
})

export default slice.reducer
