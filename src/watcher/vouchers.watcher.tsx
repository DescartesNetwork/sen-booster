import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import { initVouchers, upsetVoucher } from 'model/voucher.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'voucher'
const FILTER: web3.GetProgramAccountsFilter[] = []

const VouchersWatcher: React.FC = ({ children }) => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback((data) => dispatch(initVouchers(data)), [dispatch])
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetVoucher({ address: key, data: value })),
    [dispatch],
  )

  return (
    <Watcher
      program={window.senBooster.program}
      name={NAME}
      filter={FILTER}
      init={init}
      upset={upset}
    >
      {children}
    </Watcher>
  )
}
export default VouchersWatcher
