import { Button, Col, Empty, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import RetailCard from './retailCard'

import { useAppRouter } from 'hooks/useAppRouter'
import { useOwnBoosters } from 'hooks/boosters/useOwnBoosters'

const BoostList = () => {
  const { pushHistory } = useAppRouter()
  const { ownBoosters } = useOwnBoosters()

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Filter />
          </Col>
          <Col>
            <Button
              type="primary"
              onClick={() => pushHistory('/create-booster')}
            >
              Add booster
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {!ownBoosters.length ? (
            <Col span={24}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={'You have not created any booster'}
              />
            </Col>
          ) : (
            ownBoosters.map((boosterAddress) => (
              <Col xs={24} md={12} key={boosterAddress}>
                <RetailCard boosterAddress={boosterAddress} />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default BoostList
