import React, { useState } from 'react'
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload'

import {
  Col,
  List,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
  UploadProps,
  Image,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'

import { notifyError, notifySuccess } from 'helper'
import useOwnerNFT from 'hooks/useOwnerNFT'
import { useWallet } from '@sentre/senhub'
import NftInfo from './nftInfo'

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result as string))
  reader.readAsDataURL(img)
}

type NftUploadProps = {
  onSelectNFT: (nftAddress: string) => void
}

const NftUpload = ({ onSelectNFT }: NftUploadProps) => {
  const [loading, setLoading] = useState(false)
  const [imageUrls, setImageUrls] = useState<string[]>(['', '', ''])
  const [visibleNftModal, setVisibleNftModal] = useState(false)
  const [currentNFTIdx, seCurrentNFTIdx] = useState(0)
  const {
    wallet: { address },
  } = useWallet()
  const { nfts } = useOwnerNFT(address)

  const uploadButton = (
    <IonIcon name={loading ? 'refresh-outline' : 'add-outline'} />
  )

  const handleNFTInfo = ({
    nftAddress,
    nftImage,
  }: {
    nftAddress: string
    nftImage: string
  }) => {
    onSelectNFT(nftAddress)
    const currentImageUrls = [...imageUrls]
    currentImageUrls[currentNFTIdx] = nftImage
    setImageUrls(currentImageUrls)
  }

  return (
    <Row>
      <Col span={24}>
        <Typography.Text>Use NFTs to increase Buy-back rate</Typography.Text>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          {imageUrls.map((val, idx) => (
            <Col
              className="upload-box"
              onClick={() => {
                seCurrentNFTIdx(idx)
                setVisibleNftModal(true)
              }}
            >
              <Tooltip
                placement="topLeft"
                title={
                  <Row>
                    <Col span={24}>
                      <Typography>
                        NFTs in the collections below will be approved for this
                        booster:
                      </Typography>
                    </Col>
                    <Col></Col>
                  </Row>
                }
              >
                {val ? <Image src={val} alt="avatar" /> : uploadButton}
              </Tooltip>
            </Col>
          ))}
        </Row>
      </Col>
      <Modal
        title={<Typography.Title level={4}>Select a NFT</Typography.Title>}
        visible={visibleNftModal}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisibleNftModal(false)}
        footer={null}
        className="card-lightning"
        style={{ paddingBottom: 0 }}
        width={692}
      >
        <Row gutter={[24, 24]}>
          {nfts?.map((nft) => (
            <NftInfo nftAddress={nft.mint} onSelect={handleNFTInfo} />
          ))}
        </Row>
      </Modal>
    </Row>
  )
}

export default NftUpload
