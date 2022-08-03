import { useEffect, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Checkbox, Col, Row, Space, Typography, Switch } from 'antd'

import { useOwnBoosters } from 'hooks/boosters/useOwnBoosters'
import { AppState } from 'model'
import { useTotalVoucherOfBooster } from 'hooks/boosters/useTotalVoucherOfBooster'

type FilterBoosterProps = {
  onChange: (boosterAddresses: string[]) => void
}

const FilterBooster = ({ onChange }: FilterBoosterProps) => {
  const [hideExpired, setHideExpired] = useState(true)
  const [hideFrozen, setIsHideFrozen] = useState(true)
  const [isBoost, setIsBoost] = useState(false)
  const { ownBoosters } = useOwnBoosters()
  const { getAmountVoucher } = useTotalVoucherOfBooster()
  const boosters = useSelector((state: AppState) => state.boosters)

  const filteredBooster = useMemo(() => {
    const boosterAddress: string[] = []
    for (const address of ownBoosters) {
      const { state, endAt } = boosters[address]
      const now = Date.now()
      const numEndAt = endAt.toNumber() * 1000
      let valid = true

      //Filter params
      if (hideExpired && numEndAt < now) valid = false
      if (hideFrozen && state.frozen) valid = false
      if (isBoost && !getAmountVoucher(address)) valid = false

      if (valid) boosterAddress.push(address)
    }
    return boosterAddress
  }, [
    boosters,
    getAmountVoucher,
    isBoost,
    hideExpired,
    hideFrozen,
    ownBoosters,
  ])

  useEffect(() => {
    onChange(filteredBooster)
  }, [filteredBooster, onChange])

  return (
    <Row gutter={[16, 16]}>
      <Col>
        <Space>
          <Checkbox
            checked={hideExpired}
            onChange={(e) => setHideExpired(e.target.checked)}
          />
          <Typography.Text>Hide expired booster</Typography.Text>
        </Space>
      </Col>
      <Col>
        <Space>
          <Checkbox
            checked={hideFrozen}
            onChange={(e) => setIsHideFrozen(e.target.checked)}
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
