import React, { useCallback, useEffect, useState } from 'react'
import { useWallet } from '@sentre/senhub'

import { Col, Modal, Row, Tooltip, Typography, Image, Menu, Space } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CardNFT from './cardNFT'

import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'
import useOwnerNFT from 'hooks/nft/useOwnerNFT'

import { MetadataDataType } from 'lib/metaplex'
import { getMetaData } from 'helper'

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

const NftUpload = ({
  onSelectNFT,
  boosterAddress,
  selectedNFTs,
}: NftUploadProps) => {
  const [imageUrls, setImageUrls] = useState<string[]>(['', '', ''])
  const [visibleNftModal, setVisibleNftModal] = useState(false)
  const [currentNFTIdx, seCurrentNFTIdx] = useState(0)
  const [collectionMenu, setCollectionMenu] = useState<CollectionMenu[]>([])
  const [ownerNFTsByVouchers, setOwnerNFTsByVouchers] = useState<
    MetadataDataType[]
  >([])
  const voucherPrinters = useVoucherPrintersByBooster(boosterAddress)
  const {
    wallet: { address },
  } = useWallet()
  const { nfts } = useOwnerNFT(address)

  let getOwnerNFTsByVouchers = useCallback(() => {
    if (!voucherPrinters.length || !nfts) return []
    const acceptedCollections = voucherPrinters.map((val) =>
      val.collection.toBase58(),
    )
    let listNFTs: MetadataDataType[] = []

    nfts?.forEach((nft: MetadataDataType) => {
      if (
        nft.collection &&
        !selectedNFTs.includes(nft.mint) &&
        acceptedCollections.includes(nft.collection.key)
      ) {
        listNFTs.push(nft)
      }
    })

    setOwnerNFTsByVouchers(listNFTs)
  }, [nfts, selectedNFTs, voucherPrinters])

  useEffect(() => {
    getOwnerNFTsByVouchers()
  }, [getOwnerNFTsByVouchers])

  const getCollectionMenu = useCallback(async () => {
    const collectionsInfo = await Promise.all(
      voucherPrinters.map(async (value, idx) => {
        const metaData = await getMetaData(value.collection.toBase58())
        return {
          label: metaData?.data.data.name || 'Unknown NFT',
          key: `${metaData?.data.data.name}-${idx}`,
          icon: <Typography.Title level={5}>.</Typography.Title>,
        }
      }),
    )
    setCollectionMenu(collectionsInfo)
  }, [voucherPrinters])

  useEffect(() => {
    getCollectionMenu()
  }, [getCollectionMenu])

  const handleNFTInfo = (nftAddress: string, nftImage: string) => {
    onSelectNFT(nftAddress, currentNFTIdx)
    //Remove selected NFT from list
    const currentOwnerNFTsByVouchers = [...ownerNFTsByVouchers].filter(
      (val) => val.mint !== nftAddress,
    )
    setOwnerNFTsByVouchers(currentOwnerNFTsByVouchers)
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
          {!!ownerNFTsByVouchers.length ? (
            ownerNFTsByVouchers.map((nft) => (
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
