import { ReactNode } from 'react'

import { Col, Row } from 'antd'

type ContentProps = {
  label: string | ReactNode
  value: ReactNode
}

const Content = ({ label, value }: ContentProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>{label}</Col>
      <Col span={24}>{value}</Col>
    </Row>
  )
}

export default Content
