import IonIcon from '@sentre/antd-ionicon'
import { Card, Col, Image, Row, Space, Typography } from 'antd'

import BG from 'static/images/banner_booster_desktop.png'
import MATERIAL from 'static/images/booster_material.png'

const Banner = () => {
  return (
    <Card className="banner" bordered={false}>
      <Image className="banner-background" preview={false} src={BG} />
      <Row gutter={[24, 24]} className="banner-body">
        <Col span={24} className="banner-material">
          <Image preview={false} src={MATERIAL} />
        </Col>
        <Col span={24}>
          <Space direction="vertical" size={20}>
            <Typography.Title
              level={2}
              style={{ color: '#0B358F', lineHeight: '120%' }}
            >
              100% OTC Market built on Smart Contracts
            </Typography.Title>
            <Space>
              <Space>
                <IonIcon
                  name="checkmark-circle"
                  style={{
                    fontSize: 29,
                    color: '#0FB5B8',
                  }}
                />
                <Typography.Title level={5}>No Slippage</Typography.Title>
              </Space>
              <Space>
                <IonIcon
                  name="checkmark-circle"
                  style={{
                    fontSize: 29,
                    color: '#0FB5B8',
                  }}
                />
                <Typography.Title level={5}>No Price impact</Typography.Title>
              </Space>
            </Space>
          </Space>
        </Col>
      </Row>
    </Card>
  )
}

export default Banner
