import { OrderData } from 'sen-exchange-core'

import { Col, Row, Table } from 'antd'
import { REDEEM_COLUMNS } from './column'

type RedeemTableProps = {
  dataSource: OrderData[]
}

const RedeemTable = ({ dataSource }: RedeemTableProps) => {
  return (
    <Row>
      <Col>
        <Table
          columns={REDEEM_COLUMNS}
          dataSource={dataSource}
          rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
          pagination={false}
          scroll={{ x: 1000 }}
          // loading={isLoading}
        />
      </Col>
    </Row>
  )
}

export default RedeemTable
