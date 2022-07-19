import { Col, Row, Select } from 'antd'

const { Option } = Select

type FilterBoosterProps = {
  options: { key: string; value: any }[]
  onFilter: (value: any) => void
  value: any
}

const Filter = ({ onFilter, options, value }: FilterBoosterProps) => {
  return (
    <Row>
      <Col>
        <Select value={value} style={{ width: 120 }} onChange={onFilter}>
          {options.map((val) => (
            <Option value={val.value}>{val.value}</Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default Filter
