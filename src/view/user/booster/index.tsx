import { useMemo, useState } from 'react'

import { Col, Row } from 'antd'
import BoosterCard from './boosterCard'
import SearchAndFilter from './searchAndFilter'

import useAmountVoucher from 'hooks/boosters/useAmountVoucher'

const Booster = () => {
  const [displayBoosters, setDisplayBoosters] = useState<string[]>([])
  const [isBoost, setIsBoost] = useState(false)
  const { getAmountVoucher } = useAmountVoucher()

  const filteredBooster = useMemo(() => {
    const boosterAddress: string[] = []
    for (const address of displayBoosters) {
      if (isBoost && !getAmountVoucher(address)) continue
      boosterAddress.push(address)
    }
    return boosterAddress
  }, [displayBoosters, getAmountVoucher, isBoost])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SearchAndFilter
          setIsBoost={setIsBoost}
          onChange={setDisplayBoosters}
        />
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {filteredBooster.map((boosterAddress) => (
            <Col span={24} key={boosterAddress}>
              <BoosterCard boosterAddress={boosterAddress} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default Booster
