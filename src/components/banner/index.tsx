import IonIcon from '@sentre/antd-ionicon'
import { Col, Row, Image, Space, Typography } from 'antd'

import BannerImage from 'static/images/header_banner.png'

const Banner = () => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24} className="banner">
        <Image src={BannerImage} preview={false} />
      </Col>
      <Col
        style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
        }}
      >
        <Space direction="vertical" style={{ padding: 24 }}>
          <Typography.Title
            level={2}
            style={{ fontWeight: 800, color: '#0B358F' }}
          >
            100% OTC Market built on Smart Contracts
          </Typography.Title>
          <Space>
            <Space>
              <IonIcon
                name="checkmark-circle"
                style={{
                  fontSize: 14,
                }}
              />
              <Typography.Title level={5}> No Slippage</Typography.Title>
            </Space>
            <Space>
              <IonIcon
                name="checkmark-circle"
                style={{
                  fontSize: 14,
                }}
              />
              <Typography.Title level={5}> No Price impact</Typography.Title>
            </Space>
          </Space>
        </Space>
      </Col>
    </Row>
  )
}

export default Banner
