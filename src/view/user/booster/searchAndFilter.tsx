import { useDispatch } from 'react-redux'

import { Col, Row } from 'antd'
import Filter from 'components/filter'
import SearchBooster from 'components/searchInput'

import { UserBoosterCategory } from 'constant'
import { AppDispatch } from 'model'
import { setFilterUserBooster } from 'model/searchBoosters.controller'

const filterOptions = Object.entries(UserBoosterCategory).map(
  ([key, value]) => ({
    key,
    value,
  }),
)

const SearchAndFilter = () => {
  // const filterUserBooster = useSelector(
  //   (state: AppState) => state.searchBoosters.filterUserBooster,
  // )
  const dispatch = useDispatch<AppDispatch>()
  const onFilter = (value: UserBoosterCategory) => {
    dispatch(setFilterUserBooster(value))
  }

  return (
    <Row>
      <Col span={8} style={{ marginRight: 12 }}>
        <SearchBooster />
      </Col>
      <Col>
        <Filter options={filterOptions} onFilter={onFilter} />
      </Col>
    </Row>
  )
}

export default SearchAndFilter
