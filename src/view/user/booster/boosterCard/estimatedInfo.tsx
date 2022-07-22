import React from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'

import { MintSymbol } from '@sen-use/components'
import { Card, Col, Row, Typography } from 'antd'

import { AppState } from 'model'

type EstimatedInfoProps = {
  estimatedReceive: number
  boosterAddress: string
  buyBack: number
}
const EstimatedInfo = ({
  estimatedReceive,
  boosterAddress,
  buyBack,
}: EstimatedInfoProps) => {
  const { bidMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )

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
              <Typography.Text delete>100%</Typography.Text>
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
                {util.numeric(estimatedReceive).format('0,0.[00]a')}{' '}
                <MintSymbol mintAddress={bidMint} />
              </Typography.Title>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default EstimatedInfo
