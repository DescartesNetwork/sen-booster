import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { util } from '@sentre/senhub'
import { numeric } from '@sentre/senhub/dist/shared/util'

import { MintSymbol } from '@sen-use/components'
import { Col, Progress, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import useMintDecimals from 'shared/hooks/useMintDecimals'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'

type BoosterProcessProps = {
  boosterAddress: string
}

const BoosterProcess = ({ boosterAddress }: BoosterProcessProps) => {
  const { bidReserve, bidMint, bidTotal } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )
  const { budget } = useMetaBooster(boosterAddress)
  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0

  const processAmount = utilsBN.undecimalize(
    bidTotal.sub(bidReserve),
    bidDecimal,
  )

  const percentage = useMemo(() => {
    if (!Number(budget)) return 0
    return Number(processAmount) / Number(budget)
  }, [budget, processAmount])

  return (
    <Row>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Space direction="vertical">
              <Typography.Text type="secondary">Process</Typography.Text>
              <Typography.Text>
                {numeric(processAmount).format('0.0,[0000]')}{' '}
                <MintSymbol mintAddress={bidMint.toBase58()} />(
                {util.numeric(percentage).format('0,0.[00]%')})
              </Typography.Text>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" align="end">
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
          percent={percentage * 100}
          showInfo={false}
          status="active"
        />
      </Col>
    </Row>
  )
}

export default BoosterProcess
