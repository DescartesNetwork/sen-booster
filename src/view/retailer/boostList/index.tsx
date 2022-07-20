import { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Row } from 'antd'
import Filter from 'components/orderFilterSet'
import RetailCard from './retailCard'
import { useWallet } from '@sentre/senhub'

import { useAppRouter } from 'hooks/useAppRouter'
import { AppState } from 'model'

const BoostList = () => {
  const { pushHistory } = useAppRouter()
  const boosters = useSelector((state: AppState) => state.booster)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const myBooster = useMemo(() => {
    const boosterAddresses: string[] = []
    for (const boosterAddr in boosters) {
      const { authority } = boosters[boosterAddr]
      if (authority.toBase58() === walletAddress)
        boosterAddresses.push(boosterAddr)
    }
    return boosterAddresses
  }, [boosters, walletAddress])

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Row>
          <Col flex="auto">
            <Filter />
          </Col>
          <Col>
            <Button onClick={() => pushHistory('/create-booster')}>
              Add booster
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {myBooster.map((boosterAddr) => (
            <Col xs={24} md={12} key={boosterAddr}>
              <RetailCard boosterAddr={boosterAddr} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default BoostList
