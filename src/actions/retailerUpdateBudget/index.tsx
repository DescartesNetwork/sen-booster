import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Row, Space, Typography } from 'antd'
import { MintSymbol } from '@sen-use/app'
import InputNumberCard from 'components/inputNumberCard'

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
  const [nextBudget, setNextBudget] = useState(0)
  const bidMint = useSelector(
    (state: AppState) => state.boosters[boosterAddress].bidMint,
  )
  const { updateBudget, loading } = useUpdateBudget()
  const { metaBooster, loading: metaLoading } = useMetaBooster(boosterAddress)

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
          <InputNumberCard
            value={nextBudget}
            onValue={(val) => setNextBudget(val || 0)}
            prefix={<MintSymbol mintAddress={bidMint} />}
            disabled={metaLoading}
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
          disabled={metaLoading}
        >
          Update
        </Button>
      </Col>
    </Row>
  )
}

export default RetailerUpdateBudget
