import { useSelector } from 'react-redux'

import { Space } from 'antd'
import { MintAvatar } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'

import { AppState } from 'model'

type BoosterAvatarProps = {
  boosterAddress: string
}
const BoosterAvatar = ({ boosterAddress }: BoosterAvatarProps) => {
  const { bidMint, askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )

  return (
    <Space>
      <MintAvatar mintAddress={bidMint.toBase58()} />
      <IonIcon name="arrow-forward-outline" />
      <MintAvatar mintAddress={askMint.toBase58()} />
    </Space>
  )
}

export default BoosterAvatar
