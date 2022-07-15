import { Col, Row, Segmented } from 'antd'
import { TabId } from 'constant'
import { type } from 'os'
import React from 'react'

type HeaderProps = {
  tabId: TabId
  setTabId: (newValue: TabId) => void
  isRetailer?: boolean
}

const Header = ({ tabId, setTabId, isRetailer = false }: HeaderProps) => {
  return (
    <Row>
      <Col>
        <Segmented
          options={
            !isRetailer
              ? [
                  { label: 'Booster', value: TabId.Booster },
                  { label: 'Redeem', value: TabId.Redeem },
                ]
              : [
                  { label: 'Boost list', value: TabId.BoostList },
                  { label: 'Order list', value: TabId.OrderList },
                ]
          }
          value={tabId}
          onChange={(value) => setTabId(TabId.BoostList)}
        />
      </Col>
      <Col></Col>
    </Row>
  )
}

export default Header
