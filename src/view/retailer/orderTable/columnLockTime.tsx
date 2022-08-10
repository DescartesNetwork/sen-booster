import { Typography } from 'antd'
import BN from 'bn.js'
import { SECONDS_PER_DAY } from 'constant'
import { useMemo } from 'react'

const LOCK_TIME: Record<number, string> = {
  0: 'None',
  1: '1 day',
  7: '7 days',
  30: '1 month',
  60: '2 months',
  90: '3 months',
  120: '4 months',
  365: '1 year',
  730: '2 years',
}

const ColumnLockTime = ({ lockTime }: { lockTime: BN }) => {
  const parseTime = useMemo(() => {
    const time = lockTime.div(new BN(SECONDS_PER_DAY)).toNumber()
    return LOCK_TIME[time]
  }, [lockTime])

  return <Typography.Text>{parseTime}</Typography.Text>
}

export default ColumnLockTime
