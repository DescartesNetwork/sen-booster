import { memo, useCallback, useState } from 'react'
import { useDebounce } from 'react-use'

import { Col, Row } from 'antd'
import FilterBooster from './filterBooster'
import SearchBooster from './searchBooster'

type SearchAndFilterProps = {
  onChange: (boosters: string[]) => void
}

const SearchAndFilter = memo(({ onChange }: SearchAndFilterProps) => {
  const [searchedBoosters, setSearchedBoosters] = useState<string[]>([])
  const [filteredBoosters, setFilteredBoosters] = useState<string[]>([])

  const updateDisplayBoosters = useCallback(() => {
    const displayBoosters: string[] = []
    for (const addr of searchedBoosters) {
      if (!filteredBoosters.includes(addr)) continue
      displayBoosters.push(addr)
    }
    onChange(displayBoosters)
  }, [filteredBoosters, onChange, searchedBoosters])
  useDebounce(() => updateDisplayBoosters(), 300, [updateDisplayBoosters])

  return (
    <Row>
      <Col span={8} style={{ marginRight: 12 }}>
        <SearchBooster onChange={setSearchedBoosters} />
      </Col>
      <Col>
        <FilterBooster onChange={setFilteredBoosters} />
      </Col>
    </Row>
  )
})
export default SearchAndFilter