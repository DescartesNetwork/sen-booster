import { useCallback, useEffect, useState } from 'react'
import { useWallet } from '@sentre/senhub'

import { MetadataDataType } from 'lib/metaplex'
import useOwnerNFT from './nft/useOwnerNFT'
import { useVoucherPrintersByBooster } from './boosters/useVoucherPrintersByBooster'

export const useNFTByVoucher = (boosterAddress: string) => {
  const [ownerNFTsByVouchers, setOwnerNFTsByVouchers] = useState<
    MetadataDataType[]
  >([])
  const {
    wallet: { address },
  } = useWallet()
  const { nfts } = useOwnerNFT(address)
  const voucherPrinters = useVoucherPrintersByBooster(boosterAddress)

  const getOwnerNFTsByVouchers = useCallback(() => {
    if (!voucherPrinters.length || !nfts) return []
    const acceptedCollections = voucherPrinters.map((val) =>
      val.collection.toBase58(),
    )
    let listNFTs: MetadataDataType[] = []

    nfts?.forEach((nft: MetadataDataType) => {
      if (nft.collection && acceptedCollections.includes(nft.collection.key)) {
        listNFTs.push(nft)
      }
    })

    setOwnerNFTsByVouchers(listNFTs)
  }, [nfts, voucherPrinters])

  useEffect(() => {
    getOwnerNFTsByVouchers()
  }, [getOwnerNFTsByVouchers])

  return ownerNFTsByVouchers
}
