import { Space } from 'antd'
import { AppState } from 'model'
import { useSelector } from 'react-redux'
import { MintSymbol } from 'shared/antd/mint'

type BoosterAvatarProps = {
  boosterAddress: string
}
const BoosterAvatar = ({ boosterAddress }: BoosterAvatarProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )

  return (
    <Space>
      <MintSymbol mintAddress={bidMint.toBase58()} separator={'.'} />
      -
      <MintSymbol mintAddress={askMint.toBase58()} separator={'.'} />
    </Space>
  )
}

export default BoosterAvatar
