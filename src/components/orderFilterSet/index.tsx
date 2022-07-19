import { Col, Row } from 'antd'
import { AppDispatch, AppState } from 'model'
import { setTimeFilter, setTokenFilter } from 'model/ordersFilter.controller'
import { useDispatch, useSelector } from 'react-redux'
import Filter from '../filter'

const OrderFilterSet = () => {
  const statusFilter = useSelector(
    (state: AppState) => state.ordersFilter.status,
  )
  const timeFilter = useSelector((state: AppState) => state.ordersFilter.time)
  const tokenFilter = useSelector((state: AppState) => state.ordersFilter.token)
  const dispatch = useDispatch<AppDispatch>()

  const onTokenFilter = (value: string) => {
    dispatch(setTokenFilter(value))
  }

  const onTimeFilter = (value: string) => {
    dispatch(setTimeFilter(value))
  }

  const onStatusFilter = (value: string) => {
    dispatch(setTokenFilter(value))
  }

  return (
    <Row>
      <Col>
        Token{' '}
        <Filter options={[]} onFilter={onTokenFilter} value={tokenFilter} />
      </Col>
      <Col>
        Time <Filter options={[]} onFilter={onTimeFilter} value={timeFilter} />
      </Col>
      <Col>
        Status{' '}
        <Filter options={[]} onFilter={onStatusFilter} value={statusFilter} />
      </Col>
    </Row>
  )
}

export default OrderFilterSet
