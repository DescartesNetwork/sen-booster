import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Col, Row, Space, Typography } from 'antd'
import Filter from '../filter'
import TokenFilter from 'components/filter/tokenFilter'

import { setTimeFilter, setTokenFilter } from 'model/ordersFilter.controller'
import { AppDispatch, AppState } from 'model'
import { STATUS_OPTIONS, TIME_OPTIONS } from 'constant'

const OrderFilterSet = () => {
  const orders = useSelector((state: AppState) => state.order)
  const boosters = useSelector((state: AppState) => state.booster)

  const tokenOptions = useMemo(() => {
    let mintItems: string[] = []
    for (const key in orders) {
      const { bidMint, askMint } = boosters[orders[key].retailer.toBase58()]
      if (orders[key]) {
        if (!mintItems.includes(bidMint.toBase58()))
          mintItems.push(bidMint.toBase58())
        if (!mintItems.includes(askMint.toBase58()))
          mintItems.push(askMint.toBase58())
      }
    }
    return mintItems
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
          <Filter options={TIME_OPTIONS} onFilter={onTimeFilter} />
        </Space>
      </Col>
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Status</Typography.Text>
          <Filter options={STATUS_OPTIONS} onFilter={onStatusFilter} />
        </Space>
      </Col>
    </Row>
  )
}

export default OrderFilterSet
