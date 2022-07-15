import { Button, Col, Row, Tabs } from 'antd'
import React from 'react'

const { TabPane } = Tabs

const Manage = () => {
  return (
    <Row>
      <Col>Manage UI</Col>
      <Col>
        <Tabs defaultActiveKey="1" onChange={() => {}}>
          <TabPane tab="Budge" key="1">
            Content of Tab Pane 1
          </TabPane>
          <TabPane tab="Freeze/Thaw" key="2">
            Content of Tab Pane 2
          </TabPane>
        </Tabs>
      </Col>
      <Col>
        <Button>Freeze</Button>
      </Col>
    </Row>
  )
}

export default Manage
