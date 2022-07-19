import { Fragment } from 'react'

import { Button, Col, Modal, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { useAppRouter } from 'hooks/useAppRouter'

type ActionCancelProps = {
  visible: boolean
  setVisible: (val: boolean) => void
}

const ActionCancel = ({ visible, setVisible }: ActionCancelProps) => {
  const { pushHistory } = useAppRouter()

  return (
    <Fragment>
      <Button size="large" block onClick={() => setVisible(true)}>
        Cancel
      </Button>
      <Modal
        visible={visible}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisible(false)}
        footer={null}
        className="card-lightning"
        style={{ paddingBottom: 0 }}
      >
        <Row gutter={[32, 32]}>
          <Col span={24}>
            <Space size={15} align="baseline">
              <IonIcon
                name="alert-circle-outline"
                style={{ color: '#FA8C16', fontSize: 18 }}
              />
              <Space size={4} direction="vertical">
                <Typography.Text>
                  Are you sure you want to cancel?
                </Typography.Text>
                <Typography.Text type="secondary">
                  Your data will not be saved.
                </Typography.Text>
              </Space>
            </Space>
          </Col>

          <Col span={24} style={{ textAlign: 'right' }}>
            <Space>
              <Button onClick={() => setVisible(false)} type="ghost">
                No
              </Button>
              <Button onClick={() => pushHistory('/retailer')} type="primary">
                Yes
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ActionCancel
