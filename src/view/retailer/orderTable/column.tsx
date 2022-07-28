import BN from 'bn.js'
import moment from 'moment'
import { OrderData, OrderState } from 'sen-exchange-core'

import { Typography } from 'antd'
import ColumnBuyBack from './columnBuyBack'
import ColumnPay from './columnPay'
import StatusTag from 'components/statusTag'

import { DATE_FORMAT } from 'constant'

const ONE_DAY = 24 * 60 * 60

export const ORDER_COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'createAt',
    key: 'createAt',
    render: (createAt: BN) => (
      <Typography.Text>
        {moment(Number(createAt) * 1000).format(DATE_FORMAT)}
      </Typography.Text>
    ),
  },
  {
    title: 'BUY-BACK',
    dataIndex: 'bidAmount',
    key: 'bidAmount',
    render: (bidAmount: BN, { retailer }: OrderData) => (
      <ColumnBuyBack
        bidAmount={bidAmount}
        boosterAddress={retailer.toBase58()}
      />
    ),
  },
  {
    title: 'PAY',
    dataIndex: 'askAmount',
    key: 'askAmount',
    render: (askAmount: BN, { retailer }: OrderData) => (
      <ColumnPay askAmount={askAmount} boosterAddress={retailer.toBase58()} />
    ),
  },
  {
    title: 'LOCK TIME',
    dataIndex: 'lockTime',
    key: 'lockTime',
    render: (lockTime: BN) => {
      return (
        <Typography.Text>
          {lockTime.div(new BN(ONE_DAY)).toString()} days
        </Typography.Text>
      )
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
    render: (state: OrderState) => {
      return <StatusTag state={state} />
    },
  },
]
