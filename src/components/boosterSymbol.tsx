import { useSelector } from 'react-redux'

import { MintSymbol } from '@sen-use/components'
import { Typography } from 'antd'

import { AppState } from 'model'

type BoosterSymbolProps = {
  boosterAddress: string
}

const BoosterSymbol = ({ boosterAddress }: BoosterSymbolProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )

  return (
    <Typography.Title level={5}>
      <MintSymbol mintAddress={askMint.toBase58()} /> -{' '}
      <MintSymbol mintAddress={bidMint.toBase58()} />
    </Typography.Title>
  )
}

export default BoosterSymbol
