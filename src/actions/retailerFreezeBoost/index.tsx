import { Badge, Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

const FreezeBoost = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Space>
              <Badge status="success" />
              <Typography.Text type="secondary">
                Current status: <span style={{ color: '#212433' }}>Active</span>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space align="start">
              <IonIcon name="information-circle-outline" />
              <Typography.Text type="secondary">
                Freezing a booster will prevent all actions until the booster
                has been thawed.
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button block type="primary" size="large">
          Freeze
        </Button>
      </Col>
    </Row>
  )
}

export default FreezeBoost
