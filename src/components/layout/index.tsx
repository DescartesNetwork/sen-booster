import { Col, Row } from 'antd'
import Banner from 'components/banner'

type LayoutProps = {
  children: any
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Row gutter={[24, 24]}>
      <Col span={24}>
        <Banner />
      </Col>
      {children}
    </Row>
  )
}

export default Layout
