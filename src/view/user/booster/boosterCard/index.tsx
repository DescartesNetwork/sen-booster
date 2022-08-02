import { memo } from 'react'

import { Card, Col, Row, Space, Tag } from 'antd'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterAvatar from 'components/boosterAvatar'
import BoosterProcess from 'components/boosterProcess'
import Statistics from './statistics'
import BuyNow from 'actions/userBuyNow'
import useAmountVoucher from 'hooks/boosters/useAmountVoucher'

type BoosterCardProps = {
  boosterAddress: string
}

const BoosterCard = memo(({ boosterAddress }: BoosterCardProps) => {
  const { getAmountVoucher } = useAmountVoucher()
  const amountVoucher = getAmountVoucher(boosterAddress)

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col flex="auto">
              <Space size={16}>
                <BoosterAvatar boosterAddress={boosterAddress} />
                <BoosterSymbol boosterAddress={boosterAddress} />
                {amountVoucher && <Tag>Boost</Tag>}
              </Space>
            </Col>
            <Col>
              <BuyNow boosterAddress={boosterAddress} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Statistics boosterAddress={boosterAddress} />
        </Col>
        <Col span={24}>
          <BoosterProcess boosterAddress={boosterAddress} />
        </Col>
      </Row>
    </Card>
  )
})

export default BoosterCard
