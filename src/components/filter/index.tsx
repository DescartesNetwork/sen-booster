import { Col, Row, Select } from 'antd'
import { Mode, RetailerBoosterCategory, UserBoosterCategory } from 'constant'
import { AppDispatch } from 'model'
import { setFilterUserBooster } from 'model/searchBoosters.controller'
import React from 'react'
import { useDispatch } from 'react-redux'

const { Option } = Select

type FilterBoosterProps = {
  options: { key: string; value: any }[]
  onFilter: (value: string) => void
}

const Filter = ({ onFilter, options }: FilterBoosterProps) => {
  return (
    <Row>
      <Col>
        <Select
          defaultValue={options[0]?.value}
          style={{ width: 120 }}
          onChange={onFilter}
        >
          {options.map((val) => (
            <Option value={val.value}>{val.value}</Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default Filter
