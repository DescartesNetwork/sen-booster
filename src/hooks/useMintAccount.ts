import { useMemo } from 'react'
import { utils } from '@senswap/sen-js'
import {
  useAccounts,
  useMintDecimals,
  useWalletAddress,
  useWalletBalance,
} from '@sentre/senhub'

import { SOL_ADDRESS } from 'constant/sol'

export const useMintAccount = (accountAddress: string) => {
  const accounts = useAccounts()
  const walletAddress = useWalletAddress()
  const lamports = useWalletBalance()

  const { amount, mint: mintAddress } = useMemo(() => {
    // sol account
    if (accountAddress === walletAddress)
      return { amount: BigInt(lamports), mint: SOL_ADDRESS }
    // spl token account
    return accounts[accountAddress] || {}
  }, [accountAddress, accounts, lamports, walletAddress])

  const decimals = useMintDecimals({ mintAddress }) || 0
  const mintInfo = useMemo(() => {
    return {
      balance: utils.undecimalize(amount, decimals),
      mintAddress,
      amount,
      decimals,
    }
  }, [amount, decimals, mintAddress])

  return mintInfo
}
