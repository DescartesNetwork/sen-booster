import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { Col, Modal, Row, Tooltip, Typography, Image, Menu, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CardNFT from './cardNFT'

import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'

import { getMetaData } from 'helper'
import { useNFTByVoucher } from 'hooks/useNFTByVoucher'

type NftUploadProps = {
  onSelectNFT: (nftAddress: string, idx: number) => void
  boosterAddress: string
  selectedNFTs: string[]
}

type CollectionMenu = {
  label: string
  key: string
  icon: JSX.Element
}

const MAX_USABLE_AMOUNT_VOUCHER = 3

const NftUpload = ({
  onSelectNFT,
  boosterAddress,
  selectedNFTs,
}: NftUploadProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>(
    Array(MAX_USABLE_AMOUNT_VOUCHER).fill(''),
  )
  const [visibleNftModal, setVisibleNftModal] = useState(false)
  const [currentNFTIdx, seCurrentNFTIdx] = useState(0)
  const [collectionMenu, setCollectionMenu] = useState<CollectionMenu[]>([])
  const ownerNFTsByVouchers = useNFTByVoucher(boosterAddress)
  const { voucherPrintersByBooster } =
    useVoucherPrintersByBooster(boosterAddress)

  const unselectedOwnerNFTs = useMemo(() => {
    return ownerNFTsByVouchers.filter((val) => !selectedNFTs.includes(val.mint))
  }, [ownerNFTsByVouchers, selectedNFTs])

  const getCollectionMenu = useCallback(async () => {
    const collectionsInfo = await Promise.all(
      voucherPrintersByBooster.map(async (value, idx) => {
        const metaData = await getMetaData(value.collection.toBase58())
        return {
          label: metaData?.data.data.name || 'Unknown NFT',
          key: `${metaData?.data.data.name}-${idx}`,
          icon: <Typography.Title level={5}>.</Typography.Title>,
        }
      }),
    )
    setCollectionMenu(collectionsInfo)
  }, [voucherPrintersByBooster])

  useEffect(() => {
    getCollectionMenu()
  }, [getCollectionMenu])

  const handleNFTInfo = (nftAddress: string, nftImage: string) => {
    onSelectNFT(nftAddress, currentNFTIdx)
    //Remove selected NFT from list
    const currentImageUrls = [...imageUrls]
    currentImageUrls[currentNFTIdx] = nftImage
    setImageUrls(currentImageUrls)
    setVisibleNftModal(false)
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Text>Use NFTs to increase Buy-back rate</Typography.Text>
      </Col>
      <Col span={24}>
        <Space size={8}>
          {imageUrls.map((val, idx) => (
            <Space
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
                {val ? (
                  <Image
                    src={val}
                    alt="avatar"
                    width={64}
                    height={64}
                    style={{ borderRadius: 8 }}
                    preview={false}
                  />
                ) : (
                  <IonIcon name="add-outline" />
                )}
              </Tooltip>
            </Space>
          ))}
        </Space>
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
        <Row gutter={[24, 24]} className="scrollbar" style={{ maxHeight: 240 }}>
          {!!unselectedOwnerNFTs.length ? (
            unselectedOwnerNFTs.map((nft) => (
              <Col
                xs={12}
                md={8}
                key={nft.mint}
                style={{ textAlign: 'center' }}
              >
                <CardNFT nftAddress={nft.mint} onSelect={handleNFTInfo} />
              </Col>
            ))
          ) : (
            <Col>
              <Typography>You don't have a NFT</Typography>
              <Typography>
                You can buy NFTs from the collections below:
              </Typography>
              <Menu
                onClick={() => {}}
                style={{ borderRight: 'none' }}
                mode="inline"
                items={collectionMenu}
              />
            </Col>
          )}
        </Row>
      </Modal>
    </Row>
  )
}

export default NftUpload
