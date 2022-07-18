import { Col, Row, Input } from 'antd'
import { AppDispatch, AppState } from 'model'
import { setSearchInput } from 'model/searchBoosters.controller'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Search } = Input

const SearchBooster = () => {
  // const { searchInput, filterUserBooster } = useSelector(
  //   (state: AppState) => state.searchPools,
  // )

  const dispatch = useDispatch<AppDispatch>()

  const onSearch = (value: string) => {
    dispatch(setSearchInput({ searchText: value }))
  }
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
