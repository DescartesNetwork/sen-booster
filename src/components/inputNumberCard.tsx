import { ReactNode } from 'react'

import { Card, Col, InputNumber, Row } from 'antd'

type InputNumberCardProps = {
  value: number
  onValue: (val: number) => void
  prefix?: ReactNode
  suffix?: ReactNode
  max?: number
  disabled?: boolean
}

const InputNumberCard = ({
  value,
  onValue,
  prefix,
  suffix,
  max,
  disabled = false,
}: InputNumberCardProps) => {
  return (
    <Card
      className="input-number-card"
      style={{ borderRadius: 8 }}
      bodyStyle={{ padding: 0 }}
    >
      <Row wrap={false} align="middle">
        <Col flex="auto">
          <InputNumber
            placeholder="0"
            prefix={prefix}
            value={value}
            onChange={onValue}
            max={max}
            style={{ width: '100%' }}
            bordered={false}
            disabled={disabled}
          />
        </Col>
        {suffix}
      </Row>
    </Card>
  )
}

export default InputNumberCard
