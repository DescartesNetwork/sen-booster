import BN from 'bn.js'
import { util } from '@sentre/senhub'
import moment from 'moment'

import { Button, Space, Typography } from 'antd'
import StatusTag from './statusTag'
import IonIcon from '@sentre/antd-ionicon'
import BidColumn from 'components/bidColumn'
import AskColumn from 'components/askColumn'
import OrderAction from 'view/user/redeemTable/orderAction'

import { DATE_FORMAT, RedeemDataSource } from 'constant'

export const REDEEM_COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'lastUpdate',
    render: (time: string) => {
      return (
        <Typography.Text>
          {moment(Number(time) * 1000).format(DATE_FORMAT)}
        </Typography.Text>
      )
    },
  },
  {
    title: 'ORDER ID',
    dataIndex: 'orderId',
    render: (orderId: string) => (
      <Space align="baseline">
        <Typography.Text
          onClick={() => window.open(util.explorer(orderId), '_blank')}
          style={{ fontWeight: 700, cursor: 'pointer' }}
        >
          {util.shortenAddress(orderId, 8, '...')}
        </Typography.Text>
        <Button
          type="text"
          size="small"
          onClick={() => window.open(util.explorer(orderId), '_blank')}
          icon={<IonIcon name="open-outline" />}
        />
      </Space>
    ),
  },
  {
    title: 'PAY',
    dataIndex: 'orderId',
    render: (orderId: string) => <BidColumn orderId={orderId} />,
  },
  {
    title: 'RECEIVE',
    dataIndex: 'orderId',
    render: (orderId: string) => <AskColumn orderId={orderId} />,
  },
  {
    title: 'LOCK TIME',
    dataIndex: 'lockTime',
    render: (lockTime: BN) => {
      return <Typography.Text>{lockTime.toString()} days</Typography.Text>
    },
  },
  {
    title: 'STATUS',
    dataIndex: 'state',
    render: (state: string) => <StatusTag tag="success" />,
  },
  {
    title: 'ACTIONS',
    dataIndex: 'state',
    render: (state: string, { orderId }: RedeemDataSource) => (
      <OrderAction orderState={state} orderAddress={orderId} />
    ),
  },
]
