import { Col, Row, Input } from 'antd'
import React from 'react'

const { Search } = Input

const SearchBooster = () => {
  const onSearch = () => {}
  return (
    <Row>
      <Col>
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </Col>
    </Row>
  )
}

export default SearchBooster
