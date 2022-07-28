import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getVoucherPrinters } from 'model/voucherPrinter.controller'

export const VoucherPrinterWatcher = () => {
  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {
    dispatch(getVoucherPrinters())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <Fragment />
}
