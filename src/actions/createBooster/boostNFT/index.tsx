import { useState } from 'react'

import { Col, Row, Switch, Space, Typography, Tooltip } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import DisplayNFT from './displayNFT'
import ModalNftCollection from './modalNftCollection'

type BoostNFTProps = {
  collections: string[]
  onChange: (collections: string[]) => void
}

const Explanation = () => (
  <Typography.Text style={{ color: '#E9E9EB' }}>
    Enable <span style={{ color: '#0FB5B8' }}>Boost</span> means that you allow
    an additional rate of payment when users use NFTs. <br /> There are 3 slots
    in all to use NFTs, with each slot used will increase the payout rate by
    2.5%.
  </Typography.Text>
)

const BoostNFT = ({ collections, onChange }: BoostNFTProps) => {
  const [isBoostNFT, setIsBoostNFT] = useState(false)

  const onSelect = (collection: string) => {
    const nextCollections = [...collections]
    if (!collections.includes(collection)) nextCollections.push(collection)
    return onChange(nextCollections)
  }

  const onDelete = (collection: string) => {
    const nextCollections = [...collections]
    const idx = nextCollections.findIndex(
      (oldCollection) => collection === oldCollection,
    )
    if (idx !== -1) nextCollections.splice(idx, 1)
    return onChange(nextCollections)
  }

  const onSwitch = (isBoost: boolean) => {
    if (!isBoost) onChange([]) // remove collection
    setIsBoostNFT(isBoost)
  }

  return (
    <Row gutter={[12, 12]}>
      <Col flex="auto">
        <Space>
          <Typography.Title level={5}>Boost by NFT</Typography.Title>
          <Tooltip placement="bottomRight" title={<Explanation />}>
            <IonIcon name="information-circle-outline" />
          </Tooltip>
        </Space>
      </Col>
      <Col>
        <Switch size="small" onChange={onSwitch} />
      </Col>

      {isBoostNFT && (
        <Col span={24}>
          <Space size={12} wrap={true}>
            {collections.map((collection) => (
              <DisplayNFT
                onDelete={onDelete}
                mintAddress={collection}
                key={collection}
              />
            ))}
            <ModalNftCollection onSelect={onSelect} />
          </Space>
        </Col>
      )}
    </Row>
  )
}

export default BoostNFT
