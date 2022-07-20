import IonIcon from '@sentre/antd-ionicon'
import { Col, Row, Image, Space, Typography } from 'antd'

import BannerImage from 'static/images/header_banner.png'

const Banner = () => {
  return (
    <Row>
      <Col span={24}>
        <Image
          src={BannerImage}
          preview={false}
          style={{ borderRadius: 10, width: '100%' }}
        />
      </Col>
      <Col
        style={{
          position: 'absolute',
          padding: 24,
          height: '100%',
          width: '100%',
        }}
      >
        <Space direction="vertical">
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
