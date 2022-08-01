import BN from 'bn.js'
import moment from 'moment'
import { OrderState } from 'sen-exchange-core'

import { Typography } from 'antd'
import BidColumn from 'components/bidColumn'
import AskColumn from 'components/askColumn'
import OrderAction from 'view/user/redeemTable/orderAction'
import StatusTag from 'components/statusTag'

import { DATE_FORMAT, ONE_DAY } from 'constant'
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
    title: 'LOCK TIME',
    dataIndex: 'lockTime',
    render: (lockTime: BN) => (
      <Typography.Text>
        {lockTime.div(new BN(ONE_DAY)).toString()} days
      </Typography.Text>
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
