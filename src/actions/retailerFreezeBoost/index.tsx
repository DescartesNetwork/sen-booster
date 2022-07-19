import { Button } from 'antd'
import { useFreezeBooster } from 'hooks/actions/useFreezeBooster'
import React, { Fragment } from 'react'

const FreezeBoost = () => {
  const { freezeBooster, loading } = useFreezeBooster()
  return (
    <Fragment>
      Content here
      <Button onClick={freezeBooster}>Freeze</Button>
    </Fragment>
  )
}

export default FreezeBoost
