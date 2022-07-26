import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getVouchers } from 'model/voucher.controller'

export const VoucherWatcher = () => {
  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {
    dispatch(getVouchers())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <Fragment />
}
