import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Col, Row, Space, Typography } from 'antd'

import { AppState } from 'model'
import { PayRateState } from 'actions/createBooster/payRate'
import { Ipfs } from 'senUse/ipfs'

type PayRateDisplayProps = {
  boosterAddress: string
}

const PayRateDisplay = ({ boosterAddress }: PayRateDisplayProps) => {
  const [payRate, setPayRate] = useState<PayRateState>({})
  const metadata = useSelector(
    (state: AppState) => state.booster[boosterAddress].metadata,
  )

  const getPayRate = useCallback(async () => {
    const data = await Ipfs.methods.booster.get(metadata)
    if (!data.payRate) return setPayRate({})
    return setPayRate(data.payRate)
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
