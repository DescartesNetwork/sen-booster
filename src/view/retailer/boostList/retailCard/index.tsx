import { Col, Row } from 'antd'
import BoosterProcess from 'components/boosterProcess'
import { AppState } from 'model'
import { useSelector } from 'react-redux'
import Manage from '../manage'
import BoostPair from './boostPair'

type RetailCardProps = {
  boosterAddr: string
}
const RetailCard = ({ boosterAddr }: RetailCardProps) => {
  const { bidMint, askMint, bidTotal, bidReserve } = useSelector(
    (state: AppState) => state.booster[boosterAddr],
  )
  return (
    <Row>
      <BoostPair pair={[bidMint, askMint]} />
      <Col>Time and isBoost</Col>
      <Col>
        <BoosterProcess bidReserve={bidReserve} budget={bidTotal} />
      </Col>
      <Col>
        <Manage boosterAddr={boosterAddr} />
      </Col>
    </Row>
  )
}

export default RetailCard
