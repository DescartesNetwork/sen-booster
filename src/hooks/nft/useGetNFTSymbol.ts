import { useCallback } from 'react'
import axios from 'axios'
import { rpc } from '@sentre/senhub'

export const useGetNFTSymbol = () => {
  const getSymbolCollection = useCallback(async (mintAddress: string) => {
    if (rpc === 'devnet') return ''
    const axiosConfig = {
      baseURL: 'https://api-mainnet.magiceden.dev/v2',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
      },
    }

    const AXIOS = axios.create(axiosConfig)

    const symbol = await AXIOS.get(`/tokens/${mintAddress}`)
      .then((res) => {
        return res.data?.collection || ''
      })
      .catch()
    return symbol
  }, [])

  return getSymbolCollection
}
