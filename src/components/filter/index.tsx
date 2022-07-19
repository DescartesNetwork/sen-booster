import { Col, Row, Select } from 'antd'
import { Mode, RetailerBoosterCategory, UserBoosterCategory } from 'constant'
import { AppDispatch, AppState } from 'model'
import { setFilterUserBooster } from 'model/searchBoosters.controller'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

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
        <Select
          value={value}
          style={{ width: 120 }}
          onChange={(val) => {
            onFilter(val)
          }}
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
