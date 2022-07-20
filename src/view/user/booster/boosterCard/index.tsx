import { Card, Col, Row, Space, Tag } from 'antd'
import BoosterSymbol from 'components/boosterSymbol'
import BoosterAvatar from 'components/boosterAvatar'
import BoosterProcess from '../../../../components/boosterProcess'
import Statistics from './statistics'
import BuyNow from 'actions/userBuyNow'

type BoosterCardProps = {
  boosterAddr: string
}

const BoosterCard = ({ boosterAddr }: BoosterCardProps) => {
  const isNFT = true
  return (
    <Card>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row justify="space-between">
            <Col flex="auto">
              <Space size={16}>
                <BoosterAvatar boosterAddress={boosterAddr} />
                <BoosterSymbol boosterAddress={boosterAddr} />
                {isNFT && <Tag>Boost</Tag>}
              </Space>
            </Col>

            <Col>
              <BuyNow boosterAddr={boosterAddr} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Statistics boosterAddress={boosterAddr} />
        </Col>
        <Col span={24}>
          <BoosterProcess boosterAddress={boosterAddr} />
        </Col>
      </Row>
    </Card>
  )
}

export default BoosterCard
