import IonIcon from '@sentre/antd-ionicon'
import {
  Button,
  Col,
  Popover,
  Row,
  Segmented,
  Switch,
  Tooltip,
  Typography,
} from 'antd'
import { TabId } from 'constant'
import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

type HeaderProps = {
  tabId: TabId
  setTabId: (newValue: TabId) => void
  isRetailer?: boolean
}

const Header = ({ tabId, setTabId, isRetailer = false }: HeaderProps) => {
  const [retailerMode, setRetailerMode] = useState(false)
  const location = useLocation()
  const history = useHistory()
  useEffect(() => {
    if (location.pathname.includes('retailer')) {
      return setRetailerMode(true)
    }
    setRetailerMode(false)
  }, [location.pathname])
  const onSwitch = (checked: boolean) => {
    console.log('check: ', checked)
    if (checked) {
      return history.push('/retailer')
    }
    history.push('/user')
  }

  return (
    <Row>
      <Col>
        <Segmented
          options={
            !isRetailer
              ? [
                  { label: 'Booster', value: TabId.Booster },
                  { label: 'Redeem', value: TabId.Redeem },
                ]
              : [
                  { label: 'Boost list', value: TabId.BoostList },
                  { label: 'Order list', value: TabId.OrderList },
                ]
          }
          value={tabId}
          onChange={(value) => setTabId(TabId.BoostList)}
        />
      </Col>
      <Col>
        <Popover
          placement="bottomRight"
          content={
            <Row>
              <Col>
                <Typography.Text>Retailer mode</Typography.Text>
                <Switch checked={retailerMode} onChange={onSwitch} />
              </Col>
            </Row>
          }
          trigger="click"
          overlayClassName="slippage"
          overlayInnerStyle={{ borderRadius: 24 }}
        >
          <Button
            style={{ marginRight: -7 }}
            type="text"
            icon={<IonIcon name="cog-outline" />}
          />
        </Popover>
      </Col>
    </Row>
  )
}

export default Header
