import BN from 'bn.js'
import moment from 'moment'
import { OrderState } from 'sen-exchange-core'

import { Typography } from 'antd'
import BidColumn from 'components/bidColumn'
import AskColumn from 'components/askColumn'
import OrderAction from 'view/user/redeemTable/orderAction'
import StatusTag from 'components/statusTag'
import ColumnRedemptionTime from './columnRedemptionTime'

import { DATE_FORMAT } from 'constant'
import { OrderRequest } from 'view/retailer/orderList'

export const REDEEM_COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'createAt',
    render: (createAt: BN) => (
      <Typography.Text>
        {moment(createAt.toNumber() * 1000).format(DATE_FORMAT)}
      </Typography.Text>
    ),
  },
  {
    title: 'PAY',
    dataIndex: 'orderAddress',
    render: (orderAddress: string) => <AskColumn orderAddress={orderAddress} />,
  },
  {
    title: 'RECEIVE',
    dataIndex: 'orderAddress',
    render: (orderAddress: string) => <BidColumn orderAddress={orderAddress} />,
  },

  {
    title: 'REDEMPTION TIME',
    dataIndex: 'orderAddress',
    render: (orderAddress: string) => (
      <ColumnRedemptionTime orderAddress={orderAddress} />
    ),
  },
  {
    title: 'STATUS',
    dataIndex: 'state',
    render: (state: OrderState) => <StatusTag state={state} />,
  },
  {
    title: 'ACTIONS',
    dataIndex: 'state',
    render: (state: OrderState, { orderAddress }: OrderRequest) => (
      <OrderAction orderState={state} orderAddress={orderAddress} />
    ),
  },
]
