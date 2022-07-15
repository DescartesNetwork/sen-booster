import { Col, Row } from 'antd'
import FilterBooster from 'components/filterBooster'
import SearchBooster from 'components/searchInput'
import React from 'react'

const SearchAndFilter = () => {
  return (
    <Row>
      <Col span={8}>
        <SearchBooster />
      </Col>
      <Col>
        <FilterBooster />
      </Col>
    </Row>
  )
}

export default SearchAndFilter
