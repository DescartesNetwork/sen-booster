import { Col, Row, Table } from 'antd'
import React from 'react'
import { ORDER_COLUMNS } from './column'
import { OrderData } from 'sen-exchange-core'

type OrderTableProps = {
  dataSource: OrderData[]
}

const OrderTable = ({ dataSource }: OrderTableProps) => {
  return (
    <Row>
      <Col>
        <Table
          columns={ORDER_COLUMNS}
          dataSource={dataSource}
          rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
          pagination={false}
        />
      </Col>
    </Row>
  )
}

export default OrderTable
