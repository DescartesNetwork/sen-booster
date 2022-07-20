import { useState } from 'react'

import { Col, Row } from 'antd'
import Header from 'components/header'
import BoostList from './boostList'
import OrderList from './orderList'

import { TabId } from 'constant'

import './index.less'

function Retailer() {
  const [tabId, setTabId] = useState(TabId.BoostList)
  return (
    <Row gutter={[24, 24]} justify="center">
      <Col span={16}>
        <Header tabId={tabId} setTabId={setTabId} isRetailer={true} />
      </Col>
      <Col span={16}>
        {tabId === TabId.BoostList ? <BoostList /> : <OrderList />}
      </Col>
    </Row>
  )
}

export default Retailer
