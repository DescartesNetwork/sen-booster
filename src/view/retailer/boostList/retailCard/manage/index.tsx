import { Fragment, useMemo, useState } from 'react'

import { Button, Col, Modal, Row, Tabs, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import FreezeBoost from 'actions/retailerFreezeBoost'
import ThawBoost from 'actions/retailerThawBoost'
import RetailerUpdateBudge from 'actions/retailerUpdateBudget'
import CardManage from './cardManage'

const { TabPane } = Tabs

type ManageProps = {
  boosterAddress: string
}

const Manage = ({ boosterAddress }: ManageProps) => {
  const [visible, setVisible] = useState(false)

  const isFreeze = useMemo(() => {
    return false
  }, [])

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
                {isFreeze ? <ThawBoost /> : <FreezeBoost />}
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default Manage
