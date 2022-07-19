import { Button, Row } from 'antd'
import { useUpdateBudget } from 'hooks/actions/useUpdateBudget'
import React from 'react'

const RetailerUpdateBudget = () => {
  const { updateBudget } = useUpdateBudget()
  return (
    <Row>
      Content
      <Button onClick={updateBudget}>Update</Button>
    </Row>
  )
}

export default RetailerUpdateBudget
