import { useEffect, useState } from 'react'
import { Col, Row, Select } from 'antd'

import { UserBoosterCategory, USER_BOOSTER_CATEGORIES } from 'constant'
import { useFilterUserBooster } from 'hooks/boosters/useFilterUserBooster'

export type BoosterFilter = {
  category: UserBoosterCategory
}
type FilterProps = {
  onChange: (value: string[]) => void
}

const FilterBooster = ({ onChange }: FilterProps) => {
  const [filter, setFilter] = useState<BoosterFilter>({
    category: UserBoosterCategory.AllBooster,
  })
  const filteredBooster = useFilterUserBooster(filter)

  useEffect(() => {
    onChange(filteredBooster)
  }, [filteredBooster, onChange])

  return (
    <Row>
      <Col>
        <Select
          style={{ width: 120 }}
          onChange={(category) => setFilter({ ...filter, category })}
          placement="bottomRight"
          value={filter.category}
        >
          {USER_BOOSTER_CATEGORIES.map((val) => (
            <Select.Option value={val} key={val}>
              {val}
            </Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  )
}

export default FilterBooster
