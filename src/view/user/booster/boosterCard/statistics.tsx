import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import BN from 'bn.js'
import { util, useMintDecimals } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { Col, Row, Space, Spin, Typography } from 'antd'
import { MintSymbol } from '@sen-use/components'
import SpaceVertical from 'components/spaceVertical'
import TimeCountDown from 'components/timeCountDown'

import { AppState } from 'model'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'
import { useOwnOrders } from 'hooks/boosters/useOwnOrders'

type StatisticsProps = {
  boosterAddress: string
}

const Statistics = ({ boosterAddress }: StatisticsProps) => {
  const { endAt, askMint, bidMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const askDecimal = useMintDecimals({ mintAddress: askMint.toBase58() }) || 0
  const bidDecimal = useMintDecimals({ mintAddress: bidMint.toBase58() }) || 0
  const {
    metaBooster: { payRate },
    loading,
  } = useMetaBooster(boosterAddress)
  const { ownOrders } = useOwnOrders()

  const totalAmountTraded = useMemo(() => {
    let totalToken = new BN(0)
    let totalLP = new BN(0)

    const ordersByBooster = ownOrders.filter(
      ({ retailer }) => retailer.toBase58() === boosterAddress,
    )

    for (const { state, bidAmount, askAmount } of ordersByBooster) {
      if (!state.approved && !state.done) continue
      totalToken = totalToken.add(bidAmount)
      totalLP = totalLP.add(askAmount)
    }

    const boughtAmount = utilsBN.undecimalize(totalToken, bidDecimal)
    const totalLPSold = utilsBN.undecimalize(totalLP, askDecimal)

    return { boughtAmount, totalLPSold }
  }, [askDecimal, bidDecimal, boosterAddress, ownOrders])

  const biggestDiscount = useMemo(() => {
    if (!Object.keys(payRate).length) return 0
    return Math.max(...Object.values(payRate))
  }, [payRate])

  return (
    <Row gutter={[48, 16]}>
      {/* Buy-back */}
      <Col xs={12} md={5} lg={4}>
        <Spin spinning={loading} size="small">
          <Space direction="vertical" className="buy-back_tag" size={4}>
            <Typography.Text type="secondary">Buy-back</Typography.Text>
            <Typography.Title style={{ color: '#0FB5B8' }} level={4}>
              {biggestDiscount}%
            </Typography.Title>
          </Space>
        </Spin>
      </Col>
      {/* BYour bought */}
      <Col xs={12} md={6} lg={4}>
        <Spin spinning={loading} size="small">
          <SpaceVertical
            label="Your bought"
            value={
              <Typography.Text>
                {util
                  .numeric(totalAmountTraded.boughtAmount)
                  .format('0,0.[0000]')}{' '}
                <MintSymbol mintAddress={bidMint} />
              </Typography.Text>
            }
            size={4}
          />
        </Spin>
      </Col>
      {/* Total value paid */}
      <Col xs={12} md={6} lg={4}>
        <Spin spinning={loading} size="small">
          <SpaceVertical
            label="Total value sold"
            value={
              <Typography.Text>
                {util
                  .numeric(totalAmountTraded.totalLPSold)
                  .format('0,0.[0000]')}{' '}
                LP
              </Typography.Text>
            }
            size={4}
          />
        </Spin>
      </Col>
      {/* End date*/}
      <Col xs={12} md={7} lg={6}>
        <Spin spinning={loading} size="small">
          <SpaceVertical
            label="End date"
            value={<TimeCountDown endTime={endAt.toNumber()} />}
            size={4}
          />
        </Spin>
      </Col>
    </Row>
  )
}

export default Statistics
