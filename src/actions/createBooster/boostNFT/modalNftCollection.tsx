import { Fragment, useState } from 'react'

import { Button, Col, Modal, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import {
  SearchNFT as ModalContentListNFTs,
  searchNFTType,
} from '@sen-use/components'

type ModalNftCollectionProps = {
  onSelect: (collectionAddress: string) => void
}

const ModalNftCollection = ({ onSelect }: ModalNftCollectionProps) => {
  const [visible, setVisible] = useState(false)

  const onSelectNFT = (mintAddress: string) => {
    onSelect(mintAddress)
    setVisible(false)
  }

  return (
    <Fragment>
      <Button
        onClick={() => setVisible(true)}
        size="large"
        type="dashed"
        className="btn-nft"
      >
        <Row gutter={[8, 8]} justify="center">
          <Col span={12}>
            <IonIcon style={{ fontSize: 24 }} name="add-outline" />
          </Col>
          <Col span={24}>
            <Typography.Text>
              Add NFT <br /> collections
            </Typography.Text>
          </Col>
        </Row>
      </Button>

      <Modal
        className="modal-nft-selection"
        visible={visible}
        footer={false}
        onCancel={() => setVisible(false)}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={4}>
              Select a NFT collection
            </Typography.Title>
          </Col>
          <Col span={24}>
            <ModalContentListNFTs
              onSelect={(mintAddress) => onSelectNFT(mintAddress)}
              searchNFTby={searchNFTType.collections}
            />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ModalNftCollection
