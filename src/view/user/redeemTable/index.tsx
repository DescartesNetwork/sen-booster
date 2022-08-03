import { Col, Row, Table } from 'antd'

import { REDEEM_COLUMNS } from './column'
import { OrderRequest } from 'view/retailer/orderList'

type RedeemTableProps = {
  dataSource: OrderRequest[]
}

const RedeemTable = ({ dataSource }: RedeemTableProps) => {
  return (
    <Row>
      <Col span={24}>
        <Table
          columns={REDEEM_COLUMNS}
          pagination={false}
          dataSource={dataSource}
          rowKey={(record) => record.orderAddress}
        />
      </Col>
    </Row>
  )
}

export default RedeemTable
