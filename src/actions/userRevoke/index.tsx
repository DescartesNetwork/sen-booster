import { useSelector } from 'react-redux'

import { Button } from 'antd'

import { AppState } from 'model'
import { useRevokeOrder } from 'hooks/actions/useRevokeOrder'

type RevokeOrderProps = {
  orderAddress: string
}

const RevokeOrder = ({ orderAddress }: RevokeOrderProps) => {
  const state = useSelector(
    (state: AppState) => state.orders[orderAddress].state,
  )
  const askReserve = useSelector(
    (state: AppState) => state.orders[orderAddress].askReserve,
  )
  const { revokeOrder, loading } = useRevokeOrder()

  return (
    <Button
      loading={loading}
      disabled={!state.rejected || askReserve.isZero()}
      onClick={() => revokeOrder(orderAddress)}
      size="small"
      type="text"
      style={{ color: '#0FB5B8' }}
    >
      Revoke
    </Button>
  )
}

export default RevokeOrder
