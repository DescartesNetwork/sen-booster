import { Col, Row } from 'antd'
import FilterBooster from 'components/filter'
import SearchBooster from 'components/searchInput'
import { Mode, UserBoosterCategory } from 'constant'
import React from 'react'

const SearchAndFilter = () => {
  const onFilter = () => {}
  return (
    <Row>
      <Col span={8}>
        <SearchBooster />
      </Col>
      <Col>
        <FilterBooster
          options={Object.entries(UserBoosterCategory).map(([key, value]) => ({
            key,
            value,
          }))}
          onFilter={onFilter}
        />
      </Col>
    </Row>
  )
}

export default SearchAndFilter
