import { Col, Image, Row } from 'antd'
import Banner from 'static/images/booster_header_bg.png'

type LayoutProps = {
  children: any
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Row justify="center">
      <Col span={16}>
        <Row gutter={[24, 24]}>
          <Col>
            <Image src={Banner} preview={false} />
          </Col>
          <Col>{children}</Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Layout
