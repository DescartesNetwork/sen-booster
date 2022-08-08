import { Col, Row, Typography } from 'antd'

type SpaceBetweenProps = { label: string; value: string }

const SpaceBetween = ({ label, value }: SpaceBetweenProps) => (
  <Row>
    <Col flex="auto">
      <Typography.Text className="caption" type="secondary">
        {label}
      </Typography.Text>
    </Col>
    <Col>
      <Typography.Text>{value}</Typography.Text>
    </Col>
  </Row>
)

export default SpaceBetween
