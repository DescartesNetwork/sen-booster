import { getBoosters } from 'model/booster.controller'
import { Fragment, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

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
