import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'model/devTools'

import main from 'model/main.controller'
import booster from 'model/booster.controller'
import searchBoosters from 'model/searchBoosters.controller'
import order from 'model/order.controller'
import ordersFilter from 'model/ordersFilter.controller'
import voucherPrinter from 'model/voucherPrinter.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    main,
    booster,
    searchBoosters,
    order,
    ordersFilter,
    voucherPrinter,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
