import { useSelector } from 'react-redux'

import { Tag } from 'antd'

import { AppState } from 'model'
import { Mode } from 'constant'
import { OrderState } from 'sen-exchange-core'

const STATUS_COLOR: Record<string, number[]> = {
  approved: [12, 161, 191],
  open: [212, 177, 6],
  rejected: [249, 87, 94],
  done: [20, 224, 65],
  canceled: [249, 87, 94],
  uninitialized: [0, 0, 0],
}

const StatusTag = ({ state }: { state: OrderState }) => {
  const { mode } = useSelector((state: AppState) => state.settings)
  const setTagColor = (opacity?: number) => {
    const color = STATUS_COLOR[Object.keys(state)[0]]
    if (opacity)
      return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
    return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${1})`
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
      {mode === Mode.User && state.open ? 'Waiting' : Object.keys(state)[0]}
    </Tag>
  )
}

export default StatusTag
