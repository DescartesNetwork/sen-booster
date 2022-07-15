import { Col, Layout, Row, Table } from 'antd'
import BSTTable from 'components/bstTable'
import Filter from 'components/filter'

function Redeem() {
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

export default Redeem
