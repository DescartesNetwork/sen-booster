import { useSelector } from 'react-redux'
import moment from 'moment'

import { Typography } from 'antd'

import { useRedeemTime } from 'hooks/useRedeemTime'
import { DATE_FORMAT } from 'constant'
import { AppState } from 'model'

type ColumnRedemptionTimeProps = {
  orderAddress: string
}

const ColumnRedemptionTime = ({ orderAddress }: ColumnRedemptionTimeProps) => {
  const createAt = useSelector(
    (state: AppState) => state.orders[orderAddress].createAt,
  )
  const { getRedeemTime } = useRedeemTime()
  const redemptionTime = getRedeemTime(orderAddress)
  const time = redemptionTime ? redemptionTime : createAt.toNumber()

  return (
    <Typography.Text>{moment(time * 1000).format(DATE_FORMAT)}</Typography.Text>
  )
}

export default ColumnRedemptionTime
