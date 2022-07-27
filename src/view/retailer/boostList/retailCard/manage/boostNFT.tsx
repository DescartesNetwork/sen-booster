import { ReactNode } from 'react'

import { Col, Row, Typography } from 'antd'
import NFTInfo from './nftInfo'

import { useVoucherPrintersByBooster } from 'hooks/boosters/useVoucherPrintersByBooster'

type ContentProps = {
  value: ReactNode
  label: ReactNode
}

const Content = ({ value, label }: ContentProps) => (
  <Row>
    <Col flex="auto">{label}</Col>
    <Col>{value}</Col>
  </Row>
)
type BoostNFTProps = {
  boosterAddress: string
}
const BoostNFT = ({ boosterAddress }: BoostNFTProps) => {
  const vouchers = useVoucherPrintersByBooster(boosterAddress)

  return (
    <Row gutter={[8, 8]} align="middle">
      <Col span={24}>
        <Content
          label={<Typography.Title level={5}>Boost by NFT</Typography.Title>}
          value={
            <Typography.Text>
              {vouchers.length ? 'Enable' : 'Disable'}
            </Typography.Text>
          }
        />
      </Col>
      {vouchers.map(({ collection }) => (
        <Col span={24} key={collection.toBase58()}>
          <NFTInfo mintAddress={collection.toBase58()} />
        </Col>
      ))}
    </Row>
  )
}

export default BoostNFT
