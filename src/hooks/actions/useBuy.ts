import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Transaction } from '@solana/web3.js'
import { web3, Address } from '@project-serum/anchor'
import BN from 'bn.js'

import { useSenExchange } from 'hooks/useSenExchange'

import { notifyError, notifySuccess } from 'helper'
import { AppState } from 'model'

type BuyProps = {
  retailer: Address
  bidAmount: BN
  askAmount: BN
  lockTime: BN
  appliedNFTs: string[]
}

export const useBuy = () => {
  const voucherPrinters = useSelector(
    (state: AppState) => state.voucherPrinters,
  )
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const getVoucherPrinterAddresses = useCallback(
    ({
      boosterAddress,
      numberInNeed,
    }: {
      boosterAddress: Address
      numberInNeed: number
    }): string[] => {
      let selectedVoucherPrinters: string[] = []
      let remainingNumberInNeed = numberInNeed
      const voucherPrintersByBooster = Object.keys(voucherPrinters).filter(
        (address) => {
          return (
            voucherPrinters[address].retailer.toBase58() ===
            boosterAddress.toString()
          )
        },
      )
      const sortedVoucherPrinters = voucherPrintersByBooster.sort(
        (addressA, addressB) =>
          voucherPrinters[addressA].discount.toNumber() -
          voucherPrinters[addressB].discount.toNumber(),
      )

      for (const address of sortedVoucherPrinters) {
        const voucherPrinterTotal = voucherPrinters[address].total.toNumber()
        if (voucherPrinterTotal >= remainingNumberInNeed) {
          selectedVoucherPrinters = selectedVoucherPrinters.concat(
            Array(remainingNumberInNeed).fill(address),
          )
          break
        }
        if (voucherPrinterTotal < remainingNumberInNeed) {
          remainingNumberInNeed = numberInNeed - voucherPrinterTotal
          selectedVoucherPrinters = selectedVoucherPrinters.concat(
            Array(numberInNeed - remainingNumberInNeed).fill(address),
          )
        }
      }
      // In critical rate case we can exporting one more variable to notify for user
      return selectedVoucherPrinters
    },
    [voucherPrinters],
  )

  const buy = useCallback(
    async ({
      retailer,
      bidAmount,
      askAmount,
      lockTime,
      appliedNFTs,
    }: BuyProps) => {
      try {
        setLoading(true)
        const { provider } = senExchange
        const trans = new Transaction()
        const order = web3.Keypair.generate()
        const signers: web3.Keypair[] = [order]

        const { tx: txInitializeOrder } = await senExchange.initializeOrder({
          retailer,
          bidAmount,
          askAmount,
          lockTime,
          sendAndConfirm: false,
          order,
        })
        trans.add(txInitializeOrder)

        const voucherPrinterAddresses = getVoucherPrinterAddresses({
          boosterAddress: retailer,
          numberInNeed: appliedNFTs.length,
        })

        await Promise.all(
          appliedNFTs.map(async (nftAddress, idx) => {
            const voucher = web3.Keypair.generate()
            const { tx: txLockVoucher } = await senExchange.lockVoucher({
              order: order.publicKey,
              voucherPrinter: voucherPrinterAddresses[idx],
              mintNft: nftAddress,
              voucher,
              sendAndConfirm: false,
            })
            signers.push(voucher)
            trans.add(txLockVoucher)
          }),
        )

        const txId = await provider.sendAndConfirm(trans, signers)
        notifySuccess('Initialize Order', txId)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [getVoucherPrinterAddresses, senExchange],
  )

  return { buy, loading }
}
