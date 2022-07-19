import { Button } from 'antd'
import { useRedeemOrder } from 'hooks/actions/useRedeemOrder'
import React, { Fragment } from 'react'

const Redeem = () => {
  const { redeemOrder, loading } = useRedeemOrder()
  return (
    <Fragment>
      <Button onClick={redeemOrder}>Redeem</Button>
    </Fragment>
  )
}

export default Redeem
