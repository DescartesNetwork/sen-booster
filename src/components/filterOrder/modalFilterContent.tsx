import { useCallback, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Radio, Row, Select, Space } from 'antd'
import { MintAvatar, MintSymbol } from '@sen-use/components'
import FilterElement from './filterElement'

import { TIME_FILTER_OPTIONS, ALL, STATUS_OPTIONS } from 'constant'
import { useMintFilterOptions } from 'hooks/useMintFilterOptions'
import { useOrderFiltered } from 'hooks/boosters/useOrderFiltered'
import { OrderRequest } from 'view/retailer/orderList'
import { AppState } from 'model'

type ModalFilterContentProps = {
  onClose: (value: boolean) => void
  onChange: (orders: OrderRequest[]) => void
}

const ModalFilterContent = ({ onClose, onChange }: ModalFilterContentProps) => {
  const [filter, setFilter] = useState({
    token: ALL,
    time: TIME_FILTER_OPTIONS[0].value,
    status: ALL,
  })
  const mode = useSelector((state: AppState) => state.settings.mode)
  const mintOptions = useMintFilterOptions()
  const { filteredOrders } = useOrderFiltered(filter)

  const onConfirm = useCallback(() => {
    onChange(filteredOrders)
    return onClose(false)
  }, [filteredOrders, onChange, onClose])

  return (
    <Row gutter={[16, 16]}>
      {/* Filter Token */}
      <Col span={24}>
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
      <Col span={24}>
        <FilterElement label="Time">
          <Radio.Group
            size="middle"
            onChange={(e) => setFilter({ ...filter, time: e.target.value })}
            style={{ width: '100%' }}
            value={filter.time}
          >
            <Row gutter={[12, 12]}>
              {TIME_FILTER_OPTIONS.map((option) => (
                <Col span={12} key={option.value}>
                  <Radio.Button
                    style={{
                      textAlign: 'center',
                      width: '100%',
                    }}
                    value={option.value}
                  >
                    {option.key}
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </FilterElement>
      </Col>
      {/* Filter Status */}
      <Col span={24}>
        <FilterElement label="Status">
          <Radio.Group
            size="middle"
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            style={{ width: '100%' }}
            value={filter.status}
          >
            <Row gutter={[12, 12]}>
              {STATUS_OPTIONS[mode].map((option) => (
                <Col span={8} key={option.value}>
                  <Radio.Button
                    style={{
                      textAlign: 'center',
                      width: '100%',
                    }}
                    value={option.value}
                  >
                    {option.key}
                  </Radio.Button>
                </Col>
              ))}
            </Row>
          </Radio.Group>
        </FilterElement>
      </Col>
      <Col span={24} />
      <Col span={24}>
        <Button onClick={onConfirm} type="primary" block>
          Confirm
        </Button>
      </Col>
    </Row>
  )
}

export default ModalFilterContent
