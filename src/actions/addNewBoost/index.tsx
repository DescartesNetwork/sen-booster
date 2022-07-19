import { useState } from 'react'

import { Button, Col, Modal, Row } from 'antd'

import { useAppRouter } from 'hooks/useAppRouter'

const AddNewBoost = () => {
  const { pushHistory } = useAppRouter()
  const [visibleCancelPopup, setVisibleCancelPopup] = useState(false)

  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} md={12}>
        <Button block onClick={() => setVisibleCancelPopup(true)}>
          Cancel
        </Button>
      </Col>
      <Col xs={24} md={12}></Col>
      <Modal
        title="Are you sure you want to cancel?"
        visible={visibleCancelPopup}
        onOk={() => {
          pushHistory('/retailer')
        }}
        onCancel={() => setVisibleCancelPopup(false)}
      >
        Your data will not be saved
      </Modal>
    </Row>
  )
}

export default AddNewBoost
