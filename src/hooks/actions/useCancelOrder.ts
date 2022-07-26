import { useCallback, useMemo, useState } from 'react'
import { Transaction } from '@solana/web3.js'
import { useSelector } from 'react-redux'

import { useSenExchange } from 'hooks/useSenExchange'
import { notifyError, notifySuccess } from 'helper'
import { AppState } from 'model'

export const useCancelOrder = (orderAddress: string) => {
  const vouchers = useSelector((state: AppState) => state.vouchers)
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const voucherAddresses = useMemo((): string[] => {
    return Object.keys(vouchers).filter(
      (address) => vouchers[address].order.toBase58() === orderAddress,
    )
  }, [orderAddress, vouchers])

  const cancelOrder = useCallback(
    async (orderAddress: string) => {
      try {
        setLoading(true)
        const trans = new Transaction()
        const { provider } = senExchange
        const { tx: txInitRetailer } = await senExchange.cancel({
          order: orderAddress,
          sendAndConfirm: false,
        })
        trans.add(txInitRetailer)

        voucherAddresses.forEach(async (address) => {
          const { tx: txLockVoucher } = await senExchange.unlockVoucher({
            order: orderAddress,
            mintNft: vouchers[address].mintNft,
            voucher: address,
            sendAndConfirm: false,
          })

          trans.add(txLockVoucher)
        })

        const txIds = await provider.sendAndConfirm(trans)
        return notifySuccess('Cancel Booster', txIds)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange, voucherAddresses, vouchers],
  )

  return { cancelOrder, loading }
}
