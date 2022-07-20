import { useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Input, Row, Space, Typography } from 'antd'

import { useUpdateBudget } from 'hooks/actions/useUpdateBudget'
import { AppState } from 'model'
import { MintSymbol } from '@sen-use/components/dist'

type RetailerUpdateBudgetProps = {
  boosterAddr: string
}
const RetailerUpdateBudget = ({ boosterAddr }: RetailerUpdateBudgetProps) => {
  const bidTotal = useSelector(
    (state: AppState) => state.booster[boosterAddr].bidTotal,
  )
  const bidMint = useSelector(
    (state: AppState) => state.booster[boosterAddr].bidMint,
  )
  const [budget, setBudget] = useState(bidTotal.toString())
  const { updateBudget } = useUpdateBudget()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Amount</Typography.Text>
          <Input
            prefix={<MintSymbol mintAddress={bidMint.toBase58()} />}
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="input-budget"
          />
        </Space>
      </Col>
      <Col span={24}>
        <Button size="large" block type="primary" onClick={updateBudget}>
          Update
        </Button>
      </Col>
    </Row>
  )
}

export default RetailerUpdateBudget
