import { memo } from 'react'
import { useWidth } from '@sentre/senhub'

import { Card, Col, Row, Space, Tag } from 'antd'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterAvatar from 'components/boosterAvatar'
import BoosterProcess from 'components/boosterProcess'
import Statistics from './statistics'
import BuyNow from 'actions/userBuyNow'

import { useTotalVoucherOfBooster } from 'hooks/boosters/useTotalVoucherOfBooster'

type BoosterCardProps = {
  boosterAddress: string
}

const BoosterCard = memo(({ boosterAddress }: BoosterCardProps) => {
  const { getAmountVoucher } = useTotalVoucherOfBooster()
  const amountVoucher = getAmountVoucher(boosterAddress)
  const width = useWidth()

  const isMobile = width < 575

  return (
    <Card bodyStyle={{ padding: '16px 24px' }}>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col>
              <Space size={16}>
                <BoosterAvatar boosterAddress={boosterAddress} size={32} />
                <BoosterSymbol boosterAddress={boosterAddress} />
                {!!amountVoucher && (
                  <Tag
                    style={{
                      color: '#0FB5B8',
                      background: 'rgba(15, 181, 184, 0.1)',
                      border: 'none',
                      borderRadius: 4,
                    }}
                  >
                    Boost
                  </Tag>
                )}
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
            <BuyNow boosterAddress={boosterAddress} />
          </Col>
        )}
      </Row>
    </Card>
  )
})

export default BoosterCard
