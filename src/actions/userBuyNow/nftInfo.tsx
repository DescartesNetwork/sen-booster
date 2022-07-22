import { util } from '@sentre/senhub'
import { Col, Space, Row, Image, Typography } from 'antd'
import useNftMetaData from 'hooks/useNFTMetaData'
import React from 'react'

type NftInfoProps = {
  nftAddress: string
  onSelect: ({
    nftAddress,
    nftImage,
  }: {
    nftAddress: string
    nftImage: string
  }) => void
}

const NftInfo = ({ nftAddress, onSelect }: NftInfoProps) => {
  const { nftInfo } = useNftMetaData(nftAddress)
  return (
    <Col span={8}>
      <Row
        gutter={[8, 8]}
        onClick={() =>
          onSelect({
            nftAddress,
            nftImage: `${nftInfo?.image}`,
          })
        }
      >
        <Col span={24}>
          <Image
            src={nftInfo?.image}
            preview={false}
            style={{ borderRadius: 12 }}
          />
        </Col>
        <Col span={24}>
          <Row justify="space-between" gutter={[8, 8]}>
            <Col flex="auto">
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
    </Col>
  )
}

export default NftInfo
