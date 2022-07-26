import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { util } from '@sentre/senhub'
import { numeric } from '@sentre/senhub/dist/shared/util'

import { MintSymbol } from '@sen-use/components'
import { Col, Progress, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { Ipfs } from 'senUse/ipfs'

type BoosterProcessProps = {
  boosterAddress: string
}

const BoosterProcess = ({ boosterAddress }: BoosterProcessProps) => {
  const [budget, setBudget] = useState<string>('0')
  const { bidReserve, bidMint, askTotal, metadata, askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0
  const askDecimal = useMintDecimals(askMint.toBase58()) || 0

  const processAmount =
    Number(budget) - Number(utilsBN.undecimalize(bidReserve, bidDecimal))

  const percentage = useMemo(() => {
    if (budget === '0') return 0
    const numAskTotal = utilsBN.undecimalize(askTotal, askDecimal)
    return Number(numAskTotal) / Number(budget)
  }, [askDecimal, askTotal, budget])

  const fetchBudget = useCallback(async () => {
    const data = await Ipfs.methods.booster.get(metadata)
    if (!data.budget) return setBudget('0')
    return setBudget(data.budget)
  }, [metadata])

  useEffect(() => {
    fetchBudget()
  }, [fetchBudget])

  return (
    <Row>
      <Col span={24}>
        <Row justify="space-between">
          <Col flex="auto">
            <Space direction="vertical">
              <Typography.Text type="secondary">Process</Typography.Text>
              <Typography.Text>
                {numeric(processAmount).format('0.0,[0000]')}{' '}
                <MintSymbol mintAddress={bidMint.toBase58()} />(
                {util.numeric(percentage).format('0,0.[00]%')})
              </Typography.Text>
            </Space>
          </Col>
          <Col style={{ textAlign: 'right' }}>
            <Space direction="vertical">
              <Typography.Text type="secondary">Budget</Typography.Text>
              <Typography.Text>
                {numeric(budget).format('0.0,[0000]')}{' '}
                <MintSymbol mintAddress={bidMint.toBase58()} />
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Progress
          strokeColor={'#0FB5B8'}
          percent={percentage / 100}
          showInfo={false}
          status="active"
        />
      </Col>
    </Row>
  )
}

export default BoosterProcess
