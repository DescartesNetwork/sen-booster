import { Col, InputNumber, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Content from './content'

const DATES = [
  '7 days',
  '30 days',
  '60 days',
  '90 days',
  '120 days',
  '365 days',
]
export type PayRateState = Record<typeof DATES[number], number>

type PayRateProps = {
  payRate: PayRateState
  setPayRate: (value: number, date: string) => void
}

const PayRate = ({ payRate, setPayRate }: PayRateProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space>
          <Typography.Title level={5}>Pay rate</Typography.Title>
          <Tooltip
            title={
              "You can set the pay rate to 0 at the lock time you don't want to use."
            }
          >
            <IonIcon name="information-circle-outline" />
          </Tooltip>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {DATES.map((date) => (
            <Col className="pay-rate" span={12} key={date}>
              <Content
                label={date}
                value={
                  <InputNumber
                    placeholder="Input rate"
                    value={payRate[date] ? payRate[date] : undefined}
                    onChange={(val) => setPayRate(val, date)}
                  />
                }
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default PayRate
