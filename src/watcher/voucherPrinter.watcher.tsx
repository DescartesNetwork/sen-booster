import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { web3 } from '@project-serum/anchor'

import {
  initVoucherPrinters,
  upsetVoucherPrinters,
} from 'model/voucherPrinter.controller'
import Watcher from './watcher'

// TODO: Config
const NAME = 'voucherPrinter'
const FILTER: web3.GetProgramAccountsFilter[] = []

const VoucherPrintersWatcher = () => {
  const dispatch = useDispatch()

  // TODO: init all account data
  const init = useCallback(
    (data) => dispatch(initVoucherPrinters(data)),
    [dispatch],
  )
  // TODO: upset account data
  const upset = useCallback(
    (key: string, value: any) =>
      dispatch(upsetVoucherPrinters({ address: key, data: value })),
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
export default VoucherPrintersWatcher
