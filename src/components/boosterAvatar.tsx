import { useSelector } from 'react-redux'

import { Space } from 'antd'
import { MintAvatar } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'

type BoosterAvatarProps = {
  boosterAddress: string
  size?: number
}
const BoosterAvatar = ({ boosterAddress, size }: BoosterAvatarProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )

  return (
    <Space>
      <MintAvatar mintAddress={askMint.toBase58()} size={size} />
      <IonIcon name="arrow-forward-outline" />
      <MintAvatar mintAddress={bidMint.toBase58()} size={size} />
    </Space>
  )
}

export default BoosterAvatar
