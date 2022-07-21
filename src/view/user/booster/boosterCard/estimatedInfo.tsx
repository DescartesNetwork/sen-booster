import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { IPFS } from '@sen-use/web3'

import { MintSymbol } from '@sen-use/components'
import { Card, Col, Row, Typography } from 'antd'

import { AppState } from 'model'
import { TOKEN } from 'constant'
import { fetchMulCGK, notifyError } from 'helper'
import { useMint } from '@sentre/senhub'
import { fetchCGK } from '@sentre/senhub/dist/shared/util'

type EstimatedInfoProps = {
  boosterAddress: string
  selectedLockTime: number
  payAmount: number
}
const EstimatedInfo = ({
  boosterAddress,
  selectedLockTime,
  payAmount,
}: EstimatedInfoProps) => {
  const { metadata, bidMint, askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [loading, setLoading] = useState(false)
  const [payRates, setPayRates] = useState<Record<string, number>>({})
  const [estimatedReceive, setEstimatedReceive] = useState(0)
  const { tokenProvider } = useMint()

  const getBuyBack = useCallback(async () => {
    try {
      setLoading(true)
      const ipfs = new IPFS(TOKEN)
      const payRate: any = await ipfs.get(metadata)
      if (payRate) setPayRates(payRate)
    } catch (error: any) {
      return notifyError(error)
    } finally {
      setLoading(false)
    }
  }, [metadata])

  useEffect(() => {
    getBuyBack()
  }, [getBuyBack])

  const buyBack = useMemo(() => {
    if (Object.keys(payRates).length === 0) return 100
    return payRates[`${selectedLockTime} days`]
  }, [payRates, selectedLockTime])

  const estimateReceive = useCallback(async () => {
    const bidMintInfo = await tokenProvider.findByAddress(bidMint.toBase58())
    const bidTicket = bidMintInfo?.extensions?.coingeckoId
    const { price: bidPrice } = await fetchCGK(bidTicket)
    const askMintInfo = await tokenProvider.findByAddress(askMint.toBase58())
    const askTicket = askMintInfo?.extensions?.coingeckoId
    const { price: askPrice } = await fetchCGK(askTicket)
    const receiveAmount = (payAmount * askPrice) / bidPrice
  }, [askMint, bidMint, tokenProvider])

  useEffect(() => {
    estimateReceive()
  }, [estimateReceive])

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
                {/* {receiveAmount} */}
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
