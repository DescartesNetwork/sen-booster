import { Col, Row } from 'antd'
import FilterBooster from 'components/filter'
import SearchBooster from 'components/searchInput'
import { Mode, UserBoosterCategory } from 'constant'
import { AppDispatch, AppState } from 'model'
import { setFilterUserBooster } from 'model/searchBoosters.controller'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const SearchAndFilter = () => {
  const filterUserBooster = useSelector(
    (state: AppState) => state.searchBoosters.filterUserBooster,
  )
  const dispatch = useDispatch<AppDispatch>()
  const onFilter = (value: UserBoosterCategory) => {
    dispatch(setFilterUserBooster(value))
  }
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
          value={filterUserBooster}
        />
      </Col>
    </Row>
  )
}

export default SearchAndFilter
