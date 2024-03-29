import { useState } from 'react'
import { useTheme, util } from '@sentre/senhub'
import moment from 'moment'

import {
  Col,
  DatePicker,
  InputNumber,
  Row,
  Space,
  Switch,
  Tooltip,
  Typography,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import Content from './content'
import { MintSelection } from '@sen-use/app'

import { DATE_FORMAT } from 'constant'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'
import { useMintsLP } from 'hooks/useMintsLP'

export type GeneralData = {
  bidMint: string
  askMint: string
  budget: number
  startTime: number
  endTime: number
}

type GeneralInfoProps = {
  onChange: (value: string | number, name: keyof GeneralData) => void
  generateData: GeneralData
}

const MINT_STYLE = {
  dark: {
    padding: '4px 12px',
    height: 40,
    width: '100%',
    background: '#232324',
    border: '1px solid #373947',
  },
  light: {
    padding: '4px 12px',
    height: 40,
    width: '100%',
    background: '#EBEDED',
    border: 'none',
  },
}

const GeneralInfo = ({ onChange, generateData }: GeneralInfoProps) => {
  const [unlimited, setUnlimited] = useState(true)
  const { askMint, bidMint, budget, endTime, startTime } = generateData
  const theme = useTheme()
  const { balance } = useAccountBalanceByMintAddress(bidMint)
  const { mintsLP } = useMintsLP()

  const onSwitch = (checked: boolean) => {
    if (checked) onChange(0, 'endTime')

    return setUnlimited(checked)
  }

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Typography.Title level={5}>General information</Typography.Title>
      </Col>
      <Col span={24}>
        <Row gutter={[16, 16]}>
          <Col span={12} className="retailer-mint-selection">
            <Content
              label={
                <Row>
                  <Col flex="auto">
                    <Typography.Text>Pay</Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text type="secondary">
                      Available: {util.numeric(balance).format('0,0.[000]')}
                    </Typography.Text>
                  </Col>
                </Row>
              }
              value={
                <MintSelection
                  value={bidMint}
                  onChange={(value) => onChange(value, 'bidMint')}
                  placeholder="Select a token"
                  style={{ ...MINT_STYLE[theme], textAlign: 'left' }}
                />
              }
            />
          </Col>
          <Col span={12}>
            <Content
              label={
                <Space align="center">
                  <Typography.Text>Budget</Typography.Text>
                  <Tooltip
                    title={
                      "You can set a budget to encourage users to buy the token, but it won't affect the balance of your assets."
                    }
                  >
                    <IonIcon
                      style={{ cursor: 'pointer' }}
                      name="information-circle-outline"
                    />
                  </Tooltip>
                </Space>
              }
              value={
                <InputNumber
                  onChange={(value) => onChange(value || '0', 'budget')}
                  value={budget ? budget : undefined}
                  placeholder="Amount of paid token"
                  size="large"
                />
              }
            />
          </Col>
          <Col span={24} className="retailer-mint-selection">
            <Content
              label="Buy-back"
              value={
                <MintSelection
                  value={askMint}
                  onChange={(value) => onChange(value, 'askMint')}
                  placeholder="Select LP"
                  style={{ ...MINT_STYLE[theme], textAlign: 'left' }}
                  mints={mintsLP}
                />
              }
            />
          </Col>
          <Col span={12}>
            <Content
              label="Start time"
              value={
                <DatePicker
                  placeholder="Select time"
                  suffixIcon={<IonIcon name="time-outline" />}
                  className="date-option"
                  onChange={(date) =>
                    onChange(date?.valueOf() || 0, 'startTime')
                  }
                  clearIcon={null}
                  value={startTime ? moment(startTime) : moment(Date.now())}
                  showTime={{ showSecond: false }}
                  placement="bottomRight"
                  format={DATE_FORMAT}
                />
              }
            />
          </Col>
          <Col span={12}>
            <Content
              label={
                <Row>
                  <Col flex="auto">
                    <Typography.Text>End time</Typography.Text>
                  </Col>
                  <Col>
                    <Space>
                      <Typography.Text>Unlimited</Typography.Text>
                      <Switch
                        checked={unlimited}
                        size="small"
                        onChange={onSwitch}
                      />
                    </Space>
                  </Col>
                </Row>
              }
              value={
                <DatePicker
                  placeholder="Select time"
                  suffixIcon={<IonIcon name="time-outline" />}
                  className="date-option"
                  onChange={(date) => onChange(date?.valueOf() || 0, 'endTime')}
                  clearIcon={null}
                  value={endTime ? moment(endTime) : null}
                  showTime={{ showSecond: false }}
                  placement="bottomRight"
                  format={DATE_FORMAT}
                  disabled={unlimited}
                />
              }
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default GeneralInfo
