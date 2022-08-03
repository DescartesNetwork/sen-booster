import { useState } from 'react'
import LazyLoad from '@sentre/react-lazyload'

import { Col, Empty, Row } from 'antd'
import BoosterCard from './boosterCard'
import SearchAndFilter from './searchAndFilter'

const Booster = () => {
  const [displayBoosters, setDisplayBoosters] = useState<string[]>([])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SearchAndFilter onChange={setDisplayBoosters} />
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {!displayBoosters.length ? (
            <Col span={24}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={'No booster exist'}
              />
            </Col>
          ) : (
            displayBoosters.map((boosterAddress) => (
              <Col span={24} key={boosterAddress}>
                <LazyLoad
                  height={276}
                  scrollContainer={
                    document.getElementById('sen-booster-scroll-lazyload') ||
                    undefined
                  }
                >
                  <BoosterCard boosterAddress={boosterAddress} />
                </LazyLoad>
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default Booster
