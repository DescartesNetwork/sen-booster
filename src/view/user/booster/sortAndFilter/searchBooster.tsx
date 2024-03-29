import { useEffect, useState } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Input, Button } from 'antd'

import { useSearchedBoosters } from 'hooks/boosters/useSearchBoosters'

type SearchBoosterProps = {
  onChange: (boosters: string[]) => void
}
const SearchBooster = ({ onChange }: SearchBoosterProps) => {
  const [searchText, setSearchText] = useState('')
  const searchedBoosters = useSearchedBoosters(searchText)

  useEffect(() => {
    onChange(searchedBoosters)
  }, [onChange, searchedBoosters])

  return (
    <Input
      placeholder="Search LP, token"
      value={searchText}
      prefix={
        !searchText ? (
          <IonIcon
            style={{ fontSize: '24px', marginLeft: -5 }}
            name="search-outline"
          />
        ) : (
          <Button
            type="text"
            style={{
              width: 'auto',
              height: 'auto',
              background: 'transparent',
              marginLeft: -7,
            }}
            onClick={() => setSearchText('')}
            icon={<IonIcon name="close-outline" />}
          />
        )
      }
      onChange={(e) => setSearchText(e.target.value)}
      className="search-input"
    />
  )
}

export default SearchBooster
