import { useState } from 'react'

import { Col } from 'antd'
import Header from 'components/header'
import Booster from './booster'
import Redeem from './redeem'
import Faq from './faq'
import Layout from 'components/layout'
import { TabId } from 'constant'

function User() {
  const [tabId, setTabId] = useState(TabId.Booster)

  return (
    <Layout>
      <Col span={24}>
        <Header tabId={tabId} setTabId={setTabId} />
      </Col>
      <Col>{tabId === TabId.Booster ? <Booster /> : <Redeem />}</Col>
      <Col>
        <Faq />
      </Col>
    </Layout>
  )
}

export default User
