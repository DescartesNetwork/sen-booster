import { Button, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import RetailCard from './retailCard'

import { useAppRouter } from 'hooks/useAppRouter'
import { useSelector } from 'react-redux'
import { AppState } from 'model'

const BoostList = () => {
  const { pushHistory } = useAppRouter()
  const boosters = useSelector((state: AppState) => state.booster)
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Filter />
          </Col>
          <Col>
            <Button onClick={() => pushHistory('/create-booster')}>
              Add booster
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {Object.keys(boosters).map((boosterAddr) => (
            <Col xs={24} md={12} key={boosterAddr}>
              <RetailCard boosterAddr={boosterAddr} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default BoostList
