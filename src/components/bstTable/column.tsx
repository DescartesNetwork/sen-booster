import { Button, Space, Typography } from 'antd'
import StatusTag from './statusTag'
import IonIcon from '@sentre/antd-ionicon'

import { util } from '@sentre/senhub'
import { MintSymbol } from 'shared/antd/mint'

export const BST_COLUMNS = [
  {
    title: 'TIME',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'TRANSACTION ID',
    dataIndex: 'transactionId',
    key: 'transactionId',
    render: (text: string) => (
      <Space align="baseline">
        <Typography.Text
          onClick={() => window.open(util.explorer(text), '_blank')}
          style={{ fontWeight: 700, cursor: 'pointer' }}
        >
          {util.shortenAddress(text, 8, '...')}
        </Typography.Text>
        <Button
          type="text"
          size="small"
          onClick={() => window.open(util.explorer(text), '_blank')}
          icon={<IonIcon name="open-outline" />}
        />
      </Space>
    ),
  },
  {
    title: 'FROM',
    dataIndex: 'from',
    key: 'from',
    render: (text: string) => (
      <Typography.Text>{util.shortenAddress(text, 8, '...')}</Typography.Text>
    ),
  },
  {
    title: 'TO',
    dataIndex: 'to',
    key: 'to',
    render: (text: string) => (
      <Typography.Text>{util.shortenAddress(text, 8, '...')}</Typography.Text>
    ),
  },
  {
    title: 'AMOUNT',
    key: 'amount',
    dataIndex: 'amount',
    render: (text: string, record: any) => {
      const amountUi = util.numeric(text).format('0,0.[0000]')
      return (
        <Typography.Text
          style={{ color: record.isReceive ? '#14E041' : '#D72311' }}
        >
          <Space size={4}>
            {record.isReceive ? `+${amountUi}` : `-${amountUi}`}{' '}
            <MintSymbol mintAddress={record.mint} />
          </Space>
        </Typography.Text>
      )
    },
  },
  {
    title: 'STATUS',
    key: 'status',
    dataIndex: 'status',
    render: (text: string) => <StatusTag tag="success" />,
  },
]
