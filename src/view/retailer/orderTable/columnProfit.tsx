import { util } from '@sentre/senhub'

import { Typography } from 'antd'

import { useProfit } from 'hooks/useProfit'

type ColumnProfitProps = {
  orderAddress: string
}
const ColumnProfit = ({ orderAddress }: ColumnProfitProps) => {
  const { profit } = useProfit(orderAddress)
  return (
    <Typography.Text
      style={{
        color: profit >= 0 ? '#14E041' : '#F9575E',
      }}
    >
      {util.numeric(profit).format('0,0.[00]%')}
    </Typography.Text>
  )
}

export default ColumnProfit
