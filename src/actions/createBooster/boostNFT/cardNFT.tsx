import { useMemo } from 'react'
import { useUI } from '@sentre/senhub'

import { Card, Row, Col, Typography, Image } from 'antd'

import useNftMetaData from 'hooks/nft/useNFTMetaData'

import DEFAULT_NFT from 'static/images/nft-default.png'

export type CardNFTProps = {
  mintAddress: string
  onSelect: (mintAddress: string) => void
  isSelected?: boolean
}

const SIZE_DESKTOP = 198
const SIZE_MOBILE = 150

const CardNFT = ({ mintAddress, onSelect }: CardNFTProps) => {
  const {
    ui: { width },
  } = useUI()

  const imageSize = useMemo(() => {
    if (width < 768) return SIZE_MOBILE
    return SIZE_DESKTOP
  }, [width])

  const { nftInfo, loading } = useNftMetaData(mintAddress)

  return (
    <Card
      bordered={false}
      style={{ cursor: 'pointer', textAlign: 'center' }}
      bodyStyle={{ padding: '15px 0 10px 0' }}
      loading={loading}
      onClick={() => onSelect(mintAddress)}
    >
      <Row>
        <Col span={24} style={{ textAlign: 'center', width: imageSize }}>
          <Image
            src={nftInfo?.image || DEFAULT_NFT}
            preview={false}
            style={{ borderRadius: 4 }}
            width={imageSize}
            height={imageSize}
          />
        </Col>
        <Col span={24} style={{ textAlign: 'center', paddingTop: '8px' }}>
          <Typography.Text>{nftInfo?.name}</Typography.Text>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNFT
