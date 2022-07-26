import { Col, Row, Table } from 'antd'

import { REDEEM_COLUMNS } from './column'
import { RedeemDataSource } from 'constant'

type RedeemTableProps = {
  dataSource: RedeemDataSource[]
}

const RedeemTable = ({ dataSource }: RedeemTableProps) => {
  console.log('dataSource: ', dataSource)
  return (
    <Row>
      <Col span={24}>
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
