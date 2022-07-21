import { utilsBN } from '@sen-use/web3'
import { util } from '@sentre/senhub'
import BN from 'bn.js'

import { Space, Typography } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import useMintDecimals from 'shared/hooks/useMintDecimals'

const OrderMintInfo = ({
  amount,
  mintAddress,
  size,
}: {
  amount: BN
  mintAddress: string
  size?: number
}) => {
  const decimals = useMintDecimals(mintAddress) || 0
  return (
    <Space>
      <MintAvatar mintAddress={mintAddress} size={size} />
      <Typography.Text>
        {util
          .numeric(utilsBN.undecimalize(amount, decimals))
          .format('0,0.[0000]')}
      </Typography.Text>
      <Typography.Text type="secondary">
        <MintSymbol mintAddress={mintAddress} />
      </Typography.Text>
    </Space>
  )
}
export default OrderMintInfo
