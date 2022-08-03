import { useMemo, useState } from 'react'

import { Col, Empty, Row } from 'antd'
import BoosterCard from './boosterCard'
import SortAndFilter from './sortAndFilter'

import { useTotalVoucherOfBooster } from 'hooks/boosters/useTotalVoucherOfBooster'

const Booster = () => {
  const [displayBoosters, setDisplayBoosters] = useState<string[]>([])
  const [isBoost, setIsBoost] = useState(false)
  const { getAmountVoucher } = useTotalVoucherOfBooster()

  const filteredBooster = useMemo(() => {
    const boosterAddress = displayBoosters.filter((address) => {
      if (isBoost && !getAmountVoucher(address)) return false
      return true
    })

    return boosterAddress
  }, [displayBoosters, getAmountVoucher, isBoost])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SortAndFilter setIsBoost={setIsBoost} onChange={setDisplayBoosters} />
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {!filteredBooster.length ? (
            <Col span={24}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={'No booster exist'}
              />
            </Col>
          ) : (
            filteredBooster.map((boosterAddress) => (
              <Col span={24} key={boosterAddress}>
                <BoosterCard boosterAddress={boosterAddress} />
              </Col>
            ))
          )}
        </Row>
      </Col>
    </Row>
  )
}

export default Booster
