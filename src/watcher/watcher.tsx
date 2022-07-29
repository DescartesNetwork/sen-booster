import { Program, web3 } from '@project-serum/anchor'
import {
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import { notifyError } from 'helper'

type UseWatcherProps = {
  program: Program<any>
  name: keyof UseWatcherProps['program']['account']
  filter: web3.GetProgramAccountsFilter[]
  upset: (key: string, value: any) => void
  init: (bulk: Record<string, any>) => void
  children?: ReactNode
  Loading?: ReactNode
}

const Watcher: React.FC<UseWatcherProps> = (props: UseWatcherProps) => {
  const { program, name, filter, upset, init, Loading, children } = props
  const [watchId, setWatchId] = useState(0)
  const [loading, setLoading] = useState(true)

  const { accountClient, connection } = useMemo(() => {
    const accountClient = program?.account?.[name]
    const connection = accountClient.provider.connection
    return { accountClient, connection }
  }, [name, program?.account])

  const fetchData = useCallback(async () => {
    try {
      setLoading(true)
      const accountInfos = await accountClient.all()
      const bulk: any = {}
      for (const info of accountInfos) {
        bulk[info.publicKey.toBase58()] = info.account
      }
      init(bulk)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [accountClient, init])

  const watchData = useCallback(async () => {
    if (watchId) return
    const newWatcherId = connection.onProgramAccountChange(
      accountClient.programId,
      async (info) => {
        const address = info.accountId.toBase58()
        const buffer = info.accountInfo.data
        const accountData = program.coder.accounts.decode(name, buffer)
        upset(address, accountData)
      },
      'confirmed',
      [{ dataSize: accountClient.size }, ...filter],
    )
    setWatchId(newWatcherId)
  }, [
    accountClient.programId,
    accountClient.size,
    connection,
    filter,
    name,
    program.coder.accounts,
    upset,
    watchId,
  ])

  useEffect(() => {
    fetchData()
    watchData()
    return () => {
      ;(async () => {
        if (!watchId) return
        await connection.removeProgramAccountChangeListener(watchId)
        setWatchId(0)
      })()
    }
  }, [connection, fetchData, watchData, watchId])

  if (loading) return <Fragment>{Loading}</Fragment>
  return <Fragment>{children}</Fragment>
}

export default Watcher
