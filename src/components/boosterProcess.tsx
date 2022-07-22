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
  const { bidReserve, bidTotal, bidMint, askTotal } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const bidDecimal = useMintDecimals(bidMint.toBase58()) || 0

  const percentage =
    bidTotal.toString() === '0' ? 0 : askTotal.div(bidTotal).toString()
  const processAmount = utilsBN.undecimalize(
    bidTotal.sub(bidReserve),
    bidDecimal,
  )

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
                {numeric(utilsBN.undecimalize(bidTotal, bidDecimal)).format(
                  '0.0,[0000]',
                )}{' '}
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
