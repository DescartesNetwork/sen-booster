import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Space, Typography } from 'antd'
import Filter from '../filter'
import TokenFilter from 'components/filter/tokenFilter'

import { setTimeFilter, setTokenFilter } from 'model/ordersFilter.controller'
import { AppDispatch, AppState } from 'model'
import { STATUS_FILTER_OPTIONS, TIME_FILTER_OPTIONS } from 'constant'

const OrderFilterSet = () => {
  const orders = useSelector((state: AppState) => state.orders)
  const boosters = useSelector((state: AppState) => state.boosters)

  const tokenOptions = useMemo(() => {
    let mintItems: Set<string> = new Set()
    for (const key in orders) {
      const { bidMint, askMint } = boosters[orders[key].retailer.toBase58()]
      if (orders[key]) {
        mintItems.add(bidMint.toBase58())
        mintItems.add(askMint.toBase58())
      }
    }
    return Array.from(mintItems)
  }, [boosters, orders])

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
        <Space size={4} direction="vertical">
          <Typography.Text>Token</Typography.Text>
          <TokenFilter options={tokenOptions} onFilter={onTokenFilter} />
        </Space>
      </Col>
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Time</Typography.Text>
          <Filter options={TIME_FILTER_OPTIONS} onFilter={onTimeFilter} />
        </Space>
      </Col>
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Status</Typography.Text>
          <Filter options={STATUS_FILTER_OPTIONS} onFilter={onStatusFilter} />
        </Space>
      </Col>
    </Row>
  )
}

export default OrderFilterSet
