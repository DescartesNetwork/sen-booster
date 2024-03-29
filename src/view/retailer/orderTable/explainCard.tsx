import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { notifyError } from '@sen-use/app'
import { util } from '@sentre/senhub'

import { Col, Row, Space, Typography } from 'antd'
import ApproveOrder from 'actions/retailerApproveOrder'
import RejectOrder from 'actions/retailerRejectOrder'
import SpaceVertical from 'components/spaceVertical'

import { AppState } from 'model'
import { useMintPrice } from 'hooks/useMintPrice'
import { Ipfs, OrderMetadata } from 'senUse/ipfs'
import { useAmountAppliedNFT } from 'hooks/boosters/useAmountAppliedNFT'

type ExplainCardProps = {
  orderAddress: string
}

const ExplainCard = ({ orderAddress }: ExplainCardProps) => {
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
    <Row gutter={[8, 8]} align="middle">
      <Col flex="auto">
        <Row gutter={[48, 48]}>
          <Col>
            <SpaceVertical
              label="Market price"
              value={
                <Typography.Text>
                  1 LP = {util.numeric(askPrice).format('0,0.[0000]')} USDC
                </Typography.Text>
              }
            />
          </Col>
          <Col>
            <SpaceVertical
              label="Used NFT slot"
              value={<Typography.Text>{nftUsedInThisBooster}</Typography.Text>}
            />
          </Col>
          <Col>
            <SpaceVertical
              label="Total boost rate"
              value={
                <Typography.Text>{orderMetadata.discount}%</Typography.Text>
              }
            />
          </Col>
        </Row>
      </Col>
      <Col>
        <Space>
          <RejectOrder orderAddress={orderAddress} />
          <ApproveOrder orderAddress={orderAddress} />
        </Space>
      </Col>
    </Row>
  )
}

export default ExplainCard
