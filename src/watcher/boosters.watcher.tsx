import { useSenExchange } from 'hooks/useSenExchange'
import { Fragment, useCallback, useEffect } from 'react'

export const BoostersWatcher = () => {
  const { senExchange } = useSenExchange()

  const fetchData = useCallback(async () => {
    const boosters = await senExchange.program.account.retailer.all()
    console.log('boosters', boosters)
  }, [senExchange.program.account.retailer])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return <Fragment />
}
