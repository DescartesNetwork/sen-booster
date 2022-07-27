import BN from 'bn.js'
import { util } from '@sentre/senhub'
import moment from 'moment'
import { utilsBN } from '@sen-use/web3'
import { Address } from '@project-serum/anchor'
import { OrderData } from 'sen-exchange-core'

import { Button, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import BidColumn from 'components/bidColumn'
import AskColumn from 'components/askColumn'
import OrderAction from 'view/user/redeemTable/orderAction'
import StatusTag from 'components/statusTag'

import { DATE_FORMAT } from 'constant'

export const REDEEM_COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'lastUpdate',
    render: (lastUpdate: BN) => {
      const time = utilsBN.undecimalize(lastUpdate, 0)
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
    render: (orderId: Address) => (
      <Space align="baseline">
        <Typography.Text
          onClick={() =>
            window.open(util.explorer(orderId.toString()), '_blank')
          }
          style={{ fontWeight: 700, cursor: 'pointer' }}
        >
          {util.shortenAddress(orderId.toString(), 8, '...')}
        </Typography.Text>
        <Button
          type="text"
          size="small"
          onClick={() =>
            window.open(util.explorer(orderId.toString()), '_blank')
          }
          icon={<IonIcon name="open-outline" />}
        />
      </Space>
    ),
  },
  {
    title: 'PAY',
    dataIndex: 'orderId',
    render: (orderId: Address) => <BidColumn orderId={orderId} />,
  },
  {
    title: 'RECEIVE',
    dataIndex: 'orderId',
    render: (orderId: Address) => <AskColumn orderId={orderId} />,
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
    render: (state: Record<string, any>) => {
      const currentState = Object.keys(state)[0]
      return <StatusTag state={currentState} />
    },
  },
  {
    title: 'ACTIONS',
    dataIndex: 'state',
    render: (
      state: Record<string, any>,
      { orderId }: OrderData & { orderId: Address },
    ) => {
      const currentState = Object.keys(state)[0]
      return <OrderAction orderState={currentState} orderAddress={orderId} />
    },
  },
]
