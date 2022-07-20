import { useSelector } from 'react-redux'
import moment from 'moment'

import { Card, Col, Row, Typography } from 'antd'
import { MintSymbol } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import { numeric } from '@sentre/senhub/dist/shared/util'
import Manage from './manage'
import SpaceVertical from './spaceVertical'

import { FORMAT_DATE } from 'constant'
import { AppState } from 'model'
import { useMemo } from 'react'
import BN from 'bn.js'

type RetailCardProps = {
  boosterAddr: string
}

const RetailCard = ({ boosterAddr }: RetailCardProps) => {
  const { askMint, bidMint, startTime, endTime, bidTotal, askReceived } =
    useSelector((state: AppState) => state.booster[boosterAddr])

  const percentPayed = useMemo(() => {
    const numAskReceived = askReceived.toNumber()
    if (!numAskReceived) return 0
    const percent = askReceived.div(bidTotal).mul(new BN(100))
    return percent.toNumber()
  }, [askReceived, bidTotal])
  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col>
                  <SpaceVertical
                    label="Buy-back"
                    mintAddress={bidMint.toBase58()}
                  />
                </Col>
                <Col>
                  <IonIcon name="arrow-forward-outline" />
                </Col>
                <Col>
                  <SpaceVertical
                    align="end"
                    label="Pay"
                    mintAddress={askMint.toBase58()}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" wrap={false}>
                <Col>
                  <SpaceVertical
                    label="Start date"
                    value={
                      <Typography.Text>
                        {moment(startTime.toNumber() * 1000).format(
                          FORMAT_DATE,
                        )}
                      </Typography.Text>
                    }
                  />
                </Col>
                <Col>
                  <SpaceVertical
                    label="End date"
                    value={
                      <Typography.Text>
                        {moment(endTime.toNumber() * 1000).format(FORMAT_DATE)}
                      </Typography.Text>
                    }
                  />
                </Col>
                <Col>
                  <SpaceVertical
                    label="Boost"
                    value={<Typography.Text>Yes</Typography.Text>}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row>
                <Col flex="auto">
                  <SpaceVertical
                    label="Process"
                    value={
                      <Typography.Text>
                        {numeric(askReceived.toString()).format('0.0,[000]')}{' '}
                        <MintSymbol mintAddress={askMint.toBase58()} />
                        <Typography.Text type="secondary">
                          ({percentPayed}%)
                        </Typography.Text>
                      </Typography.Text>
                    }
                  />
                </Col>
                <Col>
                  <SpaceVertical
                    label="Budget"
                    align="end"
                    value={
                      <Typography.Text>
                        {numeric(bidTotal.toString()).format('0.0,[000]')}{' '}
                        <MintSymbol mintAddress={askMint.toBase58()} />
                      </Typography.Text>
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Manage boosterAddr={boosterAddr} />
        </Col>
      </Row>
    </Card>
  )
}

export default RetailCard
