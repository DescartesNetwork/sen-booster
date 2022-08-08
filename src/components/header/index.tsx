import { useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PDB, useWalletAddress } from '@sentre/senhub'

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
import { AppDispatch, AppState } from 'model'
import { setMode } from 'model/settings.controller'
import configs from 'configs'

const {
  manifest: { appId },
} = configs

type HeaderProps = {
  tabId: TabId
  setTabId: (newValue: any) => void
  scrollToFAQ?: () => void
}

const RETAILER_TABS = [
  { label: 'Booster list', value: TabId.BoostList },
  { label: 'Order list', value: TabId.OrderList },
]

const USER_TABS = [
  { label: 'Booster', value: TabId.Booster },
  { label: 'Redeem', value: TabId.Redeem },
]

const Header = ({ tabId, setTabId, scrollToFAQ }: HeaderProps) => {
  const { mode } = useSelector((state: AppState) => state.settings)
  const { pushHistory } = useAppRouter()
  const dispatch = useDispatch<AppDispatch>()
  const walletAddress = useWalletAddress()

  const pdb = new PDB(walletAddress).createInstance(appId)
  const isRetailerMode = useMemo(() => mode === Mode.Retailer, [mode])

  const onSwitch = async (checked: boolean) => {
    const mode = checked ? Mode.Retailer : Mode.User

    dispatch(setMode(mode))
    await pdb.setItem('mode', mode)
    return pushHistory(`/${mode}`)
  }

  return (
    <Row align="middle">
      <Col flex="auto">
        <Segmented
          options={isRetailerMode ? RETAILER_TABS : USER_TABS}
          value={tabId}
          onChange={setTabId}
          size="large"
        />
      </Col>
      <Col>
        <Space size={12}>
          {!isRetailerMode && (
            <Button
              icon={<IonIcon name="arrow-down-outline" />}
              onClick={scrollToFAQ}
              ghost
            >
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
                  checked={isRetailerMode}
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
