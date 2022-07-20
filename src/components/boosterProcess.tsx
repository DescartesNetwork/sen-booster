import { utils } from '@senswap/sen-js'
import { useMint, util } from '@sentre/senhub'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { MintSymbol } from '@sen-use/components'
import { Col, Progress, Row, Typography } from 'antd'

import { AppState } from 'model'

type BoosterProcessProps = {
  boosterAddress: string
}

const BoosterProcess = ({ boosterAddress }: BoosterProcessProps) => {
  const { bidReserve, bidTotal, bidMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [processedAmount, setProcessAmount] = useState(0)
  const [bidTotalAmount, setBidTotalAmount] = useState(0)
  const [processedRatio, setProcessedRatio] = useState(0)
  const { getDecimals } = useMint()

  const getProcessedInfos = useCallback(async () => {
    const bidDecimal = await getDecimals(bidMint.toBase58())
    const bidReserveNum = Number(
      utils.undecimalize(BigInt(bidReserve.toString()), bidDecimal),
    )
    const bidTotalNum = Number(
      utils.undecimalize(BigInt(bidTotal.toString()), bidDecimal),
    )
    setProcessAmount(bidTotalNum - bidReserveNum)
    setProcessedRatio(bidReserveNum / bidTotalNum)
    setBidTotalAmount(bidTotalNum)
  }, [bidMint, bidReserve, bidTotal, getDecimals])

  useEffect(() => {
    getProcessedInfos()
  }, [getProcessedInfos])

  return (
    <Row>
      <Col span={24}>
        <Row justify="space-between">
          <Col flex="auto">
            <Typography.Text>Process</Typography.Text>
            <Typography.Title level={5}>
              {processedAmount}
              <MintSymbol mintAddress={bidMint.toBase58()} />(
              {util.numeric(processedRatio).format('0,0.[00]%')})
            </Typography.Title>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Typography.Text>Budget</Typography.Text>
            <Typography.Title level={5}>
              {bidTotalAmount}
              <MintSymbol mintAddress={bidMint.toBase58()} />
            </Typography.Title>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Progress
          strokeColor={'#0FB5B8'}
          percent={80}
          showInfo={false}
          status="active"
        />
      </Col>
    </Row>
  )
}

export default BoosterProcess
