import { useState } from 'react'
import { Button, Col, Row } from 'antd'

const AddNewBoost = () => {
  const [visibleCancelPopup, setVisibleCancelPopup] = useState(false)
  const onCreateBooster = () => {}
  return (
    <Row>
      <Col>
        <Button onClick={() => setVisibleCancelPopup(true)}>Cancel</Button>
        <Button onClick={onCreateBooster}>Add</Button>
      </Col>
    </Row>
  )
}

export default AddNewBoost
