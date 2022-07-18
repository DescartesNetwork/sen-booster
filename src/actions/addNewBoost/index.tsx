import { useState } from 'react'
import { Button, Col, Modal, Row } from 'antd'
import { useAppRouter } from 'hooks/useAppRouter'
import { useInitializeBooster } from 'hooks/actions/useInitializeBooster'

const AddNewBoost = () => {
  const { pushHistory } = useAppRouter()
  const { initializeBooster, loading } = useInitializeBooster()
  const [visibleCancelPopup, setVisibleCancelPopup] = useState(false)

  return (
    <Row>
      <Col>
        <Button onClick={() => setVisibleCancelPopup(true)}>Cancel</Button>
        <Button onClick={initializeBooster} loading={loading}>
          Add
        </Button>
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
