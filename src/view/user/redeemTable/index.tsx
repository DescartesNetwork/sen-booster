import { OrderData } from 'sen-exchange-core'
import { Address } from '@project-serum/anchor'

import { Col, Row, Table } from 'antd'

import { REDEEM_COLUMNS } from './column'

type RedeemTableProps = {
  dataSource: (OrderData & { orderId: Address })[]
}

const RedeemTable = ({ dataSource }: RedeemTableProps) => {
  return (
    <Row>
      <Col span={24}>
        <Table
          columns={REDEEM_COLUMNS}
          dataSource={dataSource}
          rowClassName={(_, index) => (index % 2 ? 'odd-row' : 'even-row')}
          pagination={false}
          scroll={{ x: 1000 }}
        />
      </Col>
    </Row>
  )
}

export default RedeemTable
