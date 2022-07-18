import { Col, Row } from 'antd'
import { AppDispatch } from 'model'
import { setTimeFilter, setTokenFilter } from 'model/ordersFilter.controller'
import { useDispatch } from 'react-redux'
import Filter from '../filter'

const OrderFilterSet = () => {
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
        Token <Filter options={[]} onFilter={onTokenFilter} />
      </Col>
      <Col>
        Time <Filter options={[]} onFilter={onTimeFilter} />
      </Col>
      <Col>
        Status <Filter options={[]} onFilter={onStatusFilter} />
      </Col>
    </Row>
  )
}

export default OrderFilterSet
