import { Col, Row } from 'antd'
import Filter from 'components/filter'
import BSTTable from 'components/bstTable'

function OrderList() {
  return (
    <Row>
      <Col>
        <Filter />
      </Col>
      <Col>
        <BSTTable />
      </Col>
    </Row>
  )
}

export default OrderList
