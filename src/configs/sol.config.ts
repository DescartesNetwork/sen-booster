import { Net, rpc } from '@sentre/senhub'
import metaplexNFT from 'lib/metaplex'

/**
 * Contructor
 */
type Conf = {
  node: string
  spltAddress: string
  splataAddress: string
  metaplexNFT: metaplexNFT
  senExchangeProgram: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    metaplexNFT: new metaplexNFT(rpc),
    senExchangeProgram: 'AWkQmDswtbkPTUAgFzg7MxiaqrrwbnvJ4X8XL8dex4HE',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    senExchangeProgram: 'AWkQmDswtbkPTUAgFzg7MxiaqrrwbnvJ4X8XL8dex4HE',
    metaplexNFT: new metaplexNFT('testnet'),
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    senExchangeProgram: 'AWkQmDswtbkPTUAgFzg7MxiaqrrwbnvJ4X8XL8dex4HE',
    metaplexNFT: new metaplexNFT(rpc),
  },
}

/**
 * Module exports
 */
export default conf
