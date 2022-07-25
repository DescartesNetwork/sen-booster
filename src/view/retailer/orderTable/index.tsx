import { Table } from 'antd'
import { ORDER_COLUMNS } from './column'

import { OrderData } from 'sen-exchange-core'
import ExplainCard from './explainCard'

type Order = OrderData & { orderAddress: string }

type OrderTableProps = {
  dataSource: Order[]
}

const OrderTable = ({ dataSource }: OrderTableProps) => {
  return (
    <Table
      columns={ORDER_COLUMNS}
      dataSource={dataSource}
      pagination={false}
      rowKey={(record) => record.retailer.toBase58()}
      expandable={{
        expandedRowRender: (record) => (
          <ExplainCard orderAddress={record.orderAddress} />
        ),
      }}
    />
  )
}

export default OrderTable
