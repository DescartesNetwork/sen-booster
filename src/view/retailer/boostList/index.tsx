import { useHistory } from 'react-router-dom'
import { Button, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import RetailCard from './retailCard'
import { useAppRouter } from 'hooks/useAppRouter'

const BoostList = () => {
  const { pushHistory } = useAppRouter()
  return (
    <Row>
      <Col span={24}>
        <Filter />
        <Button onClick={() => pushHistory('/add-booster')}>Add booster</Button>
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
