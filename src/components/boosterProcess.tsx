import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals, util } from '@sentre/senhub'
import { BN } from 'bn.js'

import { MintSymbol } from '@sen-use/components'
import { Col, Progress, Row, Space, Spin, Typography } from 'antd'

import { AppState } from 'model'
import { useMetaBooster } from 'hooks/boosters/useMetaBooster'

type BoosterProcessProps = {
  boosterAddress: string
}

const BoosterProcess = ({ boosterAddress }: BoosterProcessProps) => {
  const bidMint = useSelector(
    (state: AppState) => state.boosters[boosterAddress].bidMint,
  )
  const orders = useSelector((state: AppState) => state.orders)
  const {
    metaBooster: { budget },
    loading,
  } = useMetaBooster(boosterAddress)
  const bidDecimal = useMintDecimals({ mintAddress: bidMint.toBase58() }) || 0

  const processAmount = useMemo(() => {
    let total = new BN(0)
    for (const address in orders) {
      const { retailer, bidAmount, state } = orders[address]
      if (
        retailer.toBase58() !== boosterAddress ||
        (!state.approved && !state.done)
      )
        continue
      total = total.add(bidAmount)
    }
    return utilsBN.undecimalize(total, bidDecimal)
  }, [bidDecimal, boosterAddress, orders])

  const percentage = useMemo(() => {
    if (!Number(budget)) return 0
    return Number(processAmount) / Number(budget)
  }, [budget, processAmount])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row justify="space-between">
          <Col>
            <Spin spinning={loading} size="small">
              <Space direction="vertical" size={0}>
                <Typography.Text type="secondary">Process</Typography.Text>
                <Typography.Text>
                  {util.numeric(processAmount).format('0.0,[0000]')}{' '}
                  <MintSymbol mintAddress={bidMint.toBase58()} />
                  <Typography.Text type="secondary">
                    {`(${util.numeric(percentage).format('0,0.[00]%')})`}
                  </Typography.Text>
                </Typography.Text>
              </Space>
            </Spin>
          </Col>
          <Col>
            <Spin spinning={loading} size="small">
              <Space direction="vertical" align="end" size={0}>
                <Typography.Text type="secondary">Budget</Typography.Text>
                <Typography.Text>
                  {util.numeric(budget).format('0.0,[0000]')}{' '}
                  <MintSymbol mintAddress={bidMint.toBase58()} />
                </Typography.Text>
              </Space>
            </Spin>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Progress
          className="flex-progress"
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
