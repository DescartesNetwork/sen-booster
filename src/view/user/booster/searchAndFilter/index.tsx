import { memo, useState } from 'react'

import { Col, Row, Space, Switch } from 'antd'
import SortBooster from './sortBooster'
import SearchBooster from './searchBooster'

type SearchAndFilterProps = {
  onChange: (boosters: string[]) => void
  setIsBoost: (value: boolean) => void
}

const SearchAndFilter = memo(
  ({ onChange, setIsBoost }: SearchAndFilterProps) => {
    const [searchedBoosters, setSearchedBoosters] = useState<string[]>([])

    return (
      <Row gutter={[12, 12]} align="middle">
        <Col xs={24} md={16} lg={10}>
          <SearchBooster onChange={setSearchedBoosters} />
        </Col>
        <Col>
          <SortBooster boosterAddress={searchedBoosters} onChange={onChange} />
        </Col>
        <Col>
          <Space>
            Boost only
            <Switch onChange={setIsBoost} size="small" />
          </Space>
        </Col>
      </Row>
    )
  },
)
export default SearchAndFilter
