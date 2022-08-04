import { Fragment, useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ModalContent from './modalContent'

import './index.less'

type BuyNowProps = {
  boosterAddress: string
}

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Fragment>
      <Button
        block
        size="large"
        type="primary"
        onClick={() => setIsVisible(true)}
      >
        Buy Now
      </Button>
      <Modal
        visible={isVisible}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setIsVisible(false)}
        footer={null}
        className="card-manage"
        title={<Typography.Title level={4}>Buy token</Typography.Title>}
        destroyOnClose
      >
        <ModalContent
          boosterAddress={boosterAddress}
          onClose={() => {
            setIsVisible(false)
          }}
        />
      </Modal>
    </Fragment>
  )
}

export default BuyNow
