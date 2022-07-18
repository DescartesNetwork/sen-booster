import { Col, Row, Table } from 'antd'
import { OrderData } from 'model/order.controller'
import React from 'react'
import { ORDER_COLUMNS } from './column'

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
          scroll={{ x: 1000 }}
          // loading={isLoading}
        />
      </Col>
    </Row>
  )
}

export default OrderTable
