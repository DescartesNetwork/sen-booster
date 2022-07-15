import React, { useState } from 'react'

import { Button, Col, Modal, Row, Switch, Typography, Upload } from 'antd'
import MintInput from 'components/mintInput'
import Tag from './Tag'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'

const BuyNow = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isBoost, setIsBoost] = useState(false)
  return (
    <Row>
      <Col flex="auto">
        <Button onClick={() => setIsModalVisible(true)}>Buy Now</Button>
      </Col>
      <Modal
        title="Buy Token"
        visible={isModalVisible}
        onOk={() => {}}
        closable
        onCancel={() => setIsModalVisible(false)}
      >
        <Col>Text</Col>
        <Col>
          <Typography.Text>You Pay</Typography.Text>
          <MintInput />
        </Col>
        <Col>
          <Typography.Text>Lock time</Typography.Text>
          {[1, 2, 3].map((val) => (
            <Tag />
          ))}
        </Col>
        <Col>
          <Typography.Text>Boost</Typography.Text>
          <Switch
            size="small"
            checked={isBoost}
            onChange={() => setIsBoost(!isBoost)}
          />
        </Col>
        {isBoost && (
          <Col>
            <Typography.Text>
              Use NFTs to increase Buy-back rate
            </Typography.Text>
            {[1, 2, 3].map((val) => (
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                // beforeUpload={beforeUpload}
                // onChange={handleChange}
              />
            ))}
          </Col>
        )}
        <Col>
          <EstimatedInfo />
        </Col>
        <Col span={24}>
          <Button>Buy</Button>
        </Col>
      </Modal>
    </Row>
  )
}

export default BuyNow
