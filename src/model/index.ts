import { configureStore } from '@reduxjs/toolkit'
import { devTools, bigintSerializationMiddleware } from 'model/devTools'

import main from 'model/main.controller'
import boosters from 'model/booster.controller'
import searchBoosters from 'model/searchBoosters.controller'
import orders from 'model/order.controller'
import ordersFilter from 'model/ordersFilter.controller'
import voucherPrinters from 'model/voucherPrinter.controller'
import settings from 'model/settings.controller'

/**
 * Isolated store
 */
const model = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware(bigintSerializationMiddleware),
  devTools: devTools(process.env.REACT_APP_ID as string),
  reducer: {
    main,
    boosters,
    searchBoosters,
    orders,
    ordersFilter,
    voucherPrinters,
    settings,
  },
})

export type AppState = ReturnType<typeof model.getState>
export type AppDispatch = typeof model.dispatch
export default model
