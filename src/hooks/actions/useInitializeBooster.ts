import { useCallback, useState } from 'react'
import { utilsBN } from '@sen-use/web3'
import { web3 } from '@project-serum/anchor'
import BN from 'bn.js'

import { useSenExchange } from 'hooks/useSenExchange'
import { PayRateState } from 'actions/createBooster/payRate'
import { notifyError, notifySuccess } from 'helper'
import { Ipfs } from 'senUse/ipfs'
import { BoosterMetadata } from 'constant'

type UseInitializeBoosterProps = {
  payRate: PayRateState
  bidMint: string
  askMint: string
  budget: number
  startTime: number
  endTime: number
  collections: string[]
}

const MAX_AMOUNT_VOUCHER = 1_000_000
const DISCOUNT = 0.025
export const DECIMAL_DISCOUNT = 9

export const useInitializeBooster = () => {
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const initializeBooster = useCallback(
    async ({
      bidMint,
      askMint,
      startTime,
      endTime,
      budget,
      collections,
      payRate,
    }: UseInitializeBoosterProps) => {
      try {
        setLoading(true)
        const metadata: BoosterMetadata = {
          payRate,
          budget,
        }
        const { digest } = await Ipfs.methods.booster.set(metadata)
        const startAfter = startTime ? startTime - Date.now() : startTime
        const endAfter = endTime ? endTime - Date.now() : endTime
        const { provider } = senExchange
        const trans = new web3.Transaction()
        const retailer = web3.Keypair.generate()
        const signers: web3.Keypair[] = [retailer]

        const { tx: txInitRetailer } = await senExchange.initializeRetailer({
          bidMint,
          askMint,
          askTotal: new BN(0),
          bidTotal: new BN(0),
          startAfter: new BN(startAfter / 1000),
          endAfter: new BN(endAfter / 1000),
          metadata: digest,
          sendAndConfirm: false,
          retailer,
        })
        trans.add(txInitRetailer)

        for (const collection of collections) {
          const voucherPrinter = web3.Keypair.generate()
          const { tx: txPrintVoucher } =
            await senExchange.initializeVoucherPrinter({
              collection,
              discount: utilsBN.decimalize(DISCOUNT, DECIMAL_DISCOUNT),
              retailer: retailer.publicKey,
              total: new BN(MAX_AMOUNT_VOUCHER),
              voucherPrinter,
              sendAndConfirm: false,
            })
          signers.push(voucherPrinter)
          trans.add(txPrintVoucher)
        }

        const txIds = await provider.sendAndConfirm(trans, signers)
        return notifySuccess('Add new Booster', txIds)
      } catch (error: any) {
        return notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [senExchange],
  )

  return { initializeBooster, loading }
}
