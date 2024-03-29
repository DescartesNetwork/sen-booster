import { useSelector } from 'react-redux'
import { useMintDecimals, util } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { MintSymbol } from '@sen-use/app'
import { Card, Col, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import { utilsBN } from '@sen-use/web3'

type EstimatedInfoProps = {
  estimatedReceive: BN
  boosterAddress: string
  discount: number
  nftDiscount: number
}
const EstimatedInfo = ({
  estimatedReceive,
  boosterAddress,
  discount,
  nftDiscount,
}: EstimatedInfoProps) => {
  const { bidMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const bidDecimal = useMintDecimals({ mintAddress: bidMint.toBase58() }) || 0

  return (
    <Card
      style={{ borderRadius: 8 }}
      bodyStyle={{ padding: '12px 16px' }}
      bordered={false}
    >
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Row>
            <Col flex="auto">
              <Typography.Text style={{ color: '#0FB5B8' }}>
                Buy-back
              </Typography.Text>
            </Col>
            <Col>
              <Space>
                <Typography.Title style={{ color: '#0FB5B8' }} level={3}>
                  {discount}%
                </Typography.Title>
                {!!nftDiscount && (
                  <Typography.Title style={{ color: '#0FB5B8' }} level={3}>
                    + {nftDiscount}%
                  </Typography.Title>
                )}
              </Space>
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
                {util
                  .numeric(utilsBN.undecimalize(estimatedReceive, bidDecimal))
                  .format('0,0.[0000]')}{' '}
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
