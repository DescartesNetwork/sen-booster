import { useEffect, useState } from 'react'
import { account, DEFAULT_EMPTY_ADDRESS, utils } from '@senswap/sen-js'
import {
  splt,
  useAccounts,
  useMintDecimals,
  useWalletAddress,
  useWalletBalance,
} from '@sentre/senhub'

export type AccountBalanceReturn = {
  amount: bigint
  decimals: number
  balance: number
  mintAddress: string
}

const buildResult = (
  mintAddress?: string,
  amount?: string,
  decimals?: number,
) => {
  if (
    !account.isAddress(mintAddress) ||
    amount === undefined ||
    decimals === undefined
  )
    return { amount: BigInt(0), decimals: 0, balance: 0 }
  return {
    mintAddress,
    amount,
    decimals,
    balance: Number(utils.undecimalize(BigInt(amount), decimals)),
  }
}

/**
 * Get account balance. This hook needs WalletProvider, MintProvider, and AccountProvider for working.
 * WalletProvider Ref: https://docs.sentre.io/senhub/development/providers/wallet-provider
 * MintProvider Ref: https://docs.sentre.io/senhub/development/providers/mint-provider
 * AccountProvider Ref: https://docs.sentre.io/senhub/development/providers/account-provider
 * @param accountAddress Associated account address
 * @returns AccountBalanceReturn
 * - AccountBalanceReturn.amount: The amount with decimals
 * - AccountBalanceReturn.decimals: The corresponding mint decimals
 * - AccountBalanceReturn.balance: The human-readable balance (undecimalized amount)
 * - AccountBalanceReturn.mintAddress: The corresponding mint
 */
const useAccountBalance = (accountAddress: string) => {
  const lamports = useWalletBalance()
  const walletAddress = useWalletAddress()
  const accounts = useAccounts()
  const { amount, mint: mintAddress } = accounts[accountAddress] || {}
  const decimals = useMintDecimals({ mintAddress }) || 0

  if (!account.isAddress(walletAddress) || !account.isAddress(accountAddress))
    return buildResult()
  if (accountAddress === walletAddress)
    return buildResult(DEFAULT_EMPTY_ADDRESS, lamports.toString(), 9)

  return buildResult(mintAddress, amount.toString(), decimals)
}

export default useAccountBalance

/**
 * The same as useAccountBalance but the input is mint address
 * @param mintAddress Mint address
 * @returns AccountBalanceReturn
 */
export const useAccountBalanceByMintAddress = (mintAddress: string) => {
  const [accountAddress, setAccountAddress] = useState('')
  const walletAddress = useWalletAddress()
  const data = useAccountBalance(accountAddress)

  useEffect(() => {
    ;(async () => {
      if (!account.isAddress(walletAddress) || !account.isAddress(mintAddress))
        return setAccountAddress('')

      try {
        const address = await splt.deriveAssociatedAddress(
          walletAddress,
          mintAddress,
        )
        return setAccountAddress(address)
      } catch (er) {
        return setAccountAddress('')
      }
    })()
  })

  return data
}
