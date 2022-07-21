import BN from 'bn.js'

import { Button, Space, Typography } from 'antd'
import StatusTag from './statusTag'
import IonIcon from '@sentre/antd-ionicon'

import { util } from '@sentre/senhub'
import BidColumn from 'components/bidColumn'
import AskColumn from 'components/askColumn'

// retailer: web3.PublicKey;
//     authority: web3.PublicKey;
//     bidPrice: BN;
//     bidAmount: BN;
//     lockTime: BN;
//     state: never;
//     metadata: number[];

export const REDEEM_COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'ORDER ID',
    dataIndex: 'pubkey',
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
    dataIndex: 'pubkey',
    render: (orderId: string) => <BidColumn orderId={orderId} />,
  },
  {
    title: 'RECEIVE',
    dataIndex: 'pubkey',
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
    title: 'ACTION',
    key: 'status',
    dataIndex: 'status',
    render: (text: string) => <StatusTag tag="success" />,
  },
]
