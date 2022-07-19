import { PublicKey } from '@solana/web3.js'

type BoosterSymbolProps = {
  pair: [PublicKey, PublicKey]
}
const BoosterSymbol = ({ pair }: BoosterSymbolProps) => {
  return <>Booster symbol</>
}

export default BoosterSymbol
