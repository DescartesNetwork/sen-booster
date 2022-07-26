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
  const boosters = useSelector((state: AppState) => state.boosters)
  const {
    wallet: { address: walletAddress },
  } = useWallet()

  const myBooster = useMemo(() => {
    const boosterAddresses: string[] = []
    for (const boosterAddress in boosters) {
      const { authority } = boosters[boosterAddress]
      if (authority.toBase58() === walletAddress)
        boosterAddresses.push(boosterAddress)
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
            <Button
              type="primary"
              onClick={() => pushHistory('/create-booster')}
            >
              Add booster
            </Button>
          </Col>
        </Row>
      </Col>
      <Col span={24}>
        <Row gutter={[24, 24]}>
          {myBooster.map((boosterAddress) => (
            <Col xs={24} md={12} key={boosterAddress}>
              <RetailCard boosterAddress={boosterAddress} />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  )
}

export default BoostList
