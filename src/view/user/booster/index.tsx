import { useState } from 'react'

import { Col, Row } from 'antd'
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
          {displayBoosters.map((boosterAddress) => (
            <Col span={24} key={boosterAddress}>
              <BoosterCard boosterAddress={boosterAddress} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Booster
