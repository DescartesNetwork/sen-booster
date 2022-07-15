import { Modal, Row } from 'antd'
import { useState } from 'react'

const AddBooster = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  return (
    <Row>
      Add Booster UI
      <Modal
        visible={isModalVisible}
        onOk={() => {
          setIsModalVisible(!isModalVisible)
        }}
        onCancel={() => setIsModalVisible(!isModalVisible)}
      >
        <p>Are you sure want to cancel?</p>
      </Modal>
    </Row>
  )
}

export default AddBooster
