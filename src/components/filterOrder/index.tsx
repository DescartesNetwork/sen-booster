import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { MintAvatar, MintSymbol } from '@sen-use/components'
import { Col, Row, Select, Space } from 'antd'
import FilterElement from './filterElement'

import { ALL, TIME_FILTER_OPTIONS, STATUS_OPTIONS } from 'constant'
import { useMintFilterOptions } from 'hooks/useMintFilterOptions'
import { OrderRequest } from 'view/retailer/orderList'
import { AppState } from 'model'
import { useOrderFiltered } from 'hooks/boosters/useOrderFiltered'

type FilterOrdersProps = {
  onChange: (orders: OrderRequest[]) => void
}

const FilterOrders = ({ onChange }: FilterOrdersProps) => {
  const [filter, setFilter] = useState({
    token: ALL,
    time: TIME_FILTER_OPTIONS[0].value,
    status: ALL,
  })
  const mintOptions = useMintFilterOptions()
  const mode = useSelector((state: AppState) => state.settings.mode)
  const { filteredOrders } = useOrderFiltered(filter)

  useEffect(() => {
    onChange(filteredOrders)
  }, [filteredOrders, onChange])

  return (
    <Row gutter={[12, 12]}>
      {/* Filter Token */}
      <Col span={4}>
        <FilterElement label="Token">
          <Select
            style={{ width: '100%' }}
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
        </FilterElement>
      </Col>
      {/* Filter Time */}
      <Col span={4}>
        <FilterElement label="Time">
          <Select
            style={{ width: '100%' }}
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
        </FilterElement>
      </Col>
      {/* Filter Status */}
      <Col span={4}>
        <FilterElement label="Status">
          <Select
            style={{ width: '100%' }}
            onChange={(val) => setFilter({ ...filter, status: val })}
            placement="bottomRight"
            value={filter.status}
          >
            {STATUS_OPTIONS[mode].map((option) => (
              <Select.Option value={option.value} key={option.value}>
                {option.key}
              </Select.Option>
            ))}
          </Select>
        </FilterElement>
      </Col>
    </Row>
  )
}

export default FilterOrders
