import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import RetailCard from './retailCard'

const BoostList = () => {
  const history = useHistory()
  return (
    <Row>
      <Col span={24}>
        <Filter />
        <Button onClick={() => history.push('/add-booster')}>
          Add booster
        </Button>
      </Col>
      <Col>
        {[1, 2, 3].map((booster) => (
          <RetailCard />
        ))}
      </Col>
    </Row>
  )
}

export default BoostList
