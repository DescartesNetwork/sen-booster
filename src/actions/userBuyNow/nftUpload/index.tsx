import { MouseEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useWallet } from '@sentre/senhub'

import {
  Col,
  Modal,
  Row,
  Tooltip,
  Typography,
  Space,
  Card,
  List,
  Button,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import {
  SearchNFT as ModalContentListNFTs,
  AvatarNFT,
  useNFTsByOwnerAndCollection,
} from '@sen-use/components'

import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'

import { getMetaData } from 'helper'

type NftUploadProps = {
  onSelectNFT: (nftAddresses: string[]) => void
  removeNFT: (nftAddress: string) => void
  boosterAddress: string
  selectedNFTs: string[]
}

const MAX_VOUCHER = 3

const NftUpload = ({
  onSelectNFT,
  boosterAddress,
  selectedNFTs,
  removeNFT,
}: NftUploadProps) => {
  const [NFTAdded, setNFTAdded] = useState<string[]>(
    Array(MAX_VOUCHER).fill(''),
  )
  const [visible, setVisible] = useState(false)
  const [currentNFTIdx, seCurrentNFTIdx] = useState(0)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const [collections, setCollections] = useState<string[]>([])
  const vouchers = useVoucherPrintersByBooster(boosterAddress)
  const acceptedCollections = useMemo(
    () => vouchers.map((val) => val.collection.toBase58()),
    [vouchers],
  )

  const { nftsSortByCollection: ownerNFTsByVouchers } =
    useNFTsByOwnerAndCollection(walletAddress, acceptedCollections)

  const unselectedOwnerNFTs = useMemo(() => {
    return ownerNFTsByVouchers?.filter(
      (val) => !selectedNFTs.includes(val.mint),
    )
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

  const onSelect = (nftAddress: string) => {
    //Remove selected NFT from list
    const currentNFTs = [...NFTAdded]
    currentNFTs[currentNFTIdx] = nftAddress
    onSelectNFT(currentNFTs)
    setNFTAdded(currentNFTs)
    setVisible(false)
  }

  const onDelete = (e: MouseEvent<HTMLElement>, nftAddress: string) => {
    e.stopPropagation()
    const nextNFTAdded = [...NFTAdded]
    const idx = nextNFTAdded.findIndex((nftAdded) => nftAddress === nftAdded)

    removeNFT(nextNFTAdded[idx])

    if (idx !== -1) nextNFTAdded[idx] = ''
    return setNFTAdded(nextNFTAdded)
  }

  useEffect(() => {
    getCollections()
  }, [getCollections])

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Space align="center" size={8}>
          <Typography.Text>Use NFTs to increase Buy-back rate</Typography.Text>
          <Tooltip
            placement="right"
            title={
              <Typography.Text style={{ color: '#E9E9EB' }}>
                Only retailer-approved NFTs can be used for this booster. There
                are 3 slots in all to use NFTs, with each slot used will
                increase the payout rate by 2.5%.
              </Typography.Text>
            }
          >
            <IonIcon name="information-circle-outline" />
          </Tooltip>
        </Space>
      </Col>
      <Col onClick={(e) => e} span={24}>
        <Space>
          {NFTAdded.map((nftAddress, idx) => (
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
                {nftAddress ? (
                  <div className="nft-image">
                    <AvatarNFT
                      mintAddress={nftAddress}
                      size={64}
                      style={{ borderRadius: 8, marginTop: -1 }}
                    />
                  </div>
                ) : (
                  <IonIcon name="add-outline" />
                )}
                {nftAddress && (
                  <Button
                    type="text"
                    className="icon-delete-nft"
                    onClick={(e) => onDelete(e, nftAddress)}
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
          {!!unselectedOwnerNFTs?.length ? (
            <Col span={24}>
              <ModalContentListNFTs
                onSelect={(mintAddress) => onSelect(mintAddress)}
                selectedNFTs={selectedNFTs}
                collectionAddress={acceptedCollections}
              />
            </Col>
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
