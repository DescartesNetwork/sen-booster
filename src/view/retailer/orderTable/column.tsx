import BN from 'bn.js'
import { OrderData } from 'sen-exchange-core'

import { Typography } from 'antd'
import ColumnBuyBack from './columnBuyBack'
import ColumnPay from './columnPay'
import StatusTag from 'components/statusTag'
import ColumnCreatedAt from './columnCreatedAt'

export const ORDER_COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'metadata',
    key: 'metadata',
    render: (metadata: number[]) => <ColumnCreatedAt metadata={metadata} />,
  },
  {
    title: 'BUY-BACK',
    dataIndex: 'askAmount',
    key: 'askAmount',
    render: (askAmount: BN, { retailer }: OrderData) => (
      <ColumnBuyBack
        askAmount={askAmount}
        boosterAddress={retailer.toBase58()}
      />
    ),
  },
  {
    title: 'PAY',
    dataIndex: 'bidAmount',
    key: 'bidAmount',
    render: (bidAmount: BN, { retailer }: OrderData) => (
      <ColumnPay bidAmount={bidAmount} boosterAddress={retailer.toBase58()} />
    ),
  },
  {
    title: 'LOCK TIME',
    dataIndex: 'lockTime',
    key: 'lockTime',
    render: (lockTime: string) => {
      return <Typography.Text>{lockTime.toString()}</Typography.Text>
    },
  },
  // {
  //   title: 'DEPRECIATION',
  //   key: 'depreciation',
  //   dataIndex: 'depreciation',
  //   render: (depreciation: string) => (
  //     <Typography.Text>{depreciation}</Typography.Text>
  //   ),
  // },
  {
    title: 'STATUS',
    key: 'state',
    dataIndex: 'state',
    render: (state: Object) => {
      console.log(Object.keys(state)[0])
      return <StatusTag state={Object.keys(state)[0]} />
    },
  },
]
