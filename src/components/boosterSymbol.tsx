import { useSelector } from 'react-redux'

import { MintSymbol } from '@sen-use/components'
import { Space } from 'antd'

import { AppState } from 'model'

type BoosterSymbolProps = {
  boosterAddress: string
}

const BoosterSymbol = ({ boosterAddress }: BoosterSymbolProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )

  return (
    <Space>
      <MintSymbol mintAddress={bidMint} separator={'.'} />
      -
      <MintSymbol mintAddress={askMint} separator={'.'} />
    </Space>
  )
}

export default BoosterSymbol
