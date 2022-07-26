import { MintAvatar, MintSymbol } from '@sen-use/components'
import { Col, Row, Select, Space } from 'antd'

import { ALL } from 'constant'

const { Option } = Select

type TokenFilterProps = {
  options: string[]
  onFilter: (val: string) => void
}

const TokenFilter = ({ onFilter, options }: TokenFilterProps) => {
  return (
    <Row>
      <Col>
        <Select
          style={{ width: 120 }}
          onChange={onFilter}
          placement="bottomRight"
          defaultValue={ALL}
        >
          <Option value={ALL}>All token</Option>
          {options.map((val) => (
            <Option value={val}>
              <Space>
                <MintAvatar mintAddress={val} />
                <MintSymbol mintAddress={val} />
              </Space>
            </Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default TokenFilter
