import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getBoosters } from 'model/booster.controller'

export const BoostersWatcher = () => {
  const dispatch = useDispatch()

  const fetchData = useCallback(async () => {
    dispatch(getBoosters())
  }, [dispatch])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <Fragment />
}
