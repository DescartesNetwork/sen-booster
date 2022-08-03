import { useState } from 'react'

import { Button, Col, Empty, Row } from 'antd'

import RetailCard from './retailCard'
import FilterBooster from './filterBooster'

import { useAppRouter } from 'hooks/useAppRouter'

const BoostList = () => {
  const [filteredBoosters, setFilteredBoosters] = useState<string[]>([])
  const { pushHistory } = useAppRouter()

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row justify="space-between" gutter={[24, 24]}>
          <Col span={12}>
            <FilterBooster onChange={setFilteredBoosters} />
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
          {!filteredBoosters.length ? (
            <Col span={24}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={'You have not created any booster'}
              />
            </Col>
          ) : (
            filteredBoosters.map((boosterAddress) => (
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
