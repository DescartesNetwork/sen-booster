import { Col, Row, Table } from 'antd'
import React from 'react'
import { BST_COLUMNS } from './column'

const BTSTable = () => {
  return (
    <Row>
      <Col>
        <Table
          columns={BST_COLUMNS}
          // dataSource={transaction.slice(0, amountRow)}
          rowClassName={(record, index) => (index % 2 ? 'odd-row' : 'even-row')}
          pagination={false}
          scroll={{ x: 1000 }}
          // loading={isLoading}
        />
      </Col>
    </Row>
  )
}

export default BTSTable
