import { useCallback, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Address, web3 } from '@project-serum/anchor'

import { useSenExchange } from 'hooks/useSenExchange'
import { notifyError, notifySuccess } from 'helper'
import { AppState } from 'model'

export const useCancelOrder = (orderAddress: Address) => {
  const vouchers = useSelector((state: AppState) => state.vouchers)
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const voucherAddresses = useMemo((): string[] => {
    return Object.keys(vouchers).filter(
      (address) =>
        vouchers[address].order.toBase58() === orderAddress.toString(),
    )
  }, [orderAddress, vouchers])

  const cancelOrder = useCallback(async () => {
    try {
      setLoading(true)
      const trans = new web3.Transaction()
      const { provider } = senExchange
      const { tx: txCancelOrder } = await senExchange.cancel({
        order: orderAddress,
        sendAndConfirm: false,
      })
      trans.add(txCancelOrder)

      voucherAddresses.forEach(async (address) => {
        const { tx: txUnlockVoucher } = await senExchange.unlockVoucher({
          order: orderAddress,
          mintNft: vouchers[address].mintNft,
          voucher: address,
          sendAndConfirm: false,
        })

        trans.add(txUnlockVoucher)
      })

      const txIds = await provider.sendAndConfirm(trans)
      return notifySuccess('Canceled Order', txIds)
    } catch (error) {
      notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [orderAddress, senExchange, voucherAddresses, vouchers])

  return { cancelOrder, loading }
}
