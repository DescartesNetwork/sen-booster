import moment from 'moment'
import { BN } from '@project-serum/anchor'

import { Col, Row } from 'antd'
import ExpandCard from 'components/expandCard'
import ExpandHeader from './expandHeader'
import SpaceBetween from 'components/spaceBetween'
import ModalFilter from 'components/filterOrder/modalFilter'

import { OrderRequest } from 'view/retailer/orderList'
import { DATE_FORMAT, SECONDS_PER_DAY } from 'constant'
import { useRedeemTime } from 'hooks/useRedeemTime'

type RedeemMobileScreenProps = {
  dataSource: OrderRequest[]
  setOrders: (value: OrderRequest[]) => void
}

const RedeemMobileScreen = ({
  dataSource,
  setOrders,
}: RedeemMobileScreenProps) => {
  const { getRedeemTime } = useRedeemTime()
  return (
    <Row gutter={[16, 16]}>
      <Col span={24} style={{ paddingLeft: 24, paddingRight: 24 }}>
        <ModalFilter onChange={setOrders} />
      </Col>
      {dataSource.map(({ orderAddress, lockTime, createAt }) => {
        const redeemTime = getRedeemTime(orderAddress)
        return (
          <Col span={24} key={orderAddress}>
            <ExpandCard
              cardId={orderAddress}
              cardHeader={<ExpandHeader orderAddress={orderAddress} />}
            >
              <Row gutter={[4, 4]}>
                <Col span={24}>
                  <SpaceBetween
                    label="Ordered time"
                    value={moment(createAt.toNumber() * 1000).format(
                      DATE_FORMAT,
                    )}
                  />
                </Col>
                <Col span={24}>
                  <SpaceBetween
                    label="Lock time"
                    value={`${lockTime
                      .div(new BN(SECONDS_PER_DAY))
                      .toString()} days `}
                  />
                </Col>
                <Col span={24}>
                  <SpaceBetween
                    label="Redemption time"
                    value={
                      !redeemTime
                        ? '--'
                        : moment(redeemTime * 1000).format(DATE_FORMAT)
                    }
                  />
                </Col>
              </Row>
            </ExpandCard>
          </Col>
        )
      })}
    </Row>
  )
}

export default RedeemMobileScreen
