import { BN } from '@project-serum/anchor'
import moment from 'moment'
import { OrderState } from 'sen-exchange-core'

import { Typography } from 'antd'
import StatusTag from 'components/statusTag'
import ColumnProfit from './columnProfit'
import AskColumn from 'components/askColumn'
import BidColumn from 'components/bidColumn'
import ColumnLockTime from './columnLockTime'

import { DATE_FORMAT } from 'constant'

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
    title: 'PAY',
    dataIndex: 'orderAddress',
    key: 'orderAddress',
    render: (orderAddress: string) => <BidColumn orderAddress={orderAddress} />,
  },
  {
    title: 'BUY-BACK',
    dataIndex: 'orderAddress',
    key: 'orderAddress',
    render: (orderAddress: string) => <AskColumn orderAddress={orderAddress} />,
  },
  {
    title: 'LOCK TIME',
    dataIndex: 'lockTime',
    key: 'lockTime',
    render: (lockTime: BN) => <ColumnLockTime lockTime={lockTime} />,
  },
  {
    title: 'PROFIT',
    key: 'orderAddress',
    dataIndex: 'orderAddress',
    render: (orderAddress: string) => (
      <ColumnProfit orderAddress={orderAddress} />
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
