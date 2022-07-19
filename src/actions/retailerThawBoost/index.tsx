import { Button } from 'antd'
import { useThawBooster } from 'hooks/actions/useThawBooster'
import React, { Fragment } from 'react'

const ThawBoost = () => {
  const { thawBooster } = useThawBooster()
  return (
    <Fragment>
      <Button onClick={thawBooster}>Thaw Boost</Button>
    </Fragment>
  )
}

export default ThawBoost
