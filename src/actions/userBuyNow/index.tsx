import { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { util } from '@sentre/senhub'
import BN from 'bn.js'
import { PublicKey } from '@solana/web3.js'

import {
  Button,
  Col,
  Divider,
  InputNumber,
  Modal,
  Radio,
  RadioChangeEvent,
  Row,
  Switch,
  Typography,
} from 'antd'
import EstimatedInfo from 'view/user/booster/boosterCard/estimatedInfo'
import { MintSelection, MintSymbol } from '@sen-use/components'
import NftUpload from './nftUpload'

import { useBuy } from 'hooks/actions/useBuy'
import { AppState } from 'model'
import { useAccountBalanceByMintAddress } from 'shared/hooks/useAccountBalance'

type BuyNowProps = {
  boosterAddress: string
}

const DATES = [
  { name: '7 days', value: 7 },
  { name: '30 days', value: 30 },
  { name: '60 days', value: 60 },
  { name: '90 days', value: 90 },
  { name: '120 days', value: 120 },
  { name: '365 days', value: 365 },
]

const BuyNow = ({ boosterAddress }: BuyNowProps) => {
  const { askMint } = useSelector(
    (state: AppState) => state.booster[boosterAddress],
  )
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [useBoost, setUseBoost] = useState(false)
  const [amount, setAmount] = useState(0)
  const [lockTime, setLockTime] = useState(7)
  const { buy } = useBuy()
  const mintInfo = useAccountBalanceByMintAddress(askMint.toBase58())

  const onChange = (e: RadioChangeEvent) => {
    setLockTime(e.target.value)
  }

  const onBuy = () => {
    buy({
      retailer: new PublicKey(boosterAddress),
      bidAmount: new BN(1),
      askAmount: new BN(1),
      lockTimeRange: new BN(7),
    })
  }

  console.log('lockTime: ', lockTime)

  return (
    <Row>
      <Col flex="auto">
        <Button type="primary" onClick={() => setIsModalVisible(true)}>
          Buy Now
        </Button>
      </Col>
      <Modal
        title={<Typography.Title level={4}>Buy token</Typography.Title>}
        visible={isModalVisible}
        onOk={() => {}}
        closable
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <Row justify="space-between" gutter={[16, 16]}>
          <Col span={24}>
            <Typography.Text>
              Token Buy-back offering:{' '}
              <Typography.Text style={{ color: '#7a7b85' }}>
                Selling your LP tokens with juicy profit. No fee, no slippage.
                The token will be unlocked after the selected period.
              </Typography.Text>
            </Typography.Text>
          </Col>
          <Col span={24}>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Row>
                  <Col flex="auto">
                    <Typography.Text>You Pay</Typography.Text>
                  </Col>
                  <Col>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      Available:{' '}
                      {util.numeric(mintInfo.balance).format('0,0.[00]a')}{' '}
                      <MintSymbol mintAddress={askMint.toBase58()} />
                    </Typography.Text>
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <InputNumber
                  placeholder="0"
                  prefix={
                    <Fragment>
                      <MintSelection disabled value={askMint.toBase58()} />
                      <Divider type="vertical" />
                    </Fragment>
                  }
                  addonAfter={
                    <Button
                      type="text"
                      style={{ marginRight: -7 }}
                      onClick={() => setAmount(Number(mintInfo.balance))}
                    >
                      MAX
                    </Button>
                  }
                  value={amount}
                  onChange={(value) => setAmount(value)}
                  max={Number(mintInfo.balance)}
                  style={{ width: '100%' }}
                />
              </Col>
            </Row>
          </Col>
          <Col>
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Typography.Text>Lock time</Typography.Text>
              </Col>
              <Col span={24}>
                <Radio.Group defaultValue={7} size="middle" onChange={onChange}>
                  <Row gutter={[6, 6]}>
                    {DATES.map((val, idx) => (
                      <Col xs={12} md={8} key={idx}>
                        <Radio.Button
                          defaultChecked={val.value === lockTime}
                          value={val.value}
                          style={{ width: '100%' }}
                        >
                          {val.name}
                        </Radio.Button>
                      </Col>
                    ))}
                  </Row>
                </Radio.Group>
              </Col>
              <Col span={24}>
                <Row justify="end">
                  <Col>
                    <Typography.Text>Boost</Typography.Text>
                    <Switch
                      size="small"
                      checked={useBoost}
                      onChange={() => setUseBoost(!useBoost)}
                    />
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          {useBoost && (
            <Col>
              <NftUpload />
            </Col>
          )}
          <Col span={24}>
            {/* <EstimatedInfo receivedToken={receivedToken} ratioBuyBack={} /> */}
            {/* pending for payrate */}
            <EstimatedInfo
              boosterAddress={boosterAddress}
              selectedLockTime={lockTime}
              payAmount={amount}
            />
          </Col>
          <Col span={24}>
            <Button block onClick={onBuy}>
              Buy
            </Button>
          </Col>
        </Row>
      </Modal>
    </Row>
  )
}

export default BuyNow
