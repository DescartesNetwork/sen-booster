import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import RetailCard from './retailCard'
import { useAppRouter } from 'hooks/useAppRouter'
import { useFilterBoosters } from 'hooks/boosters/useFilterBoosters'
import { useSearchedBoosters } from 'hooks/boosters/useSearchBoosters'
import { Mode } from 'constant'

const BoostList = () => {
  const { pushHistory } = useAppRouter()
  const { filteredBoosters } = useFilterBoosters(Mode.Retailer)
  const listBoosters = useSearchedBoosters(filteredBoosters)
  return (
    <Row>
      <Col span={24}>
        <Filter />
        <Button onClick={() => pushHistory('/create-booster')}>
          Add booster
        </Button>
      </Col>
      <Col>
        {Object.keys(listBoosters).map((boosterAddr) => (
          <RetailCard boosterAddr={boosterAddr} />
        ))}
      </Col>
    </Row>
  )
}

export default BoostList
