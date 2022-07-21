import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import moment from 'moment'
import BN from 'bn.js'

import { Card, Col, Row, Typography } from 'antd'
import { MintSymbol } from '@sen-use/components'
import IonIcon from '@sentre/antd-ionicon'
import { numeric } from '@sentre/senhub/dist/shared/util'
import Manage from './manage'
import SpaceVertical from './spaceVertical'

import { FORMAT_DATE } from 'constant'
import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import BoosterProcess from 'components/boosterProcess'

type RetailCardProps = {
  boosterAddr: string
}

const RetailCard = ({ boosterAddr }: RetailCardProps) => {
  const { askMint, bidMint, startTime, endTime, bidTotal, askReceived } =
    useSelector((state: AppState) => state.booster[boosterAddr])

  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0

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
                    mintAddress={askMint.toBase58()}
                  />
                </Col>
                <Col>
                  <IonIcon name="arrow-forward-outline" />
                </Col>
                <Col>
                  <SpaceVertical
                    align="end"
                    label="Pay"
                    mintAddress={bidMint.toBase58()}
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
              <Row gutter={[8, 8]}>
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
                        {numeric(
                          utilsBN.undecimalize(bidTotal, bidDecimal),
                        ).format('0.0,[000]')}{' '}
                        <MintSymbol mintAddress={askMint.toBase58()} />
                      </Typography.Text>
                    }
                  />
                </Col>
                <Col span={24}>
                  <BoosterProcess boosterAddress={boosterAddr} />
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
