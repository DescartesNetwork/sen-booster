import { Table } from 'antd'
import ExplainCard from './explainCard'
import { OrderRequest } from '../orderList'

import { ORDER_COLUMNS } from './column'

type OrderTableProps = {
  dataSource: OrderRequest[]
}
const OrderTable = ({ dataSource }: OrderTableProps) => {
  return (
    <Table
      columns={ORDER_COLUMNS}
      dataSource={dataSource}
      pagination={false}
      rowKey={(record) => record.orderAddress}
      expandable={{
        expandedRowRender: (record) => (
          <ExplainCard orderAddress={record.orderAddress} />
        ),
      }}
    />
  )
}

export default OrderTable
