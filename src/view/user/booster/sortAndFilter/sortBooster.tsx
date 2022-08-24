import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Select } from 'antd'

import { UserBoosterCategory, USER_BOOSTER_CATEGORIES } from 'constant'
import { AppState } from 'model'
import { Ipfs } from 'senUse/ipfs'
import { useTotalLPSold } from 'hooks/useTotalLPSold'

export type BoosterSort = {
  category: UserBoosterCategory
}
type SortBoosterProps = {
  onChange: (value: string[]) => void
  boosterAddress: string[]
}

const SortBooster = ({ onChange, boosterAddress }: SortBoosterProps) => {
  const [sortBy, setSortBy] = useState<BoosterSort>({
    category: UserBoosterCategory.LPHighToLow,
  })
  const boosters = useSelector((state: AppState) => state.boosters)
  const { getTotalLpSold } = useTotalLPSold()

  const sortBooster = useCallback(async () => {
    try {
      const listTotalLpPaid: Record<string, number> = {}
      const listPayRate: Record<string, number> = {}
      const nextBooster = [...boosterAddress]

      for (const address of nextBooster) {
        const { metadata } = boosters[address]
        const lpPaid = await getTotalLpSold(address)
        const { payRate } = await Ipfs.methods.booster.get(metadata)
        const biggestDiscount = Math.max(...Object.values(payRate))

        listTotalLpPaid[address] = Number(lpPaid)
        listPayRate[address] = biggestDiscount
      }

      const sortedBooster = nextBooster.sort(
        (address_a: string, address_b: string) => {
          const totalLP_a = listTotalLpPaid[address_a]
          const totalLP_b = listTotalLpPaid[address_b]
          const discount_a = listPayRate[address_a]
          const discount_b = listPayRate[address_b]

          switch (sortBy.category) {
            case UserBoosterCategory.LPHighToLow:
              return totalLP_b - totalLP_a
            case UserBoosterCategory.LPLowToHigh:
              return totalLP_a - totalLP_b
            case UserBoosterCategory.RateHighToLow:
              return discount_b - discount_a
            case UserBoosterCategory.RateLowToHigh:
              return discount_a - discount_b
            default:
              return 0
          }
        },
      )

      return onChange(sortedBooster)
    } catch (error) {}
  }, [boosterAddress, boosters, getTotalLpSold, onChange, sortBy])

  useEffect(() => {
    sortBooster()
  }, [sortBooster])

  return (
    <Select
      style={{ width: 170 }}
      onChange={(category) => setSortBy({ ...sortBy, category })}
      placement="bottomRight"
      value={sortBy.category}
    >
      {USER_BOOSTER_CATEGORIES.map((val) => (
        <Select.Option value={val} key={val}>
          {val}
        </Select.Option>
      ))}
    </Select>
  )
}

export default SortBooster
