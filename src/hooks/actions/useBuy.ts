import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { web3, Address } from '@project-serum/anchor'
import BN from 'bn.js'

import { useSenExchange } from 'hooks/useSenExchange'

import { notifyError, notifySuccess } from 'helper'
import { AppState } from 'model'
import { Ipfs, OrderMetadata } from 'senUse/ipfs'

type BuyProps = {
  retailer: Address
  bidAmount: BN
  askAmount: BN
  lockTime: BN
  appliedNFTs: string[]
  discount: number
}

export const useBuy = () => {
  const printers = useSelector((state: AppState) => state.voucherPrinters)
  const { senExchange } = useSenExchange()
  const [loading, setLoading] = useState(false)

  const getVoucherPrinterAddresses = useCallback(
    (boosterAddress: Address, amount: number): string[] => {
      const selectedPrinters: string[] = []
      const sortedPrinters = Object.keys(printers).sort((a, b) =>
        printers[b].discount.gt(printers[a].discount) ? 1 : -1,
      )
      for (const printerAddress of sortedPrinters) {
        const printer = printers[printerAddress]
        let maxAmount = printer.total.toNumber()
        if (printer.retailer.toBase58() !== boosterAddress.toString()) continue

        while (maxAmount > 0 || selectedPrinters.length < amount) {
          selectedPrinters.push(printerAddress)
          maxAmount -= 1
        }
      }
      if (selectedPrinters.length < amount)
        throw new Error('Insufficient voucher')
      return selectedPrinters
    },
    [printers],
  )

  const buy = useCallback(
    async ({
      retailer,
      bidAmount,
      askAmount,
      lockTime,
      appliedNFTs,
      discount,
    }: BuyProps) => {
      try {
        setLoading(true)
        const metadata: OrderMetadata = {
          appliedNFTs,
          discount,
        }
        const { digest } = await Ipfs.methods.order.set(metadata)
        const { provider } = senExchange
        const trans = new web3.Transaction()
        const order = web3.Keypair.generate()
        const signers: web3.Keypair[] = [order]

        const { tx: txInitializeOrder } = await senExchange.initializeOrder({
          retailer,
          bidAmount,
          askAmount,
          lockTime,
          sendAndConfirm: false,
          order,
          metadata: digest,
        })
        trans.add(txInitializeOrder)

        const selectedPrinters = getVoucherPrinterAddresses(
          retailer,
          appliedNFTs.length,
        )
        await Promise.all(
          appliedNFTs.map(async (nftAddress, idx) => {
            const voucher = web3.Keypair.generate()
            const { tx: txLockVoucher } = await senExchange.lockVoucher({
              order: order.publicKey,
              voucherPrinter: selectedPrinters[idx],
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
