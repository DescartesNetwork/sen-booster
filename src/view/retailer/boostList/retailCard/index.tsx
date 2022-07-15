import { useState } from 'react'

import { Button, Col, Modal, Row, Typography } from 'antd'
import BoosterProcess from 'components/boosterProcess'
import BoostPair from './boostPair'
import MintInput from 'components/mintInput'

function RetailCard() {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isBoost, setIsBoost] = useState(false)

  return (
    <Row>
      <BoostPair />
      <Col>Time and isBoost</Col>
      <Col>
        <BoosterProcess />
      </Col>
      <Col>
        <Button onClick={() => setIsModalVisible(true)}>Manage</Button>
      </Col>

      <Modal
        title="Manage"
        visible={isModalVisible}
        onOk={() => {}}
        closable
        onCancel={() => setIsModalVisible(false)}
      >
        <Row>
          <Col>Text</Col>
          <Col>
            <Typography.Text>You Pay</Typography.Text>
            <MintInput />
          </Col>
          {isBoost && (
            <Col>
              <Typography.Text>
                Use NFTs to increase Buy-back rate
              </Typography.Text>
            </Col>
          )}
          <Col span={24}>
            <Button>Buy</Button>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default RetailCard
