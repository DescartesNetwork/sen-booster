import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { initBoosters, upsetBooster } from 'model/booster.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'retailer'
const FILTER: web3.GetProgramAccountsFilter[] = []

const BoostersWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initBoosters(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetBooster({ address: key, data: value })),
    [dispatch],
  )

  return (
    <Watcher
      program={window.senBooster.program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    />
  )
}
export default BoostersWatcher
