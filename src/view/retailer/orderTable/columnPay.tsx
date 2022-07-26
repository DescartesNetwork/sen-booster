import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import BN from 'bn.js'

import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components/dist'

import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { numeric } from '@sentre/senhub/dist/shared/util'

type ColumnPayProps = {
  askAmount: BN
  boosterAddress: string
}

const ColumnPay = ({ askAmount, boosterAddress }: ColumnPayProps) => {
  const boosterData = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const askMintAddress = boosterData ? boosterData.askMint.toBase58() : ''
  const decimals = useMintDecimals(askMintAddress) || 0

  return (
    <Space>
      <MintAvatar mintAddress={askMintAddress} />
      <Typography.Text>
        {numeric(utilsBN.undecimalize(askAmount, decimals)).format('0,0.[000]')}
      </Typography.Text>
      <MintSymbol mintAddress={askMintAddress} />
    </Space>
  )
}

export default ColumnPay
