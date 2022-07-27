import { getVouchers } from 'model/voucher.controller'
import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
