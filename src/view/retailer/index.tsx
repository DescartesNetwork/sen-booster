import { Col, Layout } from 'antd'
import Header from 'components/header'
import { TabId } from 'constant'
import { useState } from 'react'
import BoostList from './boostList'
import OrderList from './orderList'

function Retailer() {
  const [tabId, setTabId] = useState(TabId.BoostList)
  return (
    <Layout>
      <Col span={24}>
        <Header tabId={tabId} setTabId={setTabId} isRetailer={true} />
      </Col>
      <Col>{tabId === TabId.BoostList ? <BoostList /> : <OrderList />}</Col>
    </Layout>
  )
}

export default Retailer
