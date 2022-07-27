import { Fragment, useCallback, useEffect, useState } from 'react'
import { useWallet } from '@sentre/senhub'
import { account } from '@senswap/sen-js'

import { Button, Col, Empty, Modal, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import SearchNftCollection from './searchNftCollection'
import CardNFT from './cardNFT'

import useOwnerNFT from 'hooks/nft/useOwnerNFT'
import configs from 'configs'

const {
  sol: { metaplexNFT },
} = configs

type ModalNftCollectionProps = {
  onSelect: (collectionAddress: string) => void
}

const ModalNftCollection = ({ onSelect }: ModalNftCollectionProps) => {
  const [visible, setVisible] = useState(false)
  const [collectionAddresses, setCollectionAddresses] = useState<string[]>([])
  const [searchText, setSearchText] = useState<string>('')
  const [loading, setLoading] = useState(false)
  const {
    wallet: { address: walletAddress },
  } = useWallet()
  const { nfts } = useOwnerNFT(walletAddress)

  const getNftCollectionInfo = useCallback(async () => {
    let listAddress: string[] = []
    if (!account.isAddress(searchText)) return listAddress
    let collectionInfo = await metaplexNFT.getNftMetadata(searchText)
    if (collectionInfo.data) {
      listAddress.push(collectionInfo.data.mint)
    } else {
      listAddress = []
    }
    return listAddress
  }, [searchText])

  const onSelectNFT = (mintAddress: string) => {
    onSelect(mintAddress)
    onCloseModal()
  }

  const onCloseModal = () => {
    setSearchText('')
    setVisible(false)
  }

  const getCollectionNFTs = useCallback(async () => {
    setLoading(true)
    let collectionNFTs: string[] = []
    try {
      if (searchText.length > 0) {
        collectionNFTs = await getNftCollectionInfo()
      } else {
        collectionNFTs = nfts ? nfts?.map(({ mint }) => mint) : []
      }
    } catch (er: any) {
      return window.notify({ type: 'error', description: er.message })
    } finally {
      setLoading(false)
    }
    return setCollectionAddresses(collectionNFTs)
  }, [getNftCollectionInfo, nfts, searchText.length])

  useEffect(() => {
    getCollectionNFTs()
  }, [getCollectionNFTs])

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
        onCancel={onCloseModal}
        closeIcon={<IonIcon name="close-outline" />}
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Typography.Title level={4}>
              Select a NFT collection
            </Typography.Title>
          </Col>
          <Col span={24}>
            <SearchNftCollection
              loading={loading}
              searchText={searchText}
              onSearch={(value) => setSearchText(value)}
            />
          </Col>
          <Col span={24}>
            <Row
              gutter={[24, 24]}
              className="scrollbar"
              style={{ height: 500 }}
            >
              {collectionAddresses.length > 0 ? (
                collectionAddresses.map((collectionAddress) => (
                  <Col xs={12} md={12} key={collectionAddress}>
                    <CardNFT
                      mintAddress={collectionAddress}
                      onSelect={onSelectNFT}
                    />
                  </Col>
                ))
              ) : (
                <Col span={24}>
                  <Empty />
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default ModalNftCollection
