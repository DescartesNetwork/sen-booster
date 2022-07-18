import { Net } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  node: string
  spltAddress: string
  splataAddress: string
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
    senExchangeProgram: '2ZtYYHQYffL7ZfbUJwMwY2hoVnqarwkqKBbz5wregkLR',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    senExchangeProgram: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    spltAddress: 'TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA',
    splataAddress: 'ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL',
    senExchangeProgram: '',
  },
}

/**
 * Module exports
 */
export default conf
