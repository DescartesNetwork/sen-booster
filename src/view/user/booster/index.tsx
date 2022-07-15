import { Col, Row } from 'antd'
import BoosterCard from './boosterCard'
import SearchAndFilter from './searchAndFilter'

const Booster = () => {
  return (
    <Row>
      <Col span={24}>
        <SearchAndFilter />
      </Col>
      <Col>
        {[1, 2, 3].map((booster) => (
          <BoosterCard />
        ))}
      </Col>
    </Row>
  )
}

export default Booster
