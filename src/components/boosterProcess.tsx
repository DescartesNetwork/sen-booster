import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { util } from '@sentre/senhub'
import { numeric } from '@sentre/senhub/dist/shared/util'

import { MintSymbol } from '@sen-use/components'
import { Col, Progress, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'

type BoosterProcessProps = {
  boosterAddress: string
}

const BoosterProcess = ({ boosterAddress }: BoosterProcessProps) => {
  const { bidReserve, bidTotal, bidMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [processedAmount, setProcessAmount] = useState('')
  const [bidTotalAmount, setBidTotalAmount] = useState('')
  const [processedRatio, setProcessedRatio] = useState('')
  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0

  const getProcessedInfos = useCallback(async () => {
    setProcessAmount(utilsBN.undecimalize(bidTotal.sub(bidReserve), bidDecimal))
    setProcessedRatio(bidReserve.div(bidTotal).toString())
    setBidTotalAmount(utilsBN.undecimalize(bidTotal, bidDecimal))
  }, [bidDecimal, bidReserve, bidTotal])

  useEffect(() => {
    getProcessedInfos()
  }, [getProcessedInfos])

  return (
    <Row>
      <Col span={24}>
        <Row justify="space-between">
          <Col flex="auto">
            <Space direction="vertical">
              <Typography.Text type="secondary">Process</Typography.Text>
              <Typography.Text>
                {numeric(processedAmount).format('0.0,[0000]')}{' '}
                <MintSymbol mintAddress={bidMint.toBase58()} />(
                {util.numeric(processedRatio).format('0,0.[00]%')})
              </Typography.Text>
            </Space>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Space direction="vertical">
              <Typography.Text type="secondary">Budget</Typography.Text>
              <Typography.Text>
                {numeric(bidTotalAmount).format('0.0,[0000]')}{' '}
                <MintSymbol mintAddress={bidMint.toBase58()} />
              </Typography.Text>
            </Space>
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
