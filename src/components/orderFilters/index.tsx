import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { MintAvatar, MintSymbol } from '@sen-use/components'
import { Col, Row, Select, Space, Typography } from 'antd'

import {
  ALL,
  SECONDS_PER_DAY,
  TIME_FILTER_OPTIONS,
  STATUS_OPTION,
} from 'constant'
import { useMintFilterOptions } from 'hooks/useMintFilterOptions'
import { OrderRequest } from 'view/retailer/orderList'
import { AppState } from 'model'

type FilterOrdersProps = {
  onChange: (orders: OrderRequest[]) => void
  orderList: OrderRequest[]
}

const FilterOrders = ({ onChange, orderList }: FilterOrdersProps) => {
  const [filter, setFilter] = useState({
    token: ALL,
    time: TIME_FILTER_OPTIONS[0].value,
    status: ALL,
  })
  const mintOptions = useMintFilterOptions()
  const booster = useSelector((state: AppState) => state.boosters)
  const mode = useSelector((state: AppState) => state.settings.mode)

  const filteredOrders = useMemo(() => {
    const orderRequest: OrderRequest[] = []
    const now = Date.now() / 1000
    const pastTime = now - filter.time * SECONDS_PER_DAY
    for (const order of orderList) {
      let valid = true
      const { retailer, createAt, state } = order
      const { askMint, bidMint } = booster[retailer.toBase58()]
      const listMintAddress = [askMint.toBase58(), bidMint.toBase58()]

      //Filter Params
      if (filter.status !== ALL && Object.keys(state)[0] !== filter.status)
        valid = false
      if (createAt.toNumber() < pastTime) valid = false
      if (filter.token !== ALL && !listMintAddress.includes(filter.token))
        valid = false

      if (valid) orderRequest.push(order)
    }
    return orderRequest
  }, [booster, filter, orderList])

  useEffect(() => {
    onChange(filteredOrders)
  }, [filteredOrders, onChange])

  //TODO: Set filter default

  return (
    <Row gutter={[12, 12]}>
      {/* Filter Token */}
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Token</Typography.Text>
          <Select
            style={{ width: 150 }}
            onChange={(mint) => setFilter({ ...filter, token: mint })}
            placement="bottomRight"
            value={filter.token}
          >
            <Select.Option value={ALL}>All token</Select.Option>
            {mintOptions.map((mint) => (
              <Select.Option value={mint} key={mint}>
                <Space>
                  <MintAvatar mintAddress={mint} />
                  <MintSymbol mintAddress={mint} />
                </Space>
              </Select.Option>
            ))}
          </Select>
        </Space>
      </Col>
      {/* Filter Time */}
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Time</Typography.Text>
          <Select
            style={{ width: 150 }}
            onChange={(val) => setFilter({ ...filter, time: val })}
            placement="bottomRight"
            value={filter.time}
          >
            {TIME_FILTER_OPTIONS.map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.key}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </Col>
      {/* Filter Status */}
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Status</Typography.Text>
          <Select
            style={{ width: 150 }}
            onChange={(val) => setFilter({ ...filter, status: val })}
            placement="bottomRight"
            value={filter.status}
          >
            {STATUS_OPTION[mode].map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.key}
              </Select.Option>
            ))}
          </Select>
        </Space>
      </Col>
    </Row>
  )
}

export default FilterOrders
