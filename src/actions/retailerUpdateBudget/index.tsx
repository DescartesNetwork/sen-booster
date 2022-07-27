import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Input, Row, Space, Typography } from 'antd'
import { MintSymbol } from '@sen-use/components'

import { useUpdateBudget } from 'hooks/actions/useUpdateBudget'
import { AppState } from 'model'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'
import { Ipfs } from 'senUse/ipfs'

type RetailerUpdateBudgetProps = {
  boosterAddress: string
}
const RetailerUpdateBudget = ({
  boosterAddress,
}: RetailerUpdateBudgetProps) => {
  const [nextBudget, setNextBudget] = useState<string>('0')
  const bidMint = useSelector(
    (state: AppState) => state.boosters[boosterAddress].bidMint,
  )
  const { updateBudget, loading } = useUpdateBudget()
  const metaBooster = useMetaBooster(boosterAddress)

  const onUpdate = async () => {
    const boosterMetadata = {
      ...metaBooster,
      budget: nextBudget,
    }
    const { digest } = await Ipfs.methods.booster.set(boosterMetadata)
    return updateBudget({ boosterAddress, metadata: digest })
  }

  useEffect(() => {
    setNextBudget(metaBooster.budget)
  }, [metaBooster.budget])

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Amount</Typography.Text>
          <Input
            prefix={<MintSymbol mintAddress={bidMint.toBase58()} />}
            value={nextBudget}
            defaultValue={metaBooster.budget}
            onChange={(e) => setNextBudget(e.target.value)}
            className="input-budget"
          />
        </Space>
      </Col>
      <Col span={24}>
        <Button
          loading={loading}
          size="large"
          block
          type="primary"
          onClick={onUpdate}
        >
          Update
        </Button>
      </Col>
    </Row>
  )
}

export default RetailerUpdateBudget
