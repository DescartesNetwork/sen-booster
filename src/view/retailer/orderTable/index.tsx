import { Col, Row, Table } from 'antd'
import ExplainCard from './explainCard'
import FilterOrders from 'components/filterOrder'

import { OrderRequest } from '../orderList'
import { ORDER_COLUMNS } from './column'

type OrderTableProps = {
  dataSource: OrderRequest[]
  setOrders: (value: OrderRequest[]) => void
}
const OrderTable = ({ dataSource, setOrders }: OrderTableProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{ paddingLeft: 24, paddingRight: 24 }}>
        <FilterOrders onChange={setOrders} />
      </Col>
      <Col span={24}>
        <Table
          columns={ORDER_COLUMNS}
          dataSource={dataSource}
          pagination={false}
          rowKey={(record) => record.orderAddress}
          scroll={{ x: 780 }}
          expandRowByClick
          expandable={{
            expandedRowRender: (record) => (
              <ExplainCard orderAddress={record.orderAddress} />
            ),
          }}
        />
      </Col>
    </Row>
  )
}

export default OrderTable
