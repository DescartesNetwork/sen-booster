import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Checkbox, Col, Row, Space, Typography, Switch } from 'antd'

import { useOwnBoosters } from 'hooks/boosters/useOwnBoosters'
import { AppState } from 'model'
import useAmountVoucher from 'hooks/boosters/useAmountVoucher'

type FilterBoosterProps = {
  onChange: (boosterAddresses: string[]) => void
}

const FilterBooster = ({ onChange }: FilterBoosterProps) => {
  const [isHideExpired, setIsHideExpired] = useState(true)
  const [isHideFreeze, setIsHideFreeze] = useState(true)
  const [isBoost, setIsBoost] = useState(false)
  const { ownBoosters } = useOwnBoosters()
  const { getAmountVoucher } = useAmountVoucher()
  const boosters = useSelector((state: AppState) => state.boosters)

  const filteredBooster = useMemo(() => {
    const boosterAddress: string[] = []
    for (const address of ownBoosters) {
      const { state, endAt } = boosters[address]
      const now = Date.now()
      const numEndAt = endAt.toNumber() * 1000
      let valid = true

      //Filter params
      if (isHideExpired && numEndAt < now) valid = false
      if (isHideFreeze && state.frozen) valid = false
      if (isBoost && !getAmountVoucher(address)) valid = false

      if (valid) boosterAddress.push(address)
    }
    return boosterAddress
  }, [
    boosters,
    getAmountVoucher,
    isBoost,
    isHideExpired,
    isHideFreeze,
    ownBoosters,
  ])

  useEffect(() => {
    onChange(filteredBooster)
  }, [filteredBooster, onChange])

  return (
    <Row justify="space-between">
      <Col>
        <Space>
          <Checkbox
            checked={isHideExpired}
            onChange={(e) => setIsHideExpired(e.target.checked)}
          />
          <Typography.Text>Hide expired booster</Typography.Text>
        </Space>
      </Col>
      <Col>
        <Space>
          <Checkbox
            checked={isHideFreeze}
            onChange={(e) => setIsHideFreeze(e.target.checked)}
          />
          <Typography.Text>Hide freeze booster</Typography.Text>
        </Space>
      </Col>
      <Col>
        <Space>
          Boost only
          <Switch onChange={setIsBoost} size="small" />
        </Space>
      </Col>
    </Row>
  )
}

export default FilterBooster
