import { Fragment, useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ModalContent from './modalContent'

import './index.less'

type BuyNowProps = {
  boosterAddress: string
}

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const [visible, setVisible] = useState(false)

  return (
    <Fragment>
      <Button
        block
        size="large"
        type="primary"
        onClick={() => setVisible(true)}
      >
        Buy Now
      </Button>
      <Modal
        visible={visible}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisible(false)}
        footer={null}
        className="card-manage"
        title={<Typography.Title level={4}>Buy token</Typography.Title>}
        destroyOnClose
      >
        <ModalContent
          boosterAddress={boosterAddress}
          onClose={() => setVisible(false)}
        />
      </Modal>
    </Fragment>
  )
}

export default BuyNow
