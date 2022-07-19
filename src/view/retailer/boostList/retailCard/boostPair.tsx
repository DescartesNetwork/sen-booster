import { Col, Row } from 'antd'
import { PublicKey } from '@solana/web3.js'

type BoostPairProps = {
  pair: [PublicKey, PublicKey]
}

const BoostPair = ({ pair }: BoostPairProps) => {
  return (
    <Row>
      <Col>Boost Pair Data</Col>
    </Row>
  )
}

export default BoostPair
