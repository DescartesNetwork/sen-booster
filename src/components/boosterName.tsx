import { PublicKey } from '@solana/web3.js'

import { Row, Typography } from 'antd'

type BoosterSymbolProps = {
  pair: [PublicKey, PublicKey]
}

const BoosterName = ({ pair }: BoosterSymbolProps) => {
  return (
    <Row>
      <Typography.Title level={3}>USDC.SNTRLP-SNTR</Typography.Title>
    </Row>
  )
}

export default BoosterName
