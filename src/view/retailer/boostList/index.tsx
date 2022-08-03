import { useState } from 'react'
import { useUI } from '@sentre/senhub'

import { Button, Col, Empty, Row } from 'antd'

import RetailCard from './retailCard'
import FilterBooster from './filterBooster'

import { useAppRouter } from 'hooks/useAppRouter'

const BoostList = () => {
  const [filteredBoosters, setFilteredBoosters] = useState<string[]>([])
  const { pushHistory } = useAppRouter()
  const {
    ui: { width },
  } = useUI()
  const isMobile = width < 767
  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row align="middle" gutter={[24, 24]}>
          <Col xs={24} md={20} lg={20} xl={12}>
            <FilterBooster onChange={setFilteredBoosters} />
          </Col>
          <Col xs={24} md={4} lg={4} xl={12} style={{ textAlign: 'right' }}>
            <Button
              type="primary"
              onClick={() => pushHistory('/create-booster')}
              block={isMobile}
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
