import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IPFS } from '@sen-use/web3'

import { Button, Col, Input, Row, Space, Typography } from 'antd'

import { useUpdateBudget } from 'hooks/actions/useUpdateBudget'
import { AppState } from 'model'
import { MintSymbol } from '@sen-use/components/dist'
import { Metadata } from 'hooks/actions/useInitializeBooster'
import { TOKEN } from 'constant'

type RetailerUpdateBudgetProps = {
  boosterAddress: string
}
const RetailerUpdateBudget = ({
  boosterAddress,
}: RetailerUpdateBudgetProps) => {
  const [budget, setBudget] = useState<string>('0')
  const metadata = useSelector(
    (state: AppState) => state.booster[boosterAddress].metadata,
  )
  const bidMint = useSelector(
    (state: AppState) => state.booster[boosterAddress].bidMint,
  )
  const { updateBudget } = useUpdateBudget()

  const setDefaultValue = useCallback(async () => {
    const ipfs = new IPFS(TOKEN)
    const data: Metadata = await ipfs.get(metadata)
    if (!data.budget) return setBudget('0')
    return setBudget(data.budget)
  }, [metadata])

  useEffect(() => {
    setDefaultValue()
  }, [setDefaultValue])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Amount</Typography.Text>
          <Input
            prefix={<MintSymbol mintAddress={bidMint} />}
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
