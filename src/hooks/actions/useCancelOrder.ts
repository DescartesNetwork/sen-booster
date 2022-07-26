import { useCallback, useState } from 'react'
import { Transaction } from '@solana/web3.js'
import { useSelector } from 'react-redux'

import { useSenExchange } from 'hooks/useSenExchange'
import { notifyError, notifySuccess } from 'helper'
import { AppState } from 'model'
import { Ipfs } from 'senUse/ipfs'

export const useCancelOrder = (orderAddress: string) => {
  const { metadata } = useSelector(
    (state: AppState) => state.orders[orderAddress],
  )
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const cancelOrder = useCallback(
    async (orderAddress: string) => {
      try {
        setLoading(true)
        console.log('matadata:', metadata)
        const aa = await Ipfs.methods.booster.get(metadata)
        console.log('meeyey', aa)
        const trans = new Transaction()
        const { tx: txInitRetailer } = await senExchange.cancel({
          order: orderAddress,
          sendAndConfirm: false,
        })
        trans.add(txInitRetailer)

        // for (const collection of collections) {
        //   const voucherPrinter = web3.Keypair.generate()
        //   const { tx: txPrintVoucher } =
        //     await senExchange.initializeVoucherPrinter({
        //       collection,
        //       discount: utilsBN.decimalize(DISCOUNT, DECIMAL_DISCOUNT),
        //       retailer: retailer.publicKey,
        //       total: new BN(MAX_AMOUNT_VOUCHER),
        //       voucherPrinter,
        //       sendAndConfirm: false,
        //     })
        //   signers.push(voucherPrinter)
        //   trans.add(txPrintVoucher)
        // }

        // const txIds = await provider.sendAndConfirm(trans, signers)
        // return notifySuccess('Add new Booster', txIds)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [metadata, senExchange],
  )

  return { cancelOrder, loading }
}
