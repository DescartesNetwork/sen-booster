import { useMemo } from 'react'
import { useUI, util } from '@sentre/senhub'

import { Card, Row, Col, Typography, Image } from 'antd'

// import IMAGE_DEFAULT from 'static/images/system/nft.jpeg'
import useNftMetaData from 'hooks/useNFTMetaData'

export type CardNFTProps = {
  nftAddress: string
  onSelect: (mintAddress: string, nftImage: string) => void
  isSelected?: boolean
}

const SIZE_DESKTOP = 198
const SIZE_MOBILE = 150

const CardNFT = ({ nftAddress, onSelect, isSelected }: CardNFTProps) => {
  const {
    ui: { width },
  } = useUI()

  const imageSize = useMemo(() => {
    if (width < 768) return SIZE_MOBILE
    return SIZE_DESKTOP
  }, [width])

  const { nftInfo, loading } = useNftMetaData(nftAddress)

  return (
    <Card
      bordered={false}
      style={{
        cursor: 'pointer',
        textAlign: 'center',
        background: 'transparent',
      }}
      bodyStyle={{ padding: 0 }}
      loading={loading}
      onClick={() => onSelect(nftAddress, `${nftInfo?.image}`)}
    >
      <Row gutter={[8, 8]} justify="center">
        <Col span={24}>
          <Image
            src={nftInfo?.image || ''}
            preview={false}
            style={{ borderRadius: 12 }}
            width={imageSize}
            height={imageSize}
          />
        </Col>
        <Col style={{ width: imageSize }}>
          <Row justify="space-between" gutter={[8, 8]}>
            <Col flex="auto" style={{ textAlign: 'start' }}>
              <Typography.Text>{nftInfo?.name}</Typography.Text>
            </Col>
            <Col>
              <Typography.Text>
                {util.shortenAddress(nftAddress)}
              </Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  )
}

export default CardNFT
