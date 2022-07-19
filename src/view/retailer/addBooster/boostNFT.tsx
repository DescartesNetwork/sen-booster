import IonIcon from '@sentre/antd-ionicon'
import {
  Button,
  Col,
  Input,
  Row,
  Switch,
  Space,
  Typography,
  Tooltip,
} from 'antd'
import { useState } from 'react'

type BoostNFTProps = {
  nftList: string[]
  onChange: (nftList: string[]) => void
}

const Explanation = () => (
  <Typography.Text style={{ color: '#E9E9EB' }}>
    Enable <span style={{ color: '#0FB5B8' }}>Boost</span> means that you allow
    an additional rate of payment when users use NFTs. <br /> There are 3 slots
    in all to use NFTs, with each slot used will increase the payout rate by
    2.5%.
  </Typography.Text>
)

const BoostNFT = ({ nftList, onChange }: BoostNFTProps) => {
  const [isBoostNFT, setIsBoostNFT] = useState(false)

  const onInput = (val: string, idx: number) => {
    const nextNFTs = [...nftList]
    nextNFTs[idx] = val
    onChange(nextNFTs)
  }

  const onAddMore = () => {
    const nextNFTs = [...nftList]
    nextNFTs.push('')
    onChange(nextNFTs)
  }

  const onDelete = (index: number) => {
    const nextNFTs = [...nftList]
    nextNFTs.splice(index, 1)
    onChange(nextNFTs)
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
        <Switch size="small" onChange={setIsBoostNFT} />
      </Col>
      {isBoostNFT &&
        nftList.map((val, idx) => (
          <Col key={idx} span={24}>
            <Row gutter={[4, 4]}>
              <Col span={22}>
                <Input
                  value={val}
                  onChange={(val) => onInput(val.target.value, idx)}
                />
              </Col>
              <Col span={2}>
                <Button
                  icon={<IonIcon name="remove-circle-outline" />}
                  onClick={() => onDelete(idx)}
                  type="text"
                  size="large"
                />
              </Col>
            </Row>
          </Col>
        ))}
      {isBoostNFT && (
        <Col span={24}>
          <Button
            type="dashed"
            block
            icon={<IonIcon name="add-outline" />}
            onClick={onAddMore}
            size="large"
          >
            Add more
          </Button>
        </Col>
      )}
    </Row>
  )
}

export default BoostNFT
