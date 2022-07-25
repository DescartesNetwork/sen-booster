import { useDispatch, useSelector } from 'react-redux'

import { Col, Row } from 'antd'
import { AppDispatch, AppState } from 'model'
import Filter from '../filter'

import { setTimeFilter, setTokenFilter } from 'model/ordersFilter.controller'

const OrderFilterSet = () => {
  const { status, time, token } = useSelector(
    (state: AppState) => state.ordersFilter,
  )
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
    <Row gutter={[12, 12]}>
      <Col>
        Token <Filter options={[]} onFilter={onTokenFilter} value={token} />
      </Col>
      <Col>
        Time <Filter options={[]} onFilter={onTimeFilter} value={time} />
      </Col>
      <Col>
        Status <Filter options={[]} onFilter={onStatusFilter} value={status} />
      </Col>
    </Row>
  )
}

export default OrderFilterSet
