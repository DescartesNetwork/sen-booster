import { Button } from 'antd'
import { useCancelOrder } from 'hooks/actions/useCancelOrder'
import React, { Fragment } from 'react'

const Cancel = () => {
  const { cancelOrder, loading } = useCancelOrder()
  return (
    <Fragment>
      <Button onClick={cancelOrder}>Cancel</Button>
    </Fragment>
  )
}

export default Cancel
