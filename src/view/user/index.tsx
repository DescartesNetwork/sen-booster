import { useState } from 'react'

import { Col, Row } from 'antd'
import Banner from 'components/banner'
import Header from 'components/header'
import Booster from './booster'
import Redeem from './redeem'
import Faq from './faq'
import Layout from 'components/layout'
import { TabId } from 'constant'

function User() {
  const [tabId, setTabId] = useState<TabId>(TabId.Booster)

  return (
    <Layout>
      <Col span={24}>
        <Header tabId={tabId} setTabId={setTabId} isRetailer={false} />
      </Col>
      <Col>{tabId === TabId.Booster ? <Booster /> : <Redeem />}</Col>
      <Col>
        <Faq />
      </Col>
    </Layout>
  )
}

export default User
