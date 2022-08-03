import { useState } from 'react'

import { MintAvatar, MintSymbol } from '@sen-use/components'
import { Col, Row, Select, Space, Typography } from 'antd'

import { ALL, STATUS_FILTER_OPTIONS, TIME_FILTER_OPTIONS } from 'constant'
import { useMintFilterOptions } from 'hooks/useMintFilterOptions'

const OrderFilterSet = () => {
  const [filter, setFilter] = useState({
    token: '',
    time: TIME_FILTER_OPTIONS[0],
    status: STATUS_FILTER_OPTIONS[0],
  })
  const mintOptions = useMintFilterOptions()

  //TODO: Set filter default

  return (
    <Row gutter={[12, 12]}>
      {/* Filter Token */}
      <Col span={4}>
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Token</Typography.Text>
          <Select
            style={{ width: '100%' }}
            onChange={(mint) => setFilter({ ...filter, token: mint })}
            placement="bottomRight"
            defaultValue={ALL}
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
      <Col span={4}>
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Time</Typography.Text>
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
        </Space>
      </Col>
      {/* Filter Status */}
      <Col span={4}>
        <Space size={4} direction="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">Status</Typography.Text>
          <Select
            style={{ width: '100%' }}
            onChange={(val) => setFilter({ ...filter, status: val })}
            placement="bottomRight"
            value={filter.status}
          >
            {STATUS_FILTER_OPTIONS.map((option) => (
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

export default OrderFilterSet
