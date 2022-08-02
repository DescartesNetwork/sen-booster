import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { utilsBN } from '@sen-use/web3'
import { useMint } from '@sentre/senhub'

import { Select } from 'antd'

import { UserBoosterCategory, USER_BOOSTER_CATEGORIES } from 'constant'
import { AppState } from 'model'
import { Ipfs } from 'senUse/ipfs'

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
  const { getDecimals } = useMint()

  const getTotalLPPaid = useCallback(
    async (address: string) => {
      const { askTotal, askMint } = boosters[address]
      const askDecimal = (await getDecimals(askMint.toBase58())) || 0
      return Number(utilsBN.undecimalize(askTotal, askDecimal))
    },
    [boosters, getDecimals],
  )

  const sortBooster = useCallback(async () => {
    const listTotalLpPaid: Record<string, number> = {}
    const listPayRate: Record<string, number> = {}
    const nextBooster = [...boosterAddress]

    for (const address of nextBooster) {
      const { metadata } = boosters[address]
      const lpPaid = await getTotalLPPaid(address)
      const { payRate } = await Ipfs.methods.booster.get(metadata)
      const biggestDiscount = Math.max(...Object.values(payRate))

      listTotalLpPaid[address] = lpPaid
      listPayRate[address] = biggestDiscount
    }

    const sortedBooster = nextBooster.sort(
      (address_a: string, address_b: string) => {
        const totalLP_a = listTotalLpPaid[address_a]
        const totalLP_b = listTotalLpPaid[address_b]
        const discount_a = listPayRate[address_a]
        const discount_b = listPayRate[address_b]

        if (sortBy.category === UserBoosterCategory.LPHighToLow)
          return totalLP_b - totalLP_a
        if (sortBy.category === UserBoosterCategory.LPLowToHigh)
          return totalLP_a - totalLP_b
        if (sortBy.category === UserBoosterCategory.RateHighToLow)
          return discount_b - discount_a
        if (sortBy.category === UserBoosterCategory.RateLowToHigh)
          return discount_a - discount_b

        return 0
      },
    )

    return onChange(sortedBooster)
  }, [boosterAddress, boosters, getTotalLPPaid, onChange, sortBy])

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
