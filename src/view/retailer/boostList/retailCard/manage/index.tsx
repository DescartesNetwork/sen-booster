import { Fragment, useMemo, useState } from 'react'
import { useSelector } from 'react-redux'

import { Button, Col, Modal, Row, Tabs, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import CardManage from './cardManage'
import RetailerUpdateBudge from 'actions/retailerUpdateBudget'
import FreezeBooster from 'actions/retailerFreezeBooster'
import ThawBooster from 'actions/retailerThawBooster'

import { AppState } from 'model'

const { TabPane } = Tabs

type ManageProps = {
  boosterAddress: string
}

const Manage = ({ boosterAddress }: ManageProps) => {
  const [visible, setVisible] = useState(false)
  const boosterData = useSelector(
    (state: AppState) => state.boosters[boosterAddress],
  )

  const isFreeze = useMemo(() => {
    const state = Object.keys(boosterData.state)[0]
    if (state === 'frozen') return true
    return false
  }, [boosterData.state])

  return (
    <Fragment>
      <Button ghost onClick={() => setVisible(true)} block>
        Manage
      </Button>
      <Modal
        className="card-manage"
        closeIcon={<IonIcon name="close-outline" />}
        footer={null}
        onCancel={() => setVisible(false)}
        visible={visible}
        title={<Typography.Title level={4}>Manage booster</Typography.Title>}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <CardManage boosterAddress={boosterAddress} />
          </Col>
          <Col span={24}>
            <Tabs>
              <TabPane tab="Budget" key="budget">
                <RetailerUpdateBudge boosterAddress={boosterAddress} />
              </TabPane>
              <TabPane tab="Freeze/Thaw" key="freeze-thaw">
                {isFreeze ? (
                  <ThawBooster boosterAddress={boosterAddress} />
                ) : (
                  <FreezeBooster boosterAddress={boosterAddress} />
                )}
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Manage
