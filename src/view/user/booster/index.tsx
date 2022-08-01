import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import BoosterCard from './boosterCard'
import SearchAndFilter from './searchAndFilter'

import { AppState } from 'model'

const Booster = () => {
  const boosters = useSelector((state: AppState) => state.boosters)
  const sortedBoosters = Object.keys(boosters).sort(
    (addressA: string, addressB: string) => {
      const a_startAt = boosters[addressA].startAt
      const b_startAt = boosters[addressB].startAt

      return Number(b_startAt) - Number(a_startAt)
    },
  )

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SearchAndFilter />
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {sortedBoosters.map((boosterAddress) => (
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
