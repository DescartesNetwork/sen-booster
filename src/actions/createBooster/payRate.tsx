import { Col, InputNumber, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Content from './content'

export const DATES = [
  'No lock time',
  '1 day',
  '7 days',
  '1 month',
  '2 months',
  '3 months',
  '4 months',
  '1 year',
  '2 years',
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
          <Typography.Title level={5}>Pay Rate</Typography.Title>
          <Tooltip
            title={
              "The min pay rate is 100% and equal to the market price. You need to input a higher rate to attract users You can leave blank the lock time you don't want to use, but there must be at least one field."
            }
          >
            <IonIcon
              style={{ cursor: 'pointer' }}
              name="information-circle-outline"
            />
          </Tooltip>
        </Space>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {DATES.map((date) => (
            <Col
              className="pay-rate"
              span={date === 'No lock time' ? 24 : 12}
              key={date}
            >
              <Content
                label={date}
                value={
                  <InputNumber
                    className="retailer-input"
                    size="large"
                    placeholder="Must be >= 100%"
                    value={payRate[date]}
                    onChange={(val) => setPayRate(val || 0, date)}
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
