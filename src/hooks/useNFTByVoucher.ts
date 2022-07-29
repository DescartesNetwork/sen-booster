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
  const vouchers = useVoucherPrintersByBooster(boosterAddress)

  const getOwnerNFTsByVouchers = useCallback(() => {
    if (!vouchers.length || !nfts) return []
    const acceptedCollections = vouchers.map((val) => val.collection.toBase58())
    const listNFTs = nfts.filter(({ collection }) =>
      acceptedCollections.includes(collection?.key || ''),
    )
    return setOwnerNFTsByVouchers(listNFTs)
  }, [nfts, vouchers])

  useEffect(() => {
    getOwnerNFTsByVouchers()
  }, [getOwnerNFTsByVouchers])

  return ownerNFTsByVouchers
}
