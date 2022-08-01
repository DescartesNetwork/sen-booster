import { Col, Row } from 'antd'
import Banner from 'components/banner'

type LayoutProps = {
  children: any
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Row justify="center">
      <Col xs={24} md={20} lg={16}>
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Banner />
          </Col>
          <Col span={24}>{children}</Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Layout
