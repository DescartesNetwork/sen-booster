import { Col, Row, Table } from 'antd'
import FilterOrders from 'components/filterOrder'

import { REDEEM_COLUMNS } from './column'
import { OrderRequest } from 'view/retailer/orderList'

type RedeemTableProps = {
  dataSource: OrderRequest[]
  setOrders: (value: OrderRequest[]) => void
}

const RedeemTable = ({ dataSource, setOrders }: RedeemTableProps) => {
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{ paddingRight: 24, paddingLeft: 24 }}>
        <FilterOrders onChange={setOrders} />
      </Col>
      <Col span={24}>
        <Table
          columns={REDEEM_COLUMNS}
          pagination={false}
          dataSource={dataSource}
          rowKey={(record) => record.orderAddress}
          scroll={{ x: 780 }}
        />
      </Col>
    </Row>
  )
}

export default RedeemTable
