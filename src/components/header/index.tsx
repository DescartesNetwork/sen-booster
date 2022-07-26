import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import IonIcon from '@sentre/antd-ionicon'
import {
  Button,
  Col,
  Popover,
  Row,
  Segmented,
  Space,
  Switch,
  Typography,
} from 'antd'

import { Mode, TabId } from 'constant'
import { useAppRouter } from 'hooks/useAppRouter'
import { AppDispatch } from 'model'
import { resetFilter } from 'model/ordersFilter.controller'
import { setMode } from 'model/settings.controller'

type HeaderProps = {
  tabId: TabId
  setTabId: (newValue: any) => void
  isRetailer?: boolean
}

const RETAILER_TABS = [
  { label: 'Booster list', value: TabId.BoostList },
  { label: 'Order list', value: TabId.OrderList },
]

const USER_TABS = [
  { label: 'Booster', value: TabId.Booster },
  { label: 'Redeem', value: TabId.Redeem },
]

const Header = ({ tabId, setTabId, isRetailer = false }: HeaderProps) => {
  const { pushHistory } = useAppRouter()
  const dispatch = useDispatch<AppDispatch>()

  const [retailerMode, setRetailerMode] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname.includes('retailer')) {
      return setRetailerMode(true)
    }
    setRetailerMode(false)
  }, [location.pathname])

  const onSwitch = (checked: boolean) => {
    dispatch(resetFilter())
    if (checked) {
      dispatch(setMode(Mode.Retailer))
      return pushHistory('/retailer')
    }
    dispatch(setMode(Mode.Retailer))
    pushHistory('/user')
  }

  return (
    <Row>
      <Col flex="auto">
        <Segmented
          options={isRetailer ? RETAILER_TABS : USER_TABS}
          value={tabId}
          onChange={setTabId}
          size="large"
        />
      </Col>
      <Col>
        <Space size={12}>
          {!retailerMode && (
            <Button icon={<IonIcon name="arrow-down-outline" />} ghost>
              FAQ
            </Button>
          )}
          <Popover
            placement="topRight"
            content={
              <Space>
                <Typography.Text>Retailer mode</Typography.Text>
                <Switch
                  size="small"
                  checked={retailerMode}
                  onChange={onSwitch}
                />
              </Space>
            }
            trigger="click"
            overlayClassName="slippage"
          >
            <Button ghost icon={<IonIcon name="cog-outline" />} />
          </Popover>
        </Space>
      </Col>
    </Row>
  )
}

export default Header
