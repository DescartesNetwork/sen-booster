import { useState } from 'react'
import { Button, Col, Modal, Row } from 'antd'
import { useAppRouter } from 'hooks/useAppRouter'

const AddNewBoost = () => {
  const { pushHistory } = useAppRouter()
  const [visibleCancelPopup, setVisibleCancelPopup] = useState(false)
  const onCreateBooster = () => {}

  return (
    <Row>
      <Col>
        <Button onClick={() => setVisibleCancelPopup(true)}>Cancel</Button>
        <Button onClick={onCreateBooster}>Add</Button>
      </Col>
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
