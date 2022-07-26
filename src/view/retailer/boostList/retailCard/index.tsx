import { useSelector } from 'react-redux'
import moment from 'moment'

import { Card, Col, Row, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Manage from './manage'
import SpaceVertical from '../../../../components/spaceVertical'

import { DATE_FORMAT } from 'constant'
import { AppState } from 'model'
import BoosterProcess from 'components/boosterProcess'

type RetailCardProps = {
  boosterAddress: string
}

const RetailCard = ({ boosterAddress }: RetailCardProps) => {
  const { askMint, bidMint, startAt, endAt } = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )

  return (
    <Card bordered={false}>
      <Row gutter={[24, 24]}>
        <Col span={24}>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Row justify="space-between" align="middle">
                <Col>
                  <SpaceVertical
                    label="Buy-back"
                    mintAddress={askMint.toBase58()}
                  />
                </Col>
                <Col>
                  <IonIcon name="arrow-forward-outline" />
                </Col>
                <Col>
                  <SpaceVertical
                    align="end"
                    label="Pay"
                    mintAddress={bidMint.toBase58()}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <Row justify="space-between" wrap={false}>
                <Col>
                  <SpaceVertical
                    label="Start date"
                    value={
                      <Typography.Text>
                        {moment(startAt.toNumber() * 1000).format(DATE_FORMAT)}
                      </Typography.Text>
                    }
                  />
                </Col>
                <Col>
                  <SpaceVertical
                    label="End date"
                    value={
                      <Typography.Text>
                        {moment(endAt.toNumber() * 1000).format(DATE_FORMAT)}
                      </Typography.Text>
                    }
                  />
                </Col>
                <Col>
                  <SpaceVertical
                    label="Boost"
                    value={<Typography.Text>Yes</Typography.Text>}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <BoosterProcess boosterAddress={boosterAddress} />
            </Col>
          </Row>
        </Col>
        <Col span={24}>
          <Manage boosterAddress={boosterAddress} />
        </Col>
      </Row>
    </Card>
  )
}

export default RetailCard
