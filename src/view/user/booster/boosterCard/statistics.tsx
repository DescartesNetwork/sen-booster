import { useSelector } from 'react-redux'
import { useMemo } from 'react'
import moment from 'moment'
import BN from 'bn.js'
import { util } from '@sentre/senhub'
import { utilsBN } from '@sen-use/web3'

import { Space, Spin, Typography } from 'antd'
import { MintSymbol } from '@sen-use/components'

import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'
import { useOwnOrders } from 'hooks/boosters/useOwnOrders'
import { DATE_FORMAT } from 'constant'

type StatisticsProps = {
  boosterAddress: string
}

const Statistics = ({ boosterAddress }: StatisticsProps) => {
  const { endAt, askTotal, askMint, bidMint } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const askDecimal = useMintDecimals(askMint.toBase58()) || 0
  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0
  const {
    metaBooster: { payRate },
    loading,
  } = useMetaBooster(boosterAddress)
  const { ownOrders } = useOwnOrders()

  const boughtAmount = useMemo(() => {
    let total = new BN(0)

    const ordersByBooster = ownOrders.filter(
      ({ retailer }) => retailer.toBase58() === boosterAddress,
    )

    for (const { state, bidAmount } of ordersByBooster) {
      if (!state.approved && !state.done) continue
      total = total.add(bidAmount)
    }

    return utilsBN.undecimalize(total, bidDecimal)
  }, [bidDecimal, boosterAddress, ownOrders])

  const biggestDiscount = useMemo(() => {
    if (!Object.keys(payRate).length) return 0
    return Math.max(...Object.values(payRate))
  }, [payRate])

  return (
    <Space size={48}>
      <Space direction="vertical" className="buy-back_tag">
        <Typography.Text type="secondary">Buy-back</Typography.Text>
        {loading ? (
          <Spin />
        ) : (
          <Typography.Title style={{ color: '#0FB5B8' }} level={4}>
            {biggestDiscount}%
          </Typography.Title>
        )}
      </Space>
      <Space direction="vertical">
        <Typography.Text type="secondary">Your bought</Typography.Text>
        <Typography.Text>
          {util.numeric(boughtAmount).format('0,0.[0000]')}{' '}
          <MintSymbol mintAddress={bidMint} />
        </Typography.Text>
      </Space>
      <Space direction="vertical">
        <Typography.Text type="secondary">Total value paid</Typography.Text>
        <Typography.Text>
          {util
            .numeric(utilsBN.undecimalize(askTotal, askDecimal))
            .format('0,0.[0000]')}{' '}
          LP
        </Typography.Text>
      </Space>
      <Space direction="vertical">
        <Typography.Text type="secondary">End date</Typography.Text>
        <Typography.Text>
          {moment(endAt.toNumber() * 1000).format(DATE_FORMAT)}
        </Typography.Text>
      </Space>
    </Space>
  )
}

export default Statistics
