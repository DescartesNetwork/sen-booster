import FreezeBoost from 'actions/retailerFreezeBoost'
import ThawBoost from 'actions/retailerThawBoost'
import RetailerUpdateBudge from 'actions/retailerUpdateBudget'
import { Col, Row, Tabs } from 'antd'
import { AppState } from 'model'
import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

const { TabPane } = Tabs

type ManageProps = {
  boosterAddr: string
}

const Manage = ({ boosterAddr }: ManageProps) => {
  const { bidMint, askMint, bidTotal, bidReserve } = useSelector(
    (state: AppState) => state.booster[boosterAddr],
  )
  console.log(bidMint, askMint, bidTotal, bidReserve)
  const isFreeze = useMemo(() => {
    return false
  }, [])

  return (
    <Row>
      <Col>Manage</Col>
      <Col>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Tab 1" key="1">
            <RetailerUpdateBudge />
          </TabPane>
          <TabPane tab="Tab 2" key="2">
            {isFreeze ? <ThawBoost /> : <FreezeBoost />}
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  )
}

export default Manage
