import { Col, Row } from 'antd'
import { PublicKey } from '@solana/web3.js'

type BoostPairProps = {
  boosterAddr: string
}

const BoostPair = ({ boosterAddr }: BoostPairProps) => {
  return (
    <Row>
      <Col>Boost Pair Data</Col>
    </Row>
  )
}

export default BoostPair
