import IonIcon from '@sentre/antd-ionicon'
import { Badge, Button, Col, Row, Space, Typography } from 'antd'

import { useThawBooster } from 'hooks/actions/useThawBooster'

type ThawBoostProps = {
  boosterAddress: string
}

const ThawBooster = ({ boosterAddress }: ThawBoostProps) => {
  const { thawBooster, loading } = useThawBooster()

  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Space>
              <Badge status="error" />
              <Typography.Text type="secondary">
                Current status: <span style={{ color: '#F9575E' }}>Frozen</span>
              </Typography.Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space align="start">
              <IonIcon name="information-circle-outline" />
              <Typography.Text type="secondary">
                Thaw a booster will active all actions.
              </Typography.Text>
            </Space>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Button
          onClick={() => thawBooster({ boosterAddress })}
          block
          type="primary"
          size="large"
          loading={loading}
          style={{ background: '#F9575E', border: 'none' }}
        >
          Thaw
        </Button>
      </Col>
    </Row>
  )
}

export default ThawBooster
