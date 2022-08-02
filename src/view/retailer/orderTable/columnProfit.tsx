import { Typography } from 'antd'
import { useMemo } from 'react'

type ColumnProfitProps = {
  retailerAddress: string
  orderAddress: string
}
const ColumnProfit = ({ retailerAddress, orderAddress }: ColumnProfitProps) => {
  const profitRate = useMemo(() => {
    return 10
  }, [])

  return <Typography.Text>{profitRate}</Typography.Text>
}

export default ColumnProfit
