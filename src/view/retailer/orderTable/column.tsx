import BN from 'bn.js'
import moment from 'moment'
import { OrderData, OrderState } from 'sen-exchange-core'

import { Typography } from 'antd'
import ColumnBuyBack from './columnBuyBack'
import ColumnPay from './columnPay'
import StatusTag from 'components/statusTag'
import ColumnProfit from './columnProfit'

import { DATE_FORMAT, SECONDS_PER_DAY } from 'constant'

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
    render: (lockTime: BN) => {
      return (
        <Typography.Text>
          {lockTime.div(new BN(SECONDS_PER_DAY)).toString()} days
        </Typography.Text>
      )
    },
  },
  {
    title: 'PROFIT',
    key: 'orderAddress',
    dataIndex: 'orderAddress',
    render: (orderAddress: string, { retailer }: OrderData) => (
      <ColumnProfit
        orderAddress={orderAddress}
        retailerAddress={retailer.toBase58()}
      />
    ),
  },
  {
    title: 'STATUS',
    key: 'state',
    dataIndex: 'state',
    render: (state: OrderState) => {
      return <StatusTag state={state} />
    },
  },
]
