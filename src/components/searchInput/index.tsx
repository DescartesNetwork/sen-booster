import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Col, Row, Input, Button } from 'antd'

import { AppDispatch, AppState } from 'model'
import { setSearchInput } from 'model/searchBoosters.controller'

const SearchBooster = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { searchInput } = useSelector((state: AppState) => state.searchBoosters)

  const onSearch = (value: string) => {
    dispatch(setSearchInput({ searchText: value }))
  }

  return (
    <Row>
      <Col span={24}>
        <Input
          placeholder="Search LP, token"
          value={searchInput}
          prefix={
            searchInput ? (
              <Button
                type="text"
                style={{
                  width: 'auto',
                  height: 'auto',
                  background: 'transparent',
                  marginLeft: -7,
                }}
                onClick={() => onSearch('')}
                icon={<IonIcon name="close-outline" />}
              />
            ) : (
              <IonIcon
                style={{ fontSize: '24px', marginLeft: -5 }}
                name="search-outline"
              />
            )
          }
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            onSearch(e.target.value)
          }}
          style={{ height: '32px' }}
        />
      </Col>
    </Row>
  )
}

export default SearchBooster
