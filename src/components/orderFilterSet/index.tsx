import { useState } from 'react'

import { MintAvatar, MintSymbol } from '@sen-use/components'
import { Col, Row, Select, Space, Typography } from 'antd'

import { ALL, STATUS_FILTER_OPTIONS, TIME_FILTER_OPTIONS } from 'constant'
import { useMintFilterOptions } from 'hooks/useMintFilterOptions'

const OrderFilterSet = () => {
  const [filter, setFilter] = useState({
    token: '',
    time: '',
    status: '',
  })
  const mintOptions = useMintFilterOptions()

  //TODO: Set filter default

  return (
    <Row gutter={[12, 12]}>
      {/* Filter Token */}
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Token</Typography.Text>
          <Select
            style={{ width: 120 }}
            onChange={(mint) => setFilter({ ...filter, token: mint })}
            placement="bottomRight"
            defaultValue={ALL}
          >
            <Select.Option value={ALL}>All token</Select.Option>
            {mintOptions.map((mint) => (
              <Select.Option value={mint}>
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
            style={{ width: 120 }}
            onChange={(val) => setFilter({ ...filter, time: val })}
            placement="bottomRight"
            value={filter.time}
          >
            {TIME_FILTER_OPTIONS.map((val) => (
              <Select.Option value={val}>{val}</Select.Option>
            ))}
          </Select>
        </Space>
      </Col>
      {/* Filter Status */}
      <Col>
        <Space size={4} direction="vertical">
          <Typography.Text>Status</Typography.Text>
          <Select
            style={{ width: 120 }}
            onChange={(val) => setFilter({ ...filter, status: val })}
            placement="bottomRight"
            value={filter.status}
          >
            {STATUS_FILTER_OPTIONS.map((val) => (
              <Select.Option value={val}>{val}</Select.Option>
            ))}
          </Select>
        </Space>
      </Col>
    </Row>
  )
}

export default OrderFilterSet
