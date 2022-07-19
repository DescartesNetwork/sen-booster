import React, { Fragment } from 'react'

import { Button } from 'antd'
import { useFreezeBooster } from 'hooks/actions/useFreezeBooster'

const FreezeBoost = () => {
  const { freezeBooster, loading } = useFreezeBooster()
  console.log(loading)
  return (
    <Fragment>
      Content here
      <Button onClick={freezeBooster}>Freeze</Button>
    </Fragment>
  )
}

export default FreezeBoost
