import { Fragment, useEffect, useState } from 'react'

import { Button, Modal, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import ModalFilterContent from './modalFilterContent'

import { OrderRequest } from 'view/retailer/orderList'
import { useOwnOrders } from 'hooks/boosters/useOwnOrders'

type ModalFilterProps = {
  onChange: (orders: OrderRequest[]) => void
}

const ModalFilter = ({ onChange }: ModalFilterProps) => {
  const [visible, setVisible] = useState(false)
  const { ownOrders } = useOwnOrders()

  useEffect(() => {
    onChange(ownOrders)
  }, [ownOrders, onChange])

  return (
    <Fragment>
      <Button
        style={{ background: 'transparent' }}
        onClick={() => setVisible(true)}
        icon={<IonIcon name="funnel-outline" />}
      />
      <Modal
        title={<Typography.Title level={4}> Filter</Typography.Title>}
        footer={null}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisible(false)}
        visible={visible}
        className="card-manage"
      >
        <ModalFilterContent onChange={onChange} onClose={setVisible} />
      </Modal>
    </Fragment>
  )
}
export default ModalFilter
