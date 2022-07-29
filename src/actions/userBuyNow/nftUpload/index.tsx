import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'

import {
  Col,
  Modal,
  Row,
  Tooltip,
  Typography,
  Image,
  Space,
  Card,
  List,
  Button,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CardNFT from './cardNFT'

import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'

import { getMetaData } from 'helper'
import { useNFTByVoucher } from 'hooks/useNFTByVoucher'

type NftUploadProps = {
  onSelectNFT: (nftAddress: string) => void
  removeNFT: (nftAddress: string) => void
  boosterAddress: string
  selectedNFTs: string[]
}

const MAX_VOUCHER = 3

type NFTAdded = {
  nftAddress: string
  img: string
}

const NftUpload = ({
  onSelectNFT,
  boosterAddress,
  selectedNFTs,
  removeNFT,
}: NftUploadProps) => {
  const [NFTAdded, setNFTAdded] = useState<NFTAdded[]>(
    Array(MAX_VOUCHER).fill({ nftAddress: '', img: '' }),
  )
  const [visible, setVisible] = useState(false)
  const [currentNFTIdx, seCurrentNFTIdx] = useState(0)
  const [collections, setCollections] = useState<string[]>([])
  const ownerNFTsByVouchers = useNFTByVoucher(boosterAddress)
  const vouchers = useVoucherPrintersByBooster(boosterAddress)

  const unselectedOwnerNFTs = useMemo(() => {
    return ownerNFTsByVouchers.filter((val) => !selectedNFTs.includes(val.mint))
  }, [ownerNFTsByVouchers, selectedNFTs])

  const getCollections = useCallback(async () => {
    const collectionsInfo = await Promise.all(
      vouchers.map(async (voucher) => {
        const metaData = await getMetaData(voucher.collection.toBase58())
        return metaData?.data.data.name || 'Unknown NFT'
      }),
    )
    return setCollections(collectionsInfo)
  }, [vouchers])

  const onSelect = (nftAddress: string, img: string) => {
    onSelectNFT(nftAddress)
    //Remove selected NFT from list
    const currentImageUrls = [...NFTAdded]
    currentImageUrls[currentNFTIdx] = { nftAddress, img }
    setNFTAdded(currentImageUrls)
    setVisible(false)
  }

  const onDelete = (e: MouseEvent<HTMLElement>, img: string) => {
    e.stopPropagation()
    const nextNFTAdded = [...NFTAdded]
    const idx = nextNFTAdded.findIndex((nft) => img === nft.img)

    removeNFT(nextNFTAdded[idx].nftAddress)

    if (idx !== -1) nextNFTAdded[idx] = { nftAddress: '', img: '' }
    return setNFTAdded(nextNFTAdded)
  }

  useEffect(() => {
    getCollections()
  }, [getCollections])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Use NFTs to increase Buy-back rate</Typography.Text>
      </Col>
      <Col onClick={(e) => e} span={24}>
        <Space>
          {NFTAdded.map(({ img }, idx) => (
            <Tooltip
              placement="topLeft"
              title="NFTs in the collections below will be approved for this booster"
            >
              <Card
                className="upload-box card-nft-image-only"
                onClick={() => {
                  seCurrentNFTIdx(idx)
                  setVisible(true)
                }}
              >
                {img ? (
                  <Image
                    src={img}
                    alt="avatar"
                    width={64}
                    height={64}
                    style={{ borderRadius: 8, marginTop: -1 }}
                    preview={false}
                    className="nft-image"
                  />
                ) : (
                  <IonIcon name="add-outline" />
                )}
                {img && (
                  <Button
                    type="text"
                    className="icon-delete-nft"
                    onClick={(e) => onDelete(e, img)}
                    icon={<IonIcon name="trash-outline" />}
                  />
                )}
              </Card>
            </Tooltip>
          ))}
        </Space>
      </Col>
      <Modal
        title={<Typography.Title level={4}>Select a NFT</Typography.Title>}
        visible={visible}
        closeIcon={<IonIcon name="close-outline" />}
        onCancel={() => setVisible(false)}
        footer={null}
        className="card-manage"
        style={{ paddingBottom: 0 }}
      >
        <Row gutter={[24, 24]} className="scrollbar" style={{ maxHeight: 400 }}>
          {!!unselectedOwnerNFTs.length ? (
            unselectedOwnerNFTs.map((nft) => (
              <Col xs={12} md={12} key={nft.mint}>
                <CardNFT nftAddress={nft.mint} onSelect={onSelect} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Row gutter={[4, 4]}>
                <Col span={24}>
                  <Typography>You don't have a NFT</Typography>
                </Col>
                <Col span={24}>
                  <Typography>
                    You can buy NFTs from the collections below:
                  </Typography>
                </Col>
                <Col span={24}>
                  <List
                    itemLayout="horizontal"
                    dataSource={collections}
                    renderItem={(name) => (
                      <List.Item>
                        <Space size={12}>
                          <Typography.Text style={{ color: '#0fb5b8 ' }}>
                            &#x2022;
                          </Typography.Text>
                          <Typography.Text style={{ color: '#0fb5b8 ' }}>
                            {name}
                          </Typography.Text>
                        </Space>
                      </List.Item>
                    )}
                  />
                </Col>
              </Row>
            </Col>
          )}
        </Row>
      </Modal>
    </Row>
  )
}

export default NftUpload
