import { Col, Row } from 'antd'
import BoosterCard from './boosterCard'
import SearchAndFilter from './searchAndFilter'

import { Mode } from 'constant'
import { useFilterBoosters } from 'hooks/boosters/useFilterBoosters'
import { useSearchedBoosters } from 'hooks/boosters/useSearchBoosters'

const Booster = () => {
  const { filteredBoosters } = useFilterBoosters(Mode.User)
  const listBoosters = useSearchedBoosters(filteredBoosters)

  return (
    <Row>
      <Col span={24}>
        <SearchAndFilter />
      </Col>
      <Col>
        {Object.keys(listBoosters).map((boosterAddr) => (
          <BoosterCard boosterAddr={boosterAddr} />
        ))}
      </Col>
    </Row>
  )
}

export default Booster
