import { Button, Col, Row } from 'antd'
import RetailCard from './retailCard'
import FilterBooster from './filterBooster'

import { useAppRouter } from 'hooks/useAppRouter'
import { useState } from 'react'

const BoostList = () => {
  const { pushHistory } = useAppRouter()
  const [boosterAddresses, setBoosterAddr] = useState<string[]>([])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="space-between" gutter={[24, 24]}>
          <Col span={12}>
            <FilterBooster onChange={setBoosterAddr} />
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
          {boosterAddresses.map((boosterAddress) => (
            <Col xs={24} md={12} key={boosterAddress}>
              <RetailCard boosterAddress={boosterAddress} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default BoostList
