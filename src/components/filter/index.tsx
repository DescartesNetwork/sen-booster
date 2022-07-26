import { Col, Row, Select } from 'antd'

const { Option } = Select

type FilterProps = {
  options: { key: string; value: any }[]
  onFilter: (value: any) => void
}

const Filter = ({ onFilter, options }: FilterProps) => {
  const firstOption = options[0]

  return (
    <Row>
      <Col>
        <Select
          style={{ width: 120 }}
          onChange={onFilter}
          placement="bottomRight"
          defaultValue={firstOption.value}
        >
          {options.map((val) => (
            <Option value={val.value} key={val.key}>
              {val.key}
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default Filter
