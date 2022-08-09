import { Col, Row, Typography } from 'antd'

type FilterElementProps = {
  label: string
  children: JSX.Element
}

const FilterElement = ({ label, children }: FilterElementProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text type="secondary">{label}</Typography.Text>
      </Col>
      <Col span={24}>{children}</Col>
    </Row>
  )
}

export default FilterElement
