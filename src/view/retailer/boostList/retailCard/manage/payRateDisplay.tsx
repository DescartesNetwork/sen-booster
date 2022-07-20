import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IPFS } from '@sen-use/web3'

import { Col, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import { TOKEN } from 'constant'
import { PayRateState } from 'actions/createBooster/payRate'

type PayRateDisplayProps = {
  boosterAddr: string
}

const PayRateDisplay = ({ boosterAddr }: PayRateDisplayProps) => {
  const [payRate, setPayRate] = useState<PayRateState>({})
  const metadata = useSelector(
    (state: AppState) => state.booster[boosterAddr].metadata,
  )

  const getPayRate = useCallback(async () => {
    const ipfs = new IPFS(TOKEN)
    const data: PayRateState = await ipfs.get(metadata)
    return setPayRate(data)
  }, [metadata])

  useEffect(() => {
    getPayRate()
  }, [getPayRate])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>Pay rate</Typography.Title>
      </Col>
      <Col span={14}>
        <Row gutter={[4, 4]}>
          <Col flex="auto">
            <Space direction="vertical" size={4}>
              <Typography.Text type="secondary" className="caption">
                Lock time
              </Typography.Text>
              {Object.keys(payRate).map((date) => (
                <Typography.Text key={date}>{date}</Typography.Text>
              ))}
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" size={4}>
              <Typography.Text type="secondary" className="caption">
                Rate
              </Typography.Text>
              {Object.values(payRate).map((date) => (
                <Typography.Text key={date}>{date} %</Typography.Text>
              ))}
            </Space>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default PayRateDisplay
