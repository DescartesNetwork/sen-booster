import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { notifyError } from '@sen-use/app'
import { util } from '@sentre/senhub'

import { Col, Row } from 'antd'
import SpaceBetween from 'components/spaceBetween'

import { AppState } from 'model'
import { useMintPrice } from 'hooks/useMintPrice'
import { Ipfs, OrderMetadata } from 'senUse/ipfs'
import { useAmountAppliedNFT } from 'hooks/boosters/useAmountAppliedNFT'

type MetadataCardProps = {
  orderAddress: string
}

const MetadataCard = ({ orderAddress }: MetadataCardProps) => {
  const [orderMetadata, setOrderMetadata] = useState<OrderMetadata>({
    appliedNFTs: [],
    discount: 0,
  })
  const orderData = useSelector((state: AppState) => state.orders[orderAddress])
  const boosters = useSelector((state: AppState) => state.boosters)
  const retailerAddress = orderData.retailer.toBase58()
  const askMintAddress = boosters[retailerAddress].askMint.toBase58() || ''
  const askPrice = useMintPrice(askMintAddress)
  const { nftUsedInThisBooster } = useAmountAppliedNFT({ orderAddress })

  const fetchMetaData = useCallback(async () => {
    try {
      const metaInfo = await Ipfs.methods.order.get(orderData.metadata)
      if (metaInfo) setOrderMetadata(metaInfo)
    } catch (error) {
      notifyError(error)
    }
  }, [orderData.metadata])

  useEffect(() => {
    fetchMetaData()
  }, [fetchMetaData])

  return (
    <Row gutter={[4, 4]}>
      <Col span={24}>
        <SpaceBetween
          label="Market price"
          value={` 1 LP = ${util.numeric(askPrice).format('0,0.[0000]')} USDC`}
        />
      </Col>
      <Col span={24}>
        <SpaceBetween
          label="Used NFT slot"
          value={nftUsedInThisBooster.toString()}
        />
      </Col>
      <Col span={24}>
        <SpaceBetween
          label="Total boost rate"
          value={`${orderMetadata.discount}%`}
        />
      </Col>
    </Row>
  )
}

export default MetadataCard
