import { useState } from 'react'

import { Col, Row } from 'antd'
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
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Header tabId={tabId} setTabId={setTabId} />
        </Col>
        <Col span={24}>
          {tabId === TabId.Booster ? <Booster /> : <Redeem />}
        </Col>
        <Col span={24} style={{ marginTop: 40 }}>
          <Faq />
        </Col>
      </Row>
    </Layout>
  )
}

export default User
