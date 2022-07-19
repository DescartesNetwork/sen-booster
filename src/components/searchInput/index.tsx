import { Col, Row, Input } from 'antd'
import { AppDispatch, AppState } from 'model'
import { setSearchInput } from 'model/searchBoosters.controller'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const { Search } = Input

const SearchBooster = () => {
  const { searchInput } = useSelector((state: AppState) => state.searchBoosters)

  const dispatch = useDispatch<AppDispatch>()

  const onSearch = (value: string) => {
    dispatch(setSearchInput({ searchText: value }))
  }

  return (
    <Row>
      <Col>
        <Search
          value={searchInput}
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          onChange={(e) =>
            dispatch(setSearchInput({ searchText: e.target.value }))
          }
        />
      </Col>
    </Row>
  )
}

export default SearchBooster
