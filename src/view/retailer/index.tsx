import { useState } from 'react'

import { Col, Row } from 'antd'
import BoostList from './boostList'
import OrderList from './orderList'
import Header from 'components/header'
import Layout from 'components/layout'

import { TabId } from 'constant'

import './index.less'

function Retailer() {
  const [tabId, setTabId] = useState(TabId.BoostList)
  return (
    <Layout>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Header tabId={tabId} setTabId={setTabId} />
        </Col>
        <Col span={24}>
          {tabId === TabId.BoostList ? <BoostList /> : <OrderList />}
        </Col>
      </Row>
    </Layout>
  )
}

export default Retailer
