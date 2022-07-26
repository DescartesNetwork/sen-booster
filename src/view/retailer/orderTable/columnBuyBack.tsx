import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import BN from 'bn.js'

import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components/dist'

import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { numeric } from '@sentre/senhub/dist/shared/util'

type ColumnBuyBackProps = {
  bidAmount: BN
  boosterAddress: string
}

const ColumnBuyBack = ({ bidAmount, boosterAddress }: ColumnBuyBackProps) => {
  const boosterData = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const bidMintAddress = boosterData ? boosterData.bidMint.toBase58() : ''
  const decimals = useMintDecimals(bidMintAddress) || 0

  return (
    <Space>
      <MintAvatar mintAddress={bidMintAddress} />
      <Typography.Text>
        {numeric(utilsBN.undecimalize(bidAmount, decimals)).format('0,0.[000]')}
      </Typography.Text>
      <MintSymbol mintAddress={bidMintAddress} />
    </Space>
  )
}

export default ColumnBuyBack
