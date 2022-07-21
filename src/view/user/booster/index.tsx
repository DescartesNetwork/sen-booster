import { useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import BoosterCard from './boosterCard'
import SearchAndFilter from './searchAndFilter'

import { AppState } from 'model'

const Booster = () => {
  // const { filteredBoosters } = useFilterBoosters(Mode.User)
  // const listBoosters = useSearchedBoosters(filteredBoosters)
  const boosters = useSelector((state: AppState) => state.booster)

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SearchAndFilter />
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {Object.keys(boosters).map((boosterAddress) => (
            <Col span={24}>
              <BoosterCard boosterAddress={boosterAddress} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Booster
