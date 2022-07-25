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
    senExchangeProgram: 'HTyxSm8f2Rijm1bbqMbvbnxG1yf2cHzai4i6gN2PpJX4',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    metaplexNFT: new metaplexNFT(rpc),
    senExchangeProgram: 'HTyxSm8f2Rijm1bbqMbvbnxG1yf2cHzai4i6gN2PpJX4',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    metaplexNFT: new metaplexNFT(rpc),
    senExchangeProgram: 'HTyxSm8f2Rijm1bbqMbvbnxG1yf2cHzai4i6gN2PpJX4',
  },
}

/**
 * Module exports
 */
export default conf
