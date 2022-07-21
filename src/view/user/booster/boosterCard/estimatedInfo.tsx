import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import { MintSymbol } from '@sen-use/components'
import { Card, Col, Row, Typography } from 'antd'

import { AppState } from 'model'

type EstimatedInfoProps = {
  boosterAddress: string
}
const EstimatedInfo = ({ boosterAddress }: EstimatedInfoProps) => {
  const { bidMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [buyBack, setBuyBack] = useState('0')
  const [receiveAmount, setReceiveAmount] = useState('0')
  console.log(setBuyBack, setReceiveAmount)

  return (
    <Card style={{ borderRadius: 8 }} bodyStyle={{ padding: '12px 16px' }}>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Text>Buy-back</Typography.Text>
            </Col>
            <Col>
              <Typography.Title level={3}>{buyBack}%</Typography.Title>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Text>Market buy-back</Typography.Text>
            </Col>
            <Col>
              <Typography.Text disabled>100%</Typography.Text>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Text>Estimated received</Typography.Text>
            </Col>
            <Col>
              <Typography.Title level={5}>
                {receiveAmount}
                <MintSymbol mintAddress={bidMint.toBase58()} />
              </Typography.Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default EstimatedInfo
