import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { OrderState } from 'sen-exchange-core'

import { Tag } from 'antd'

import { AppState } from 'model'
import { Mode } from 'constant'
import { useRedeemTime } from 'hooks/useRedeemTime'

const STATUS_COLOR: Record<string, number[]> = {
  approved: [12, 161, 191],
  open: [212, 177, 6],
  rejected: [249, 87, 94],
  done: [20, 224, 65],
  canceled: [249, 87, 94],
  ready: [64, 169, 255],
  uninitialized: [0, 0, 0],
}

const StatusTag = ({
  state,
  orderAddress,
}: {
  state: OrderState
  orderAddress?: string
}) => {
  const { mode } = useSelector((state: AppState) => state.settings)
  const { getRedeemTime } = useRedeemTime()

  const statusText = useMemo(() => {
    if (!orderAddress || !state.approved) return Object.keys(state)[0]

    const redeemTime = getRedeemTime(orderAddress)
    if (redeemTime * 1000 <= Date.now()) return 'ready'

    return Object.keys(state)[0]
  }, [getRedeemTime, orderAddress, state])

  const setTagColor = (opacity?: number) => {
    const color = STATUS_COLOR[statusText]
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity || 1})`
  }

  return (
    <Tag
      style={{
        margin: 0,
        borderRadius: 4,
        color: setTagColor(),
        textTransform: 'capitalize',
      }}
      color={setTagColor(0.1)}
    >
      {mode === Mode.User && state.open ? 'Waiting' : statusText}
    </Tag>
  )
}

export default StatusTag
