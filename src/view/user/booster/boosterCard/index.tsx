import { memo } from 'react'

import { Card, Col, Row, Space, Tag } from 'antd'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterAvatar from 'components/boosterAvatar'
import BoosterProcess from 'components/boosterProcess'
import Statistics from './statistics'
import BuyNow from 'actions/userBuyNow'

import { useTotalVoucherOfBooster } from 'hooks/boosters/useTotalVoucherOfBooster'
import { useUI } from '@sentre/senhub'

type BoosterCardProps = {
  boosterAddress: string
}

const BoosterCard = memo(({ boosterAddress }: BoosterCardProps) => {
  const { getAmountVoucher } = useTotalVoucherOfBooster()
  const amountVoucher = getAmountVoucher(boosterAddress)
  const {
    ui: { width },
  } = useUI()

  const isMobile = width < 575

  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Space size={16}>
                <BoosterAvatar boosterAddress={boosterAddress} />
                <BoosterSymbol boosterAddress={boosterAddress} />
                {!!amountVoucher && <Tag>Boost</Tag>}
              </Space>
            </Col>
            {!isMobile && (
              <Col>
                <BuyNow boosterAddress={boosterAddress} />
              </Col>
            )}
          </Row>
        </Col>
        <Col span={24}>
          <Statistics boosterAddress={boosterAddress} />
        </Col>
        <Col span={24}>
          <BoosterProcess boosterAddress={boosterAddress} />
        </Col>
        {isMobile && (
          <Col span={24}>
            <BuyNow block boosterAddress={boosterAddress} />
          </Col>
        )}
      </Row>
    </Card>
  )
})

export default BoosterCard
